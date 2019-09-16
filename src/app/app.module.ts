import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { ApisService } from './apis.service';
import { HttpClientModule } from '@angular/common/http';
import { MultiselectComponent } from './multiselect/multiselect.component';
import { FormsModule } from '@angular/forms';
import { NgxPaginationModule } from "ngx-pagination";
@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MultiselectComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    NgxPaginationModule
  ],
  providers: [
    ApisService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
