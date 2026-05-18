import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { IonicModule } from '@ionic/angular';
import { Supabase } from '../services/supabase';
import { Passageiro } from '../services/types';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss'],
  standalone: true,
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    RouterModule,
  ],
})
export class PerfilComponent implements OnInit {

  passageiro: Passageiro | null = null;

  constructor(
    private supabase: Supabase,
    private router: Router,
  ) {}

  async ngOnInit() {
    const resultado = await this.supabase.getPassageiroAtual();
    if (resultado.success) {
      this.passageiro = resultado.data;
    }
  }

  voltar() {
    this.router.navigate(['/viagens']);
  }
}