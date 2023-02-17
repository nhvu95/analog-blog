import 'zone.js';
import {bootstrapApplication} from '@angular/platform-browser';
import {provideFileRouter} from '@analogjs/router';

import {AppComponent} from './app/app.component';

import {
  GithubOutline,
  LinkedinOutline,
  HeartOutline,
  EyeOutline,
  CommentOutline,
  GlobalOutline,
  ToolOutline,
  ReconciliationOutline,
} from '@ant-design/icons-angular/icons';
import {IconDefinition} from '@ant-design/icons-angular';
import {NzIconModule} from "ng-zorro-antd/icon";
import {importProvidersFrom} from "@angular/core";
import {NoopAnimationsModule} from "@angular/platform-browser/animations";

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

bootstrapApplication(AppComponent, {
  providers: [provideFileRouter(), NoopAnimationsModule, importProvidersFrom(NzIconModule.forRoot(icons))],
});
