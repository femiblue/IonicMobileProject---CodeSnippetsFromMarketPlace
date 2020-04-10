import 'rxjs/add/operator/toPromise';

import { Injectable } from '@angular/core';

import { Api } from '../api/api';

import { Storage } from '@ionic/storage';

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }Ø
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;

  constructor(public api: Api, private storage: Storage) { }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  login(accountInfo: any) {
    //console.log("Account Details..",accountInfo);
    let seq = this.api.post('user/login', accountInfo).share();

    seq.subscribe((res: any) => { //console.log('LOGIN SUCCESS', res);
      // If the API returned a successful response, mark the user as logged in
      if (!res.error) { 
        this._loggedIn(res);
      } else {
      }
    }, err => {
      console.error('ERROR', err);
    });
  
    return seq;
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signup(accountInfo: any) {
    let seq = this.api.post('user/create', accountInfo).share();

    seq.subscribe((res: any) => { //console.log('CREATE USER SUCCESS', res);
      // If the API returned a successful response, return a success msg to new user
      //if (res.status == 'success') {
        if (!res.error) { 
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  
    /**
   * Send a GET request to get user details
   */
  get_user(accountInfo: any) {
    let seq = this.api.get('user/edit/'+accountInfo, accountInfo).share();

    seq.subscribe((res: any) => { //console.log('GET USER SUCCESS', res);
      // If the API returned a successful response, return user details to user
      //if (res.status == 'success') {
      if (!res.error) { 
        //this._loggedIn(res); 
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  
     /**
   * Send a GET request to get address
   */
  get_address(accountInfo: any) {
    let seq = this.api.get('store/address/'+accountInfo, accountInfo).share();

    seq.subscribe((res: any) => { console.log('GET ADDRESS SUCCESS', res);
      // If the API returned a successful response, return address details to user
      //if (res.status == 'success') {
      if (!res.error) { 
        //this._loggedIn(res); 
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  
       /**
   * Send a GET request to get store
   */
  get_store(accountInfo: any) {
    let seq = this.api.get('store/show/'+accountInfo, accountInfo).share();

    seq.subscribe((res: any) => { //console.log('GET STORE SUCCESS', res);
      // If the API returned a successful response, return store details to user
      //if (res.status == 'success') {
      if (!res.error) { 
        //this._loggedIn(res); 
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  
        /**
   * Send a GET request to get store service
   */
  get_store_services(accountInfo: any) {
    let seq = this.api.get('store/services/'+accountInfo, accountInfo).share();

    seq.subscribe((res: any) => { //console.log('GET STORE SERVICES SUCCESS', res);
      // If the API returned a successful response, return details to user
      //if (res.status == 'success') {
      if (!res.error) { 
        //this._loggedIn(res); 
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

          /**
   * Send a GET request to get services requests
   */
  get_in_service_requests(accountInfo: any) {
    let seq = this.api.get('service/in/requests/'+accountInfo, accountInfo).share();

    seq.subscribe((res: any) => { //console.log('SERVICE REQUESTS', res[0]);
      // If the API returned a successful response, return details to user
      if (!res.error) { 
        //this._loggedIn(res); 
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  get_out_service_requests(accountInfo: any) {
    let seq = this.api.get('service/out/requests/'+accountInfo, accountInfo).share();

    seq.subscribe((res: any) => { //console.log('SERVICE REQUESTS', res[0]);
      // If the API returned a successful response, return details to user
      if (!res.error) { 
        //this._loggedIn(res); 
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  /**
   * Send a POST request to our account update endpoint with the data
   * the user entered on the form.
   */
  account_update(accountInfo: any) {
    let seq = this.api.post('user/update/'+accountInfo.user_id, accountInfo).share();

    seq.subscribe((res: any) => { //console.log('CREATE USER SUCCESS', res);
      // If the API returned a successful response, return a success msg to new user
      //if (res.status == 'success') {
        if (!res.error) { 
        this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
    /**
   * Send a POST request to our address update endpoint with the data
   * the user entered on the form.
   */
  address_update(accountInfo: any) {
    let seq = this.api.put('storeaddress/update/'+accountInfo.store_address_id, accountInfo).share();

    seq.subscribe((res: any) => { //console.log('UPDATE ADDRESS SUCCESS', res);
      // If the API returned a successful response, return a success msg to  user
      //if (res.status == 'success') {
        if (!res.error) { 
         //this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  
    /**
   * Send a POST request to our store update endpoint with the data
   * the user entered on the form.
   */
  store_update(accountInfo: any) {
    let seq = this.api.put('store/update/'+accountInfo.store_id, accountInfo).share();

    seq.subscribe((res: any) => { //console.log('UPDATE STORE SUCCESS', res);
      // If the API returned a successful response, return a success msg to  user
      //if (res.status == 'success') {
        if (!res.error) { 
         //this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;


  }
   /**
   * Send a PUT request to our address update endpoint with the data
   * the user entered on the form.
   */
  update_service_request_status(accountInfo: any) {
    let seq = this.api.put('service/request/update_status/'+accountInfo.irequest_id, accountInfo).share();

    seq.subscribe((res: any) => { 
      // If the API returned a successful response, return a success msg to  user
      //if (res.status == 'success') {
        if (!res.error) { 
         //this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  
  
   /**
   * Send a POST request to our create service request endpoint with the data
   * the user entered on the form.
   */
  create_srequest(accountInfo: any) {
    let seq = this.api.post('service/request/create', accountInfo).share();

    seq.subscribe((res: any) => { //console.log('CREATE SERVICE request', res);
      // If the API returned a successful response, return a success msg 
      //if (res.status == 'success') {
	  /*
        if (!res.error) { 
        this._loggedIn(res);
      }
	  */
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }


    /**
   * Send a POST request to our create service endpoint with the data
   * the user entered on the form.
   */
  create_service(accountInfo: any) {
    let seq = this.api.post('service/create', accountInfo).share();

    seq.subscribe((res: any) => { //console.log('CREATE SERVICE SUCCESS', res);
      // If the API returned a successful response, return a success msg 
      //if (res.status == 'success') {
	  /*
        if (!res.error) { 
        this._loggedIn(res);
      }
	  */
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  
   /**
   * Send a POST request to our address update endpoint with the data
   * the user entered on the form.
   */
  update_service(accountInfo: any, service_id:any) { 
    let seq = this.api.put('service/update/'+service_id, accountInfo).share();

    seq.subscribe((res: any) => { //console.log('UPDATE SERVICE SUCCESS', res);
      // If the API returned a successful response, return a success msg to  user
      //if (res.status == 'success') {
        if (!res.error) { 
         //this._loggedIn(res);
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  
    /**
   * Send a GET request to get service categories details
   */
  get_service_category() {
    let seq = this.api.get('services_cat/').share();

    seq.subscribe((res: any) => { //console.log('GET SERVICE CATEGORIES', res);
      // If the API returned a successful response, return user details to user
      //if (res.status == 'success') {
      if (!res.error) { 
        //this._loggedIn(res); 
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

  
      /**
   * Send a GET request to get services details
   */
  get_all_services() {
    let seq = this.api.get('services/').share();

    seq.subscribe((res: any) => { //console.log('GET SERVICES', res);
      // If the API returned a successful response, return user details to user
      //if (res.status == 'success') {
      if (!res.error) { 
        //this._loggedIn(res); 
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }

   /**
   * Send a GET request to get service
   */
  get_service(accountInfo: any) {
    let seq = this.api.get('service/show/'+accountInfo, accountInfo).share();

    seq.subscribe((res: any) => { //console.log('GET SERVICE', res);
      // If the API returned a successful response, return service
      //if (res.status == 'success') {
      if (!res.error) { 
        //this._loggedIn(res); 
      }
    }, err => {
      console.error('ERROR', err);
    });

    return seq;
  }
  

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
	
	  // Remove all saved data from storage
	  this.storage.clear();
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp:any) {
	  console.log("LOGGED IN USER DETAILS",resp);
    //this._user = resp.user;
    // set user key/values to storage
    this.storage.set('user_username', resp.user.user_username);
    this.storage.set('user_id', resp.user.user_id);
    this.storage.set('user_firstname', resp.user.user_firstname);
    this.storage.set('user_lastname', resp.user.user_lastname);
    this.storage.set('user_email', resp.user.user_email);
    this.storage.set('user_mobile', resp.user.user_mobile);
    this.storage.set('user_photo', resp.user.user_photo);
	
	//set store
	this.storage.set('store_id',resp.store.store_id);
	this.storage.set('address_id',resp.store.store_id);
    
  }

  getRandomColor() {
    var color = "#";
    for (var i = 0; i < 3; i++)
    {
        var part = Math.round(Math.random() * 255).toString(16);
        color += (part.length > 1) ? part : "0" + part;
    }
    return color;
  }

}
