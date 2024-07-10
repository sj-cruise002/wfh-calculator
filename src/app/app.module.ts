import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatDatepickerModule, MatCalendar } from '@angular/material/datepicker';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon'
import { MatNativeDateModule, MatRippleModule } from '@angular/material/core';
import {MatToolbarModule} from '@angular/material/toolbar';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { WfhcalendarComponent } from './wfhcalendar/wfhcalendar.component';

@NgModule({
  declarations: [
    AppComponent, WfhcalendarComponent
  ],
  imports: [
    BrowserModule, AppRoutingModule, BrowserAnimationsModule,
    MatMenuModule,
    MatIconModule,
    MatNativeDateModule,
    MatRippleModule,
    MatDatepickerModule,
    MatToolbarModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  exports: []
})
export class AppModule { }
