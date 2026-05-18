import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { PerfilComponent } from './perfil.component';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    PerfilComponent,
    RouterModule.forChild([{ path: '', component: PerfilComponent }]),
  ],
})
export class PerfilModule {}