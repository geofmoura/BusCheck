import { Component, OnInit } from '@angular/core';
import { IonicModule, MenuController } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { TemaService } from '../services/tema.service';

export interface PassageiroMotorista {
  nome: string;
  endereco: string;
  universidade: string;
  telefone: string;
  status: 'pendente' | 'confirmado' | 'embarcado' | 'cancelado';
  confirmadoEm?: string;
  embarcadoEm?: string;
}

export interface ViagemMotorista {
  id: string;
  horario: string;
  origem: string;
  destino: string;
  passageiros: PassageiroMotorista[];
}

@Component({
  selector: 'app-motorista',
  templateUrl: './motorista.component.html',
  styleUrls: ['./motorista.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, FormsModule],
})
export class MotoristaComponent implements OnInit {

  nomeMotorista = 'Roberto Carvalho';
  activeTab: 'lista' | 'mapa' = 'lista';
  modoNoturnoAtivo = false;

  viagens: ViagemMotorista[] = [
     {
      id: '1',
      horario: '06:00',
      origem: 'Interior',
      destino: 'São Paulo (Zona Oeste)',
      passageiros: [
        {
          nome: 'Maria Silva Santos',
          endereco: 'Rua das Flores, 123 - Centro',
          universidade: 'USP - Campus São Paulo',
          telefone: '(11) 98765-4321',
          status: 'embarcado',
          confirmadoEm: '5 min atrás',
          embarcadoEm: '2 min atrás',
        },
        {
          nome: 'João Pedro Oliveira',
          endereco: 'Av. Principal, 456 - Jardim América',
          universidade: 'UNICAMP - Campinas',
          telefone: '(11) 97654-3210',
          status: 'confirmado',
          confirmadoEm: '3 min atrás',
        },
        {
          nome: 'Ana Carolina Ferreira',
          endereco: 'Praça da Matriz, 789 - Vila Nova',
          universidade: 'UNESP - São Paulo',
          telefone: '(11) 96543-2109',
          status: 'pendente',
        },
        {
          nome: 'Beatriz Almeida Costa',
          endereco: 'Travessa São João, 567 - Bairro Alto',
          universidade: 'UNICAMP - Campinas',
          telefone: '(11) 94321-0987',
          status: 'cancelado',
        }
      ]
    },
    {
      id: '2',
      horario: '13:30',
      origem: 'São Paulo',
      destino: 'Interior (Retorno)',
      passageiros: [
        {
          nome: 'Maria Silva Santos',
          endereco: 'Rua das Flores, 123 - Centro',
          universidade: 'USP - Campus São Paulo',
          telefone: '(11) 98765-4321',
          status: 'pendente',
        }
      ]
    }
  ];

  viagemSelecionada: ViagemMotorista = this.viagens[0];

  constructor(
    private router: Router,
    private menuCtrl: MenuController,
    private temaService: TemaService 
  ) {}

  ngOnInit() {
    this.detectarViagemAtual();
  }

  detectarViagemAtual() {
    const agora = new Date();
    const hora = agora.getHours();
    this.viagemSelecionada = hora >= 10 ? this.viagens[1] : this.viagens[0];
  }

  selecionarViagem(viagem: ViagemMotorista) {
    this.viagemSelecionada = viagem;
  }

  toggleModoNoturno() {
    this.modoNoturnoAtivo = !this.modoNoturnoAtivo;
    this.temaService.toggleModoNoturno();
  }

  fecharMenu() {
    this.menuCtrl.close('motoristaMenu');
  }

getStatusColor(status: string): string {
  switch (status) {
    case 'embarcado': return 'success';
    case 'confirmado': return 'warning';
    case 'cancelado': return 'danger';
    case 'pendente': return 'medium';
    default: return 'medium';
  }
}

getStatusLabel(status: string): string {
  switch (status) {
    case 'embarcado': return 'Embarcado';
    case 'confirmado': return 'Confirmado';
    case 'cancelado': return 'Perdeu a viagem';
    case 'pendente': return 'Pendente';
    default: return 'Pendente';
  }
}

getStatusIcon(status: string): string {
  switch (status) {
    case 'embarcado': return 'checkmark-circle-outline';
    case 'confirmado': return 'time-outline';
    case 'cancelado': return 'close-circle-outline';
    case 'pendente': return 'information-circle-outline';
    default: return 'information-circle-outline';
  }
}

  sair() {
    this.temaService.resetarTema();
    this.modoNoturnoAtivo = false;
    this.menuCtrl.close('motoristaMenu');
    this.router.navigate(['/home']);
  }
}