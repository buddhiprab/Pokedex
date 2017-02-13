import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {BrowserModule} from '@angular/platform-browser';
import {CommonModule} from '@angular/common';
import {HttpModule} from '@angular/http';

import {PaginationModule} from 'ng2-bootstrap';
import {TabsModule} from 'ng2-bootstrap';
import {Ng2TableModule} from 'ng2-table';
import {PopoverModule} from "ngx-popover";

import {InMemoryWebApiModule} from 'angular-in-memory-web-api';
import {InMemoryDataService} from './in-memory-data.service';

import './rxjs-extensions';
import {AppComponent} from './app.component';
import {AppRoutingModule, routedComponents} from './app-routing.module';
import {PokedexDataService} from './pokemon/pokedex-data.service';

@NgModule({
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    HttpModule,
    Ng2TableModule, PaginationModule, TabsModule, CommonModule, PopoverModule,
    InMemoryWebApiModule.forRoot(InMemoryDataService, {delay: 600})
  ],
  declarations: [
    AppComponent,
    routedComponents
  ],
  providers: [
    PokedexDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
