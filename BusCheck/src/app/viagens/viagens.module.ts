import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { ViagensComponent } from './viagens.component';
import { RouterModule } from '@angular/router'; 

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
     ViagensComponent,
    RouterModule.forChild([{ path: '', component: ViagensComponent }]),
  ],

})
export class ViagensModule {}