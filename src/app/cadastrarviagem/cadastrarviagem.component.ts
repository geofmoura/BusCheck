import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Supabase, Passageiro } from '../services/supabase';

export interface ViagemInscrita {
  id: string;
  origem: string;
  destino: string;
  dataPartida: string;
  horario: string;
  motorista: string;
  enderecoEmbarque?: string;
  enderecoDesembarque?: string;
  tipo: 'ida' | 'volta';
  status: 'confirmada' | 'embarcado';
}

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
  viagensDisponiveis: any[] = [];
  viagensInscritas: any[] = [];
  activeTab: 'disponiveis' | 'minhas' = 'disponiveis';
  enderecoEmbarqueIda: string = '';
  enderecoDesembarqueVolta: string = '';

  constructor(
    private router: Router,
    private supabase: Supabase
  ) {}

  async ngOnInit() {
    this.carregarViagens();
    const resultado = await this.supabase.getPassageiroAtual();
    if (resultado.success) {
      this.passageiro = resultado.data;
    }
  }

  carregarViagens() {
    this.viagensDisponiveis = [];
    this.viagensInscritas = [];
  }

  confirmarInscricaoIda() {
    const viagemInscrita: ViagemInscrita = {
      id: 'ida-' + Date.now(),
      origem: 'Interior',
      destino: 'São Paulo (Zona Oeste)',
      dataPartida: new Date().toISOString().split('T')[0],
      horario: '06:00',
      motorista: 'Roberto Carvalho',
      enderecoEmbarque: this.enderecoEmbarqueIda,
      tipo: 'ida',
      status: 'confirmada'
    };

    this.salvarViagem(viagemInscrita);
    alert('Viagem de IDA confirmada com sucesso!');
    this.enderecoEmbarqueIda = '';
  }

  confirmarInscricaoVolta() {
    const viagemInscrita: ViagemInscrita = {
      id: 'volta-' + Date.now(),
      origem: 'São Paulo (Zona Oeste)',
      destino: 'Interior',
      dataPartida: new Date().toISOString().split('T')[0],
      horario: '13:30',
      motorista: 'Roberto Carvalho',
      enderecoDesembarque: this.enderecoDesembarqueVolta,
      tipo: 'volta',
      status: 'confirmada'
    };

    this.salvarViagem(viagemInscrita);
    alert('Viagem de VOLTA confirmada com sucesso!');
    this.enderecoDesembarqueVolta = '';
  }

  private salvarViagem(viagem: ViagemInscrita) {
    const viagensSalvas = JSON.parse(localStorage.getItem('viagensInscritas') || '[]');
    viagensSalvas.push(viagem);
    localStorage.setItem('viagensInscritas', JSON.stringify(viagensSalvas));
    console.log('Viagem salva:', viagem);
  }

  get totalInscritas(): number {
    return this.viagensInscritas.length;
  }

  get totalDisponiveis(): number {
    return this.viagensDisponiveis.length;
  }

  voltar() {
    this.router.navigate(['/viagens']);
  }
}