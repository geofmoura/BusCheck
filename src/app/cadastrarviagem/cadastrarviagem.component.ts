import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { Supabase, Passageiro } from '../services/supabase';

export interface Viagem {
  id: string;
  origem: string;
  destino: string;
  dataPartida: string;
  horario: string;
  vagas: number;
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

  passageiro: Passageiro | null = null;  // ← adicionado
  viagensDisponiveis: Viagem[] = [];
  viagensInscritas: Viagem[] = [];
  activeTab: 'disponiveis' | 'minhas' = 'disponiveis';

  constructor(
    private router: Router,
    private supabase: Supabase  // ← adicionado
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

  inscrever(viagem: Viagem) {
    console.log('Inscrever na viagem:', viagem.id);
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