import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';
import { AsyncResult, Passageiro, PassageiroCreateDTO, Rota } from './types';

@Injectable({
  providedIn: 'root'
})
export class Supabase {
  private supabase: SupabaseClient;

  constructor() {
    this.supabase = createClient(
      environment.supabaseUrl,
      environment.supabaseKey
    );
  }

  async cadastrarUsuario(passageiro: PassageiroCreateDTO) {
    try {

      const { data: authData, error: authError } = await this.supabase.auth.signUp({
        email: passageiro.email,
        password: passageiro.senha,
        options: {
          data: {
            nome_completo: passageiro.nome_completo,
            telefone: passageiro.telefone
          }
        }
      });

      if (authError) throw authError;

      if (authData.user) {
        const { data, error: perfilError } = await this.supabase
          .from('usuario')
          .insert([
            {
              auth_user_id: authData.user.id,
              nome_completo: passageiro.nome_completo,
              email: passageiro.email,
              telefone: passageiro.telefone,
              endereco: passageiro.endereco,
              tipo: "PASSAGEIRO"
            }
          ]).select<any, {id: number}>().single();

        if (perfilError) throw perfilError;

        console.log(data);
        // debugger;

        const { error: passageiroError } = await this.supabase
          .from('passageiro')
          .insert([{
            usuario_id: data.id,
            codigo_cartao: passageiro.codigo_cartao,
            faculdade: passageiro.faculdade
          }]);
        
        console.log(passageiroError);
        debugger;
        if (passageiroError) throw passageiroError;

      }

      return { success: true, data: authData };
    } catch (error: any) {
      console.error('Erro no cadastro:', error);
      return { success: false, error };
    }
  }

  // Método de login
  async login(email: string, senha: string) {
    try {
      const { data, error } = await this.supabase.auth.signInWithPassword({
        email: email,
        password: senha
      });

      if (error) throw error;

      return { success: true, data };
    } catch (error: any) {
      console.error('Erro no login:', error);
      return { success: false, error };
    }
  }

  async getPassageiroAtual(): AsyncResult<Passageiro> {
    try {
      const { data: { user } } = await this.supabase.auth.getUser();

      if (!user) throw new Error('Usuário não autenticado');

      const { data, error } = await this.supabase
        .from('usuario')
        .select('*, passageiro(*)')
        .eq('email', user.email)
        .single();

      const adata = {...data, ...data.passageiro}
      delete adata.passageiro
      delete adata.usuario_id

      if (error) throw error;

      return { success: true, data: adata };
    } catch (error: any) {
      console.error('Erro ao buscar passageiro:', error);
      return { success: false, error };
    }
  }

  async getRotasByUserId(userId: number, userType: Passageiro['tipo']): AsyncResult<Rota[]>{
    try {
      let query;

      if (userType === 'MOTORISTA') {
        query = this.supabase
          .from('rota')
          .select<any, Rota>('*, usuario!motorista_id(*)')
          .eq('motorista_id', userId)
        } else {
          query = this.supabase
          .from('passageiro_rota')
          .select<any, { rota: Rota}>('rota(*, usuario!motorista_id(*))')
          .eq('usuario_id', userId)
          .then(({data, error, ...rest}) => {
            if (!error) return {data: data.map(item => item.rota as Rota), error, ...rest}
            return {data, error, ...rest}
          });
      }

      const { data, error } = await query;

      if (error) throw error;

      const rotas = data.map(item => {
        item.motorista = (item as any).usuario
        delete (item as any).usuario
        return item
      })

      return { success: true, data: rotas };
    } catch (error: any) {
      console.error('Erro ao buscar rotas do usuário:', error);
      return { success: false, error };
    }
  }

  // Logout
  async logout() {
    try {
      const { error } = await this.supabase.auth.signOut();
      if (error) throw error;
      return { success: true };
    } catch (error: any) {
      console.error('Erro no logout:', error);
      return { success: false, error };
    }
  }
}