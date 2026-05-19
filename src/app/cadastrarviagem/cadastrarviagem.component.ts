import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Supabase } from '../services/supabase';
import { Passageiro } from '../services/types';

export interface Rota {
  id: number;
  descricao: string;
  codigo_veiculo: string;
  motorista_id: number;
  turno: string;
}

const DIAS_SEMANA = ['SEG', 'TER', 'QUA', 'QUI', 'SEX'];

@Component({
  selector: 'app-cadastrarviagem',
  templateUrl: './cadastrarviagem.component.html',
  styleUrls: ['./cadastrarviagem.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
  ],
})
export class CadastrarViagemComponent implements OnInit {

  passageiro: Passageiro | null = null;
  usuarioId: number | null = null;
  rotas: Rota[] = [];
  rotasSelecionadas: { [rotaId: number]: boolean } = {};
  diasSelecionados: { [rotaId: number]: { [dia: string]: boolean } } = {};
  diasSemana = DIAS_SEMANA;
  inscricoesExistentes: Set<number> = new Set();
  carregando = true;
  salvando = false;
  removendo: number | null = null;

  constructor(
    private router: Router,
    private supabase: Supabase
  ) {}

  async ngOnInit() {
    const resultado = await this.supabase.getPassageiroAtual();
    if (resultado.success) {
      this.passageiro = resultado.data;
      this.usuarioId = resultado.data.id
    }

    await this.carregarRotas();
    await this.carregarInscricoesExistentes();
    this.carregando = false;
  }

  async carregarRotas() {
    const resultado = await this.supabase.getAllRotas();
    if (resultado.success && resultado.data) {
      this.rotas = resultado.data;
      this.rotas.forEach(rota => {
        this.rotasSelecionadas[rota.id] = false;
        this.diasSelecionados[rota.id] = {};
        this.diasSemana.forEach(d => this.diasSelecionados[rota.id][d] = false);
      });
    }
  }

  async carregarInscricoesExistentes() {
    if (!this.usuarioId) return;

    const resultado = await this.supabase.getInscricoesDoPassageiro(this.usuarioId);
    if (resultado.success && resultado.data) {
      resultado.data.forEach((inscricao: any) => {
        this.inscricoesExistentes.add(inscricao.rota_id);
        if (this.diasSelecionados[inscricao.rota_id]) {
          const dias = inscricao.dias_viagem?.split(';') ?? [];
          dias.forEach((d: string) => {
            if (this.diasSelecionados[inscricao.rota_id][d] !== undefined) {
              this.diasSelecionados[inscricao.rota_id][d] = true;
            }
          });
          this.rotasSelecionadas[inscricao.rota_id] = true;
        }
      });
    }
  }

  jaInscrito(rotaId: number): boolean {
    return this.inscricoesExistentes.has(rotaId);
  }

  toggleRota(rotaId: number) {
    if (this.jaInscrito(rotaId)) return;
    this.rotasSelecionadas[rotaId] = !this.rotasSelecionadas[rotaId];
    if (!this.rotasSelecionadas[rotaId]) {
      this.diasSemana.forEach(d => this.diasSelecionados[rotaId][d] = false);
    }
  }

  toggleDia(rotaId: number, dia: string) {
    if (this.jaInscrito(rotaId)) return;
    this.diasSelecionados[rotaId][dia] = !this.diasSelecionados[rotaId][dia];
  }

  diasDaRota(rotaId: number): string {
    return this.diasSemana
      .filter(d => this.diasSelecionados[rotaId][d])
      .join(';');
  }

  algumDiaSelecionado(rotaId: number): boolean {
    return this.diasSemana.some(d => this.diasSelecionados[rotaId][d]);
  }

  rotasParaInscrever(): Rota[] {
    return this.rotas.filter(r =>
      this.rotasSelecionadas[r.id] &&
      !this.jaInscrito(r.id) &&
      this.algumDiaSelecionado(r.id)
    );
  }

  get totalInscritas(): number {
    return this.inscricoesExistentes.size;
  }

  get totalDisponiveis(): number {
    return this.rotas.length;
  }

  async confirmarInscricoes() {
    const rotas = this.rotasParaInscrever();
    if (!rotas.length || !this.usuarioId) return;

    this.salvando = true;

    const inscricoes = rotas.map(rota => ({
      usuario_id: this.usuarioId,
      rota_id: rota.id,
      dias_viagem: this.diasDaRota(rota.id),
    }));

    const resultado = await this.supabase.inscreverNasRotas(inscricoes as any);

    this.salvando = false;

    if (!resultado.success) {
      alert('Erro ao salvar inscrições. Tente novamente.');
    } else {
      rotas.forEach(r => this.inscricoesExistentes.add(r.id));
      alert('Inscrição confirmada em ' + rotas.length + ' rota(s)!');
    }
  }

  async removerInscricao(rotaId: number) {
    if (!this.usuarioId) return;

    this.removendo = rotaId;

    const resultado = await this.supabase.removerInscricao(this.usuarioId, rotaId);

    this.removendo = null;

    if (!resultado.success) {
      alert('Erro ao remover inscrição. Tente novamente.');
    } else {
      this.inscricoesExistentes.delete(rotaId);
      this.rotasSelecionadas[rotaId] = false;
      this.diasSemana.forEach(d => this.diasSelecionados[rotaId][d] = false);
    }
  }

  voltar() {
    this.router.navigate(['/viagens']);
  }
}