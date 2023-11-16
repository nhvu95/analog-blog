import { ApplicationConfig, mergeApplicationConfig } from '@angular/core';
import { ɵSERVER_CONTEXT as SERVER_CONTEXT } from '@angular/platform-server';
import { appConfig } from './app.config';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { provideFileRouter } from '@analogjs/router';
import { withEnabledBlockingInitialNavigation } from '@angular/router';

const serverConfig: ApplicationConfig = {
  providers: [
    NoopAnimationsModule,
    provideFileRouter(withEnabledBlockingInitialNavigation()),
    { provide: SERVER_CONTEXT, useValue: 'ssr-analog' },
  ],
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
