import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, IonicModule, LoadingController, ViewWillLeave } from '@ionic/angular'; // CORRIGIDO
import { Supabase } from '../services/supabase';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class CadastroComponent implements OnInit, ViewWillLeave { 
  cadastroForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;
  isSubmitting = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private supabase: Supabase,
    private alertController: AlertController,
    private loadingController: LoadingController
  ) {
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]],
      codigo_cartao: ['', [Validators.required]],
      faculdade: ['', [Validators.required]]
    }, { 
      validators: this.senhasCoincidem('senha', 'confirmarSenha')
    });
  }

  ngOnInit() {
    this.resetForm();
  }

  ionViewWillLeave() {
    this.resetForm();
  }

  senhasCoincidem(senha: string, confirmarSenha: string) {
    return (formGroup: FormGroup) => {
      const senhaControl = formGroup.get(senha);
      const confirmarSenhaControl = formGroup.get(confirmarSenha);
      
      if (confirmarSenhaControl?.errors && !confirmarSenhaControl.errors['senhaNaoCoincide']) {
        return;
      }
      
      if (senhaControl?.value !== confirmarSenhaControl?.value) {
        confirmarSenhaControl?.setErrors({ senhaNaoCoincide: true });
      } else {
        confirmarSenhaControl?.setErrors(null);
      }
    };
  }

  formatarTelefone(event: any) {
    let valor = event.target.value;
    valor = valor.replace(/\D/g, '');
    
    if (valor.length >= 11) {
      valor = valor.replace(/^(\d{2})(\d{5})(\d{4})$/, '($1) $2-$3');
    } else if (valor.length >= 7) {
      valor = valor.replace(/^(\d{2})(\d{4})(\d{0,4})$/, '($1) $2-$3');
    } else if (valor.length >= 3) {
      valor = valor.replace(/^(\d{2})(\d{0,5})$/, '($1) $2');
    } else if (valor.length > 0) {
      valor = valor.replace(/^(\d*)$/, '($1');
    }
    
    this.cadastroForm.get('telefone')?.setValue(valor, { emitEvent: false });
  }

  togglePassword() {
    this.showPassword = !this.showPassword;
  }

  toggleConfirmPassword() {
    this.showConfirmPassword = !this.showConfirmPassword;
  }

  resetForm() {
    this.cadastroForm.reset();
    this.cadastroForm.markAsPristine();
    this.cadastroForm.markAsUntouched();
    
    Object.keys(this.cadastroForm.controls).forEach(key => {
      this.cadastroForm.get(key)?.setValue('');
      this.cadastroForm.get(key)?.markAsPristine();
      this.cadastroForm.get(key)?.markAsUntouched();
    });
  }

  goToHome() {
    this.resetForm();
    this.router.navigate(['/home']);
  }

  goToLogin() {
    this.resetForm();
    this.router.navigate(['/login']);
  }

  async onSubmit() {
    if (this.isSubmitting) {
      return;
    }

    if (this.cadastroForm.valid) {
      this.isSubmitting = true;
      
      const loading = await this.loadingController.create({
        message: 'Cadastrando...',
        spinner: 'crescent'
      });
      await loading.present();

      try {
        const passageiro = {
          nome_completo: this.cadastroForm.get('nome')?.value,
          email: this.cadastroForm.get('email')?.value,
          senha: this.cadastroForm.get('senha')?.value,
          telefone: this.cadastroForm.get('telefone')?.value,
          codigo_cartao: this.cadastroForm.get('codigo_cartao')?.value,
          faculdade: this.cadastroForm.get('faculdade')?.value,
          endereco: "Rua das Flores, 123 - Centro"
        };

        const resultado = await this.supabase.cadastrarUsuario(passageiro);
        await loading.dismiss();

        if (resultado.success) {
          this.resetForm();
          
          const alert = await this.alertController.create({
            header: 'Sucesso!',
            message: 'Cadastro realizado com sucesso! Faça seu login.',
            buttons: [{text: 'OK'}]
          });
          await alert.present();
        } else {
          let mensagemErro = 'Erro ao realizar cadastro.';
          
          if (resultado.error?.message) {
            if (resultado.error.message.includes('rate limit')) {
              mensagemErro = 'Muitas tentativas. Aguarde alguns minutos e tente novamente.';
            } else if (resultado.error.message.includes('already registered')) {
              mensagemErro = 'Este email já está cadastrado. Use outro email ou faça login.';
            } else if (resultado.error.message.includes('invalid')) {
              mensagemErro = 'Email inválido. Verifique o formato.';
            } else if (resultado.error.message.includes('password')) {
              mensagemErro = 'A senha deve ter no mínimo 6 caracteres.';
            } else {
              mensagemErro = resultado.error.message;
            }
          }

          const alert = await this.alertController.create({
            header: 'Erro!',
            message: mensagemErro,
            buttons: ['OK']
          });
          await alert.present();
        }
      } catch (error: any) {
        await loading.dismiss();
        
        let mensagemErro = error.message || 'Erro ao conectar com o servidor.';
        
        if (mensagemErro.includes('rate limit')) {
          mensagemErro = 'Limite de tentativas excedido. Aguarde 10 minutos.';
        }
        
        const alert = await this.alertController.create({
          header: 'Erro!',
          message: mensagemErro,
          buttons: ['OK']
        });
        await alert.present();
      } finally {
        this.isSubmitting = false;
      }
    } else {
      Object.keys(this.cadastroForm.controls).forEach(key => {
        this.cadastroForm.get(key)?.markAsTouched();
      });

      const alert = await this.alertController.create({
        header: 'Atenção!',
        message: 'Preencha todos os campos corretamente.',
        buttons: ['OK']
      });
      await alert.present();
    }
  }
}