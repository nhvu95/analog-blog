import 'zone.js/node';
import {enableProdMode, importProvidersFrom} from '@angular/core';
import { renderApplication } from '@angular/platform-server';
import { provideFileRouter } from '@analogjs/router';
import { withEnabledBlockingInitialNavigation } from '@angular/router';

import { AppComponent } from './app/app.component';
import {NoopAnimationsModule} from "@angular/platform-browser/animations";
import {NzIconModule} from "ng-zorro-antd/icon";
import {IconDefinition} from "@ant-design/icons-angular";
import {
  CommentOutline,
  EyeOutline,
  GithubOutline, GlobalOutline,
  HeartOutline,
  LinkedinOutline, ReconciliationOutline, ToolOutline
} from "@ant-design/icons-angular/icons";
import {NzLayoutModule} from "ng-zorro-antd/layout";

const icons: IconDefinition[] = [
  GithubOutline,
  LinkedinOutline,
  HeartOutline,
  EyeOutline,
  CommentOutline,
  GlobalOutline,
  ToolOutline,
  ReconciliationOutline,
];

if (import.meta.env.PROD) {
  enableProdMode();
}

export default async function render(url: string, document: string) {
  const html = await renderApplication(AppComponent, {
    appId: 'analog-app',
    document,
    url,
    providers: [provideFileRouter(withEnabledBlockingInitialNavigation()), NoopAnimationsModule, importProvidersFrom(NzIconModule.forRoot(icons))],
  });

  return html;
}
