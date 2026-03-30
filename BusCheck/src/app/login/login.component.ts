import { Component, OnInit } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true, // ← confirma que é standalone
  imports: [
    IonicModule,    // ← isso resolve o 'ion-content' e todos os componentes Ionic
    CommonModule,
    FormsModule,
  ],
})
export class LoginComponent implements OnInit {
  constructor() {}
  ngOnInit() {}
}