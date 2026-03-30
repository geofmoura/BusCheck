import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../environments/environment';

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

  async cadastrarUsuario(email: string, senha: string, nome: string) {

    const { data: authData, error: authError } = await this.supabase.auth.signUp({
      email,
      password: senha
    });

    if (authError) throw authError;

    if (authData.user) {
      const { error: perfilError } = await this.supabase
        .from('usuarios')
        .insert([
          { id: authData.user.id, nome, email }
        ]);

      if (perfilError) throw perfilError;
    }

    return authData;
  }
}