import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
//import { MainPage } from '../';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-account',
  templateUrl: 'account.html'
})
export class AccountPage {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { user_id: number, user_username: string, user_firstname: string, user_lastname: string, user_email: string, user_mobile: string } = {
    //initialize these values
    user_id: 0,
    user_username: '',
    user_firstname: '',
	user_lastname: '',
    user_email: '',
    user_mobile: ''
	
  };

  // Our translated text strings
  private accountErrorString: string;
  private accountMsgString: string;
  private logoutMsgString: string;
  //array for user details
  public userDet: any = [];

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
	public translate: TranslateService,
    public translateService: TranslateService,
	private storage: Storage) {

    this.translateService.get('ACCOUNT_ERROR').subscribe((value) => {
      this.accountErrorString = value;
    });

    this.translateService.get('ACCOUNT_MSG').subscribe((value) => {
      this.accountMsgString = value;
    });
	
	// Or to get a key/value pair
    this.storage.get('user_username').then((val) => {
      if(!val){
        //console.log('Your username is', val);
        this.navCtrl.push('WelcomePage');
        //this._user = val;
       }
	   //push acct details to an array
	   this.storage.get('user_id').then((val) => {
	     //push acct details to an array
	     console.log('Your ID', val);
		 this.user.get_user(val).subscribe((resp) => {
		   console.log('My Details', resp);
		   //this.userDet = resp;
		   this.account.user_id       = resp['user_id'];
		   this.account.user_username = resp['user_username'];
		   this.account.user_firstname= resp['user_firstname'];
		   this.account.user_lastname = resp['user_lastname'];
		   this.account.user_email    = resp['user_email'];
		   this.account.user_mobile   = resp['user_mobile'];
		   //console.log('My Pushed Details', this.userDet);
		 });
	   });
    });

    this.translateService.get('LOGOUT_MSG').subscribe((value) => {
      this.logoutMsgString = value;
    })
    
  }
  

  doUpdateAccount() {
	  console.log('ACCOUNT UPDATE Start', this.account);
    // Attempt to update account through User service
    this.user.account_update(this.account).subscribe((resp) => {
      //this.navCtrl.push(MainPage);
      console.log('ACCOUNT UPDATE OK', resp);
      if(resp['error']){ // if account update fails
        //this.navCtrl.push(SignupPage);
        // Unable to update account
        let toast = this.toastCtrl.create({
          message: resp['message'],
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }else{ // if account update succeeds
        //this.navCtrl.push(AccountPage);
        // account update success msg
        let toast = this.toastCtrl.create({
          message: this.accountMsgString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    }, (err) => {

      //this.navCtrl.push(MainPage);

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.accountErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
  
   /**
   * Log the user out, which forgets the session
   */
  logout() {
   
    this.user.logout();
    this.navCtrl.push('LoginPage');
     //logged out message
     let toast = this.toastCtrl.create({
      message: this.logoutMsgString,
      duration: 3000,
      position: 'top'
    });
    toast.present();

  }
  //respond to my address button
  myaddress() {
    this.navCtrl.push('AddressPage');
  }
  
  //respond to my address button
  mystore() {
    this.navCtrl.push('StorePage');
  }
}
