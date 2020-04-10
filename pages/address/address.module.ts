import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { IonicPageModule } from 'ionic-angular';

import { AddressPage } from './address';

@NgModule({
  declarations: [
    AddressPage,
  ],
  imports: [
    IonicPageModule.forChild(AddressPage),
    TranslateModule.forChild()
  ],
  exports: [
    AddressPage
  ]
})
export class AddressPageModule { }
