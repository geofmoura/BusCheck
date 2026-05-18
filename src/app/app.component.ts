import { Component, OnInit } from '@angular/core';
import { StatusBar, Style } from '@capacitor/status-bar';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent implements OnInit{
  constructor(private platform: Platform) {}
  
  async ngOnInit() {
    await this.platform.ready();
    try{
      await StatusBar.setStyle({ style: Style.Default  });
      await StatusBar.setOverlaysWebView({ overlay: false }); 
    } catch (error) {
      console.log('Erro ao configurar a StatusBar:', error);
    }
  }

}
