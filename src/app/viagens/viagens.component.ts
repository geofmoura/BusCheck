import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule, MenuController } from '@ionic/angular';
import { Supabase } from '../services/supabase';
import { TemaService } from '../services/tema.service';
import { Passageiro, Rota } from '../services/types';

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
  modoNoturnoAtivo = false;
  rotas: Rota[] = []

  constructor(
    private menuCtrl: MenuController,
    private supabase: Supabase,
    private router: Router,
    private temaService: TemaService
  ) {}

  toggleModoNoturno() {
    this.modoNoturnoAtivo = !this.modoNoturnoAtivo;
    this.temaService.toggleModoNoturno();
  }

  async ngOnInit() {
    const resultado = await this.supabase.getPassageiroAtual();
    if (!resultado.success) return
    this.passageiro = resultado.data;

    const rotas = await this.supabase.getRotasByUserId(this.passageiro.id, this.passageiro.tipo);
    if (!rotas.success) return
    this.rotas = rotas.data
    console.log(this.rotas)

  }

  fecharMenu() {
    this.menuCtrl.close('mainMenu');
  }

  async sair() {
    await this.supabase.logout();
    this.temaService.resetarTema();
    this.modoNoturnoAtivo = false;
    this.menuCtrl.close('mainMenu');
    this.router.navigate(['/home']);
  }
}