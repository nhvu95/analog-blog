import 'zone.js';
import { bootstrapApplication } from '@angular/platform-browser';
import { provideFileRouter } from '@analogjs/router';

import { AppComponent } from './app/app.component';

import { NzIconModule } from 'ng-zorro-antd/icon';
import { importProvidersFrom } from '@angular/core';
import { icons } from './app/shared/shared-ui/icon';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { provideHttpClient } from '@angular/common/http';
import 'prismjs';
import 'prismjs/components/prism-yaml.js';
import 'prismjs/components/prism-typescript.js';
import 'prismjs/components/prism-java.js';
import 'prismjs/themes/prism-okaidia.css';

console.log('Here you can start to work 1');
bootstrapApplication(AppComponent, {
  providers: [
    provideFileRouter(),
    provideHttpClient(),
    provideNoopAnimations(),
    importProvidersFrom(NzIconModule.forRoot(icons)),
  ],
}).catch((err) => console.error(err));
