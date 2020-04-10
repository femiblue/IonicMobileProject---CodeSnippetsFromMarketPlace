import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';

import { Item } from '../../models/item';
import { Items } from '../../providers';

import { User } from '../../providers';
//import { MainPage } from '../';
import { Storage } from '@ionic/storage';

@IonicPage()
@Component({
  selector: 'page-search',
  templateUrl: 'search.html'
})
export class SearchPage {

  currentItems: any = [];
  resp: any =[];
  counter = 0;
  all_services:  any =[];
  constructor(public navCtrl: NavController, public navParams: NavParams, public items: Items, 
    public user: User,
    private storage: Storage
    ) { 


        //pick services
    this.user.get_all_services().subscribe((resp) => {
      this.all_services = [resp];
      this.all_services = this.all_services[0];      

      for(let i=0; i < this.all_services.length; i++){ // n is array.length
        this.all_services[i]['service_color'] = this.user.getRandomColor();
      }
        
      console.log('All Services forsearch', this.all_services);
    });


    }

  /**
   * Perform a service for the proper items.
   */
  getItems(ev) {
    let val = ev.target.value;
    console.log("Search me",val);
    if (!val || !val.trim()) {
      this.currentItems = [];
      return;
    }
    this.currentItems = this.query({
      service_name: val
    });
  }

  
  query(params?: any) {
    if (!params) {
      return this.all_services;
    }
    console.log("params",params);
    console.log("query services",this.all_services);
    return this.all_services.filter((item: any) => {
      console.log("Item to search",item);
      for (let key in params) {
        let field = item[key];
        if (typeof field == 'string' && field.toLowerCase().indexOf(params[key].toLowerCase()) >= 0) {
          return item;
        } else if (field == params[key]) {
          return item;
        }
      }
      return null;
    });

  }
  
  /**
   * Navigate to the detail page for this item.
   */
  /*
  openItem(item: Item) {
    this.navCtrl.push('ItemDetailPage', {
      item: item
    });
  }
  */
  openItem(service_id: any) {
    this.storage.set('service_id', service_id);
    this.navCtrl.push('ItemDetailPage', {
      //item: item
    });
  }

}
