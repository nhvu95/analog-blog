import 'zone.js';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideFileRouter} from '@analogjs/router';

import {AppComponent} from './app/app.component';

import {NzIconModule} from "ng-zorro-antd/icon";
import {importProvidersFrom} from "@angular/core";
import {icons} from "./app/shared/shared-ui/icon";
import {
  provideNoopAnimations
} from "@angular/platform-browser/animations";
import {provideContent, withMarkdownRenderer} from "@analogjs/content";
import {provideHttpClient} from "@angular/common/http";
import 'prismjs/components/prism-java';
import 'prismjs/themes/prism-okaidia.css';

bootstrapApplication(AppComponent, {
  providers: [
    provideFileRouter(),
    provideHttpClient(),
    provideNoopAnimations(),
    importProvidersFrom(NzIconModule.forRoot(icons)),
    provideContent(withMarkdownRenderer()),
    ],
}).catch((err) => console.error(err));
