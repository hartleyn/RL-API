import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ItemDetailsComponent } from './items/src/app/items/item-details/item-details.component';
import { ItemListComponent } from './items/src/app/items/item-list/item-list.component';

@NgModule({
  declarations: [
    AppComponent,
    ItemDetailsComponent,
    ItemListComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
