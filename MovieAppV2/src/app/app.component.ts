import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { addIcons } from 'ionicons';
import { home, calendarOutline, heart, filmOutline, informationCircleOutline, heartOutline, sadOutline, searchCircleOutline, heartDislikeOutline } from 'ionicons/icons';
import { Platform } from '@ionic/angular'; 

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'], 
  standalone: true,
  imports: [IonApp, IonRouterOutlet],
})
export class AppComponent {
  constructor(private platform: Platform) { 
    addIcons({ home, calendarOutline, heart, filmOutline, informationCircleOutline, heartOutline, sadOutline, searchCircleOutline, heartDislikeOutline });

    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
    });
  }
}