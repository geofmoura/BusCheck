import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MotoristaComponent } from './motorista.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MotoristaComponent,
    RouterModule.forChild([{ path: '', component: MotoristaComponent }]),
  ],
})
export class MotoristaModule {}