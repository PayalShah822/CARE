import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { InputComponent } from './input/input.component';
import { AboutComponent } from './about/about.component';
import { RecordsComponent } from './records/records.component';
import { AppRouting } from './app.routing';


@NgModule({
  declarations: [
    AppComponent,
    InputComponent,
    AboutComponent,
    RecordsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouting
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
