import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import {NgModule} from '@angular/core';



platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
