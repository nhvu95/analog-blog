import 'zone.js';
import 'reflect-metadata';
import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import 'prismjs';
import 'prismjs/components/prism-yaml.js';
import 'prismjs/components/prism-typescript.js';
import 'prismjs/components/prism-java.js';
import 'prismjs/themes/prism-okaidia.css';
import { appConfig } from './app/app.config';

bootstrapApplication(AppComponent, appConfig).catch((err) =>
  console.error(err)
);
