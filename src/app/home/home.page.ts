import { Component, signal } from '@angular/core';
import { FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Supabase } from '../services/supabase';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon'; 

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
   standalone: true,
  imports: [
    CommonModule,
    IonicModule,
    RouterModule,
    ReactiveFormsModule,  
    MatFormFieldModule,           
    MatInputModule, 
    MatButtonModule,
    MatIconModule,  
  ]
})
export class HomePage {

  email = new FormControl('', [Validators.required, Validators.email]);
  senha = new FormControl('', [Validators.required]);

  errorMessage = signal('');
  hide = signal(true);

  constructor(private supabase: Supabase, private router: Router) {}

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('E-mail é obrigatório');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('E-mail inválido');
    } else {
      this.errorMessage.set('');
    }
  }

  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }

  async fazerLogin() {
    const email = this.email.value;
    const senha = this.senha.value;

    if (!email || !senha) {
      console.log('Preencha todos os campos');
      return;
    }

    const resposta = await this.supabase.login(email, senha);

    if (resposta.success) {
      this.router.navigate(['/viagens']);
    } else {
      console.log('Email ou senha inválidos');
    }
  }
}