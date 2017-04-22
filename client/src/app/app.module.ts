import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app-shell/app.component';
import { AboutComponent } from './about/about.component';
import { RecordsComponent } from './records/records.component';
import { InputComponent } from './input/input.component';
import { ManageRecordsService, EllipsisPipe } from './services/manage-records.service';
import { ManagerComponent } from './manager/manager.component';
import { AppRouting } from './app.routing';

@NgModule({
  declarations: [
    AppComponent,
    AboutComponent,
    RecordsComponent,
    InputComponent,
    ManagerComponent,
    EllipsisPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    AppRouting,
    ReactiveFormsModule
  ],
  providers: [ ManageRecordsService ],
  bootstrap: [AppComponent]
})
export class AppModule { }
