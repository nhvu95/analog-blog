import 'zone.js/node';
import {enableProdMode, importProvidersFrom} from '@angular/core';
import {renderApplication, ɵSERVER_CONTEXT as SERVER_CONTEXT} from '@angular/platform-server';
import {provideFileRouter} from '@analogjs/router';
import {withEnabledBlockingInitialNavigation,} from '@angular/router';
import {AppComponent} from './app/app.component';
import {NzIconModule} from "ng-zorro-antd/icon";
import {HttpClientModule, provideHttpClient, withJsonpSupport} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import {icons} from "./app/shared/shared-ui/icon";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {provideContent, withMarkdownRenderer} from "@analogjs/content";


// import "prismjs/plugins/toolbar/prism-toolbar";
// import "prismjs/plugins/copy-to-clipboard/prism-copy-to-clipboard";
// import "prismjs/components/prism-yaml";
// import "prismjs/components/prism-css";
// import "prismjs/components/prism-bash";
// import "prismjs/components/prism-javascript";
// import "prismjs/components/prism-java";
// import "prismjs/components/prism-xml-doc";
// import "prismjs/components/prism-json";
// import "prismjs/components/prism-typescript";
import  'prismjs/components/prism-java';

if (import.meta.env.PROD) {
  enableProdMode();
}

export default async function render(url: string, document: string) {
  const html = await renderApplication(AppComponent, {
    appId: 'analog-app',
    document,
    url,
    providers: [
      {provide: SERVER_CONTEXT, useValue: 'ssr-analog'},
      CommonModule,
      NoopAnimationsModule,
      provideHttpClient(),
      importProvidersFrom(NzIconModule.forRoot(icons)),
      provideFileRouter(withEnabledBlockingInitialNavigation()),
      provideContent(withMarkdownRenderer())
    ],
  });

  return html;
}
