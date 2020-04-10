import { Injectable } from '@angular/core';

import { Item } from '../../models/item';
import { Api } from '../api/api';

import { Storage } from '@ionic/storage';

@Injectable()
export class Items {

  constructor(public api: Api, private storage: Storage) { }
  
  query(params?: any) {
    return this.api.get('/items', params);
  }

  add(item: Item) {
  }

  delete(item: Item) {
  }

}
