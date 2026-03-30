import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { signal } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false
})
export class HomePage {

  mostrarFormulario = false;

  email = new FormControl('', [Validators.required, Validators.email]);

  errorMessage = signal('');

  esconder() {
    this.mostrarFormulario = !this.mostrarFormulario;
  }

  updateErrorMessage() {
    if (this.email.hasError('required')) {
      this.errorMessage.set('E-mail é obrigatório');
    } else if (this.email.hasError('email')) {
      this.errorMessage.set('E-mail inválido');
    } else {
      this.errorMessage.set('');
    }

  }

  hide = signal(true);
  clickEvent(event: MouseEvent) {
    this.hide.set(!this.hide());
    event.stopPropagation();
  }
}