import { Component, OnInit } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { Supabase, Passageiro } from '../services/supabase';

@Component({
  selector: 'app-viagens',
  templateUrl: './viagens.component.html',
  styleUrls: ['./viagens.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
})
export class ViagensComponent implements OnInit {

   passageiro: Passageiro | null = null;

  constructor(
    private menuCtrl: MenuController,
    private supabase: Supabase
  ) {}

 async ngOnInit() {
    const resultado = await this.supabase.getPassageiroAtual();
    if (resultado.success) {
      this.passageiro = resultado.data;
    }
  }

  fecharMenu() {
    this.menuCtrl.close('mainMenu');
  }
}