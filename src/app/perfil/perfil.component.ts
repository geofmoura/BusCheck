import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Supabase, Passageiro } from '../services/supabase';

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