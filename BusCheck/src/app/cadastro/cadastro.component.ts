import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

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
export class CadastroComponent implements OnInit {
  cadastroForm: FormGroup;
  showPassword = false;
  showConfirmPassword = false;

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
 
    this.cadastroForm = this.fb.group({
      nome: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      telefone: ['', [Validators.required, Validators.pattern(/^\(\d{2}\) \d{4,5}-\d{4}$/)]],
      senha: ['', [Validators.required, Validators.minLength(6)]],
      confirmarSenha: ['', [Validators.required]]
    }, { 
      validators: this.senhasCoincidem('senha', 'confirmarSenha')
    });
  }

  ngOnInit() {}

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

  onSubmit() {
    if (this.cadastroForm.valid) {
      const dadosCadastro = {
        nome: this.cadastroForm.get('nome')?.value,
        email: this.cadastroForm.get('email')?.value,
        telefone: this.cadastroForm.get('telefone')?.value,
        senha: this.cadastroForm.get('senha')?.value
      };
      
      console.log('Dados do cadastro:', dadosCadastro);

      this.router.navigate(['/login']);
    } else {

      Object.keys(this.cadastroForm.controls).forEach(key => {
        this.cadastroForm.get(key)?.markAsTouched();
      });
    }
  }

  goToHome() {
    this.router.navigate(['/home']);
  }

  goToLogin() {
    this.router.navigate(['/login']);
  }
}