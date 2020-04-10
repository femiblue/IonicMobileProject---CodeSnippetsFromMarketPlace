import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
//import { MainPage } from '../';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-store',
  templateUrl: 'store.html'
})
export class StorePage {
  // The account fields for the address form.
  account: { 
  store_id: number, 
  store_name: string, 
  store_desc: string, 
  store_owner: string } = {
	  
	//initialize these value  
    store_id: 0,
	store_name: '',
	store_desc: '',
    store_owner: ''
	
  };

  // Our translated text strings
  private storeErrorString: string;
  private storeMsgString: string;
  //private logoutMsgString: string;
  //array for user details
  public userDet: any = [];

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
	public translate: TranslateService,
    public translateService: TranslateService,
	private storage: Storage) {

    this.translateService.get('STORE_ERROR').subscribe((value) => {
      this.storeErrorString = value;
    });

    this.translateService.get('STORE_MSG').subscribe((value) => {
      this.storeMsgString = value;
    });
	
	// Or to get a key/value pair
    this.storage.get('user_username').then((val) => {
      if(!val){
        //console.log('Your username is', val);
        this.navCtrl.push('WelcomePage');
        //this._user = val;
       }
	   //push acct details to an array
	   this.storage.get('store_id').then((val) => {
	     //push acct details to an array
	     console.log('Store ID', val);
		 this.user.get_store(val).subscribe((resp) => {
		   console.log('My Store', resp);
		   //this.userDet = resp;
		   this.account.store_id     = resp['store_id'];
		   this.account.store_name   = resp['store_name'];
		   this.account.store_desc   = resp['store_desc'];
		   this.account.store_owner  = resp['store_owner'];

		   //console.log('My Pushed Details', this.userDet);
		 });
	   });
    });

    
  }
  

  doUpdateStore() {
	  console.log('STORE UPDATE Start', this.account);
    // Attempt to update account through User service
    this.user.store_update(this.account).subscribe((resp) => {
      //this.navCtrl.push(MainPage);
      console.log('STORE UPDATE OK', resp);
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
        //this.navCtrl.push(AddressPage);
        // account update success msg
        let toast = this.toastCtrl.create({
          message: this.storeMsgString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    }, (err) => {

      //this.navCtrl.push(MainPage);

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.storeErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
  
  //respond to my address button
  myaddress() {
    this.navCtrl.push('AddressPage');
  }
  
  //respond to my services button
  myservices() {
    this.navCtrl.push('MyServicesPage');
  }

  //respond to my requests button
  myirequests() {
    this.navCtrl.push('IrequestsPage');
  }



}
