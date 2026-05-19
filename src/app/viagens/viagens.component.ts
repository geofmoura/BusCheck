import { Component, OnInit } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Supabase, Passageiro } from '../services/supabase';
import { TemaService } from '../services/tema.service';

export interface RotaInscrita {
  rota_id: number;
  dias_viagem: string;
  descricao: string;
  turno: string;
}

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
  rotasInscritas: RotaInscrita[] = [];
  carregando = true;
  diaSemanaHoje: string = '';

  constructor(
    private menuCtrl: MenuController,
    private supabase: Supabase,
    private router: Router,
    private temaService: TemaService
  ) {}

  async ngOnInit() {
    this.diaSemanaHoje = this.getDiaSemanaHoje();

    const resultado = await this.supabase.getPassageiroAtual();
    if (resultado.success) {
      this.passageiro = resultado.data;
      await this.carregarRotasDeHoje(resultado.data.id);
    }

    this.carregando = false;
  }

  getDiaSemanaHoje(): string {
    const dias = ['DOM', 'SEG', 'TER', 'QUA', 'QUI', 'SEX', 'SAB'];
    return dias[new Date().getDay()];
  }

  async carregarRotasDeHoje(usuarioId: number) {
    const inscricoesRes = await this.supabase.getInscricoesDoPassageiro(usuarioId);
    if (!inscricoesRes.success || !inscricoesRes.data) return;

    // Filtra só as rotas do dia de hoje
    const inscricoesHoje = inscricoesRes.data.filter((i: any) =>
      i.dias_viagem?.split(';').includes(this.diaSemanaHoje)
    );

    if (!inscricoesHoje.length) return;

    // Busca detalhes das rotas
    const rotasRes = await this.supabase.getRotas();
    if (!rotasRes.success || !rotasRes.data) return;

    this.rotasInscritas = inscricoesHoje.map((inscricao: any) => {
      const rota = rotasRes.data.find((r: any) => r.id === inscricao.rota_id);
      return {
        rota_id: inscricao.rota_id,
        dias_viagem: inscricao.dias_viagem,
        descricao: rota?.descricao ?? 'Rota desconhecida',
        turno: rota?.turno ?? '',
      };
    });
  }

  toggleModoNoturno() {
    this.modoNoturnoAtivo = !this.modoNoturnoAtivo;
    this.temaService.toggleModoNoturno();
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