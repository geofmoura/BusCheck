import { Component, OnInit } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Supabase, Passageiro } from '../services/supabase';
import { TemaService } from '../services/tema.service';

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
    if (resultado.success) {
      this.passageiro = resultado.data;
    }
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