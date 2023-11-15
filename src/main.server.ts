import 'reflect-metadata';
import 'zone.js/node';
// import 'zone.js/dist/zone-node';
import { renderApplication } from '@angular/platform-server';
import { enableProdMode } from '@angular/core';
import { AppComponent } from './app/app.component';
import { bootstrapApplication } from '@angular/platform-browser';
import { config } from './app/app.config.server';

if (import.meta.env.PROD) {
  enableProdMode();
}
export default async function render(url: string, document: string) {
  const html = await renderApplication(bootstrap, {
    document,
    url,
  });
  return html;
}

export function bootstrap() {
  return bootstrapApplication(AppComponent, config);
}
