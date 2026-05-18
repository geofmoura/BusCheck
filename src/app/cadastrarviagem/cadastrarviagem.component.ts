import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Supabase } from '../services/supabase';
import { Passageiro, Rota } from '../services/types';

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
  viagensDisponiveis: Rota[] = [];
  viagensInscritas: any[] = [];
  activeTab: 'disponiveis' | 'minhas' = 'disponiveis';

  constructor(
    private router: Router,
    private supabase: Supabase
  ) {}

  async ngOnInit() {
    const resultado = await this.supabase.getPassageiroAtual();
    if (!resultado.success) return
    this.passageiro = resultado.data;
    
    const routes = await this.supabase.getRotasByUserId(this.passageiro.id, 'PASSAGEIRO')
    if (!routes.success) return
    this.viagensInscritas  = routes.data

    await this.carregarViagens();
  }

  async carregarViagens() {
    const rotas = await this.supabase.getAllRotas()
    if(!rotas.success) return
    this.viagensDisponiveis = rotas.data
    
  }

  isSubiscribe(id: number){
    if(this.viagensInscritas.find(item => item.id == id)) return true
    return false
  }

  confirmarInscricaoIda() {}

  confirmarInscricaoVolta() {}

  private salvarViagem(viagem: Rota) {
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