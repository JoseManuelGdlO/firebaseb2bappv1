import { Component } from '@angular/core';
import { LocalNotifications } from '@ionic-native/local-notifications';
import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { FCM } from '@ionic-native/fcm/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private fcm: FCM,
    private router: Router,
    private localNotifications: LocalNotifications
  ) {
    this.initializeApp();


    this.fcm.onNotification().subscribe(data => {
      console.log("DATA OF NOTIFICATION --->", data);
      if (data.wasTapped) {
        console.log('Received in background');
        this.router.navigate([data.landing_page, data.price]);

       
      } else {
        console.log('Received in foreground');
        this.router.navigate([data.landing_page, data.price]);
        
        this.localNotifications.schedule({
          id: 1,
          text: data.price,
          foreground: true
        });

      }
    })
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
      this.fcm.getToken().then(token => {
        console.log("GET TOKEN -->", token)
      })
      this.fcm.onTokenRefresh().subscribe(token => {
        console.log("REFRESH TOKEN --->", token);
      })


    });
  }
}
