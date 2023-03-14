import 'zone.js/node';
// import 'zone.js/dist/zone-node';
import {renderApplication, ɵSERVER_CONTEXT as SERVER_CONTEXT} from '@angular/platform-server';
import {enableProdMode, importProvidersFrom} from '@angular/core';
import {provideFileRouter} from '@analogjs/router';
import {withEnabledBlockingInitialNavigation,} from '@angular/router';
import {AppComponent} from './app/app.component';
import {provideHttpClient} from "@angular/common/http";
import {provideContent, withMarkdownRenderer} from "@analogjs/content";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

if (import.meta.env.PROD) {
  enableProdMode();
}

export default async function render(url: string, document: string) {
  const html = await renderApplication(AppComponent, {
    appId: 'analog-app',
    document,
    url,
    providers: [
      provideHttpClient(),
      NoopAnimationsModule,
      provideContent(withMarkdownRenderer()),
      provideFileRouter(withEnabledBlockingInitialNavigation()),
      {provide: SERVER_CONTEXT, useValue: 'ssr-analog'},
    ],
  });

  return html;
}
