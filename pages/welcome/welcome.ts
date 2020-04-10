import { Component } from '@angular/core';
import { IonicPage, NavController } from 'ionic-angular';
import { User } from '../../providers/user/user';
import { Storage } from '@ionic/storage';
/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
*/
@IonicPage()
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {
  _user: any;
  constructor(public navCtrl: NavController, public user: User,private storage: Storage) { 
    // Or to get a key/value pair
    this.storage.get('user_username').then((val) => {
      if(val){
        //console.log('Your username is', val);
        this.navCtrl.push('TabsPage');
        //this._user = val;
       }
    });
   

  }

  login() {
    this.navCtrl.push('LoginPage');
  }

  signup() {
    this.navCtrl.push('SignupPage');
  }

  listitem() {
    this.navCtrl.push('TabsPage');
  }

 
}
