import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TemaService {

  private modoNoturno = false;

  toggleModoNoturno() {
    this.modoNoturno = !this.modoNoturno;
    document.documentElement.classList.toggle('ion-palette-dark', this.modoNoturno);
  }

  isModoNoturno(): boolean {
    return this.modoNoturno;
  }

  resetarTema() {
    this.modoNoturno = false;
    document.documentElement.classList.remove('ion-palette-dark');
  }
}