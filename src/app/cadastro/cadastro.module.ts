import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { CadastroComponent } from './cadastro.component';
import { RouterModule } from '@angular/router';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    RouterModule.forChild([{ path: '', component: CadastroComponent }]), // ← rota interna
    CadastroComponent, // ← importar, não declarar
    RouterModule,
  ],

})
export class CadastroModule {}