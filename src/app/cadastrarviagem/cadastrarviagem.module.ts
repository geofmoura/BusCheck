import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CadastrarViagemComponent } from './cadastrarviagem.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CadastrarViagemComponent,
    RouterModule.forChild([{ path: '', component: CadastrarViagemComponent }]),
  ],
})
export class CadastrarViagemModule {}