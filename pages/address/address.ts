import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { IonicPage, NavController, ToastController } from 'ionic-angular';

import { User } from '../../providers';
//import { MainPage } from '../';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-address',
  templateUrl: 'address.html'
})
export class AddressPage {
  // The account fields for the address form.
  account: { 
  store_address_id: number, 
  store_address_number: string, 
  store_address_street: string, 
  store_address_area: string, 
  store_address_postcode: string, 
  store_address_city: string,
  store_address_store: string } = {
	  
	//initialize these value  
    store_address_id: 0,
	store_address_number: '',
	store_address_street: '',
    store_address_area: '',
    store_address_postcode: '',
	store_address_city: '',
	store_address_store: ''
	
  };

  // Our translated text strings
  private addressErrorString: string;
  private addressMsgString: string;
  //private logoutMsgString: string;
  //array for user details
  public userDet: any = [];

  constructor(public navCtrl: NavController,
    public user: User,
    public toastCtrl: ToastController,
	public translate: TranslateService,
    public translateService: TranslateService,
	private storage: Storage) {

    this.translateService.get('ADDRESS_ERROR').subscribe((value) => {
      this.addressErrorString = value;
    });

    this.translateService.get('ADDRESS_MSG').subscribe((value) => {
      this.addressMsgString = value;
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
		 this.user.get_address(val).subscribe((resp) => {
       console.log('My Store', resp);
       resp = resp[0];
		   //this.userDet = resp;
		   this.account.store_address_id        = resp['store_address_id'];
		   this.account.store_address_number    = resp['store_address_number'];
		   this.account.store_address_street    = resp['store_address_street'];
		   this.account.store_address_area      = resp['store_address_area'];
		   this.account.store_address_postcode  = resp['store_address_postcode'];
		   this.account.store_address_city      = resp['store_address_city'];
		   this.account.store_address_store     = resp['store_address_store'];
		   //console.log('My Pushed Details', this.userDet);
		 });
	   });
    });

    
  }
  

  doUpdateAddress() {
	  console.log('ADDRESS UPDATE Start', this.account);
    // Attempt to update account through User service
    this.user.address_update(this.account).subscribe((resp) => {
      //this.navCtrl.push(MainPage);
      console.log('ADDRESS UPDATE OK', resp);
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
          message: this.addressMsgString,
          duration: 3000,
          position: 'top'
        });
        toast.present();
      }
    }, (err) => {

      //this.navCtrl.push(MainPage);

      // Unable to sign up
      let toast = this.toastCtrl.create({
        message: this.addressErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
  

}
