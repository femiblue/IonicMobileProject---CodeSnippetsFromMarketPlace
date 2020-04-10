import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
import { MainPage } from '../';

@IonicPage()
@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { user_username: string, user_password: string } = {
    user_username: '',
    user_password: ''
  };

  // Our translated text strings
  private loginErrorString: string;
  private loginMsgString: string;

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
    public translateService: TranslateService) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    });
    this.translateService.get('LOGIN_MSG').subscribe((value) => {
      this.loginMsgString = value;
    });
  }

  // Attempt to login in through our User service
  doLogin() {
    this.user.login(this.account).subscribe((resp) => {
      //console.log('LOGIN OK', resp);
      if(resp['error']){ // if login fails
        //this.navCtrl.push(LoginPage);
        // Unable to log in
        let toast = this.toastCtrl.create({
          //message: this.loginErrorString,
          message: resp['message'],
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }else{ // if login succeeds
        this.navCtrl.push(MainPage);
        // Log in msg
        let toast = this.toastCtrl.create({
          message: this.loginMsgString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
      
    }, (err) => {
      // Unable to log in
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
