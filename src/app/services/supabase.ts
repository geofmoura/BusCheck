import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

export interface Passageiro {
  nome_completo: string;
  email: string;
  senha: string;
  telefone: string;
  codigo_cartao: string;
  faculdade: string;
  endereco: string;
}

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

  async cadastrarUsuario(passageiro: Passageiro) {
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

  async getPassageiroAtual() {
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

      if (error) throw error;

      return { success: true, data: adata };
    } catch (error: any) {
      console.error('Erro ao buscar passageiro:', error);
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