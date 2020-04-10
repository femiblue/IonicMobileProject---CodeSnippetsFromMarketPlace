import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { StorePage } from './store';

@NgModule({
  declarations: [
    StorePage,
  ],
  imports: [
    IonicPageModule.forChild(StorePage),
    TranslateModule.forChild()
  ],
  exports: [
    StorePage
  ]
})
export class StorePageModule { }
