import { provideHttpClient, withFetch } from '@angular/common/http';
import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideFileRouter } from '@analogjs/router';
import { provideNoopAnimations } from '@angular/platform-browser/animations';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { icons } from './shared/shared-ui/icon';
import { provideClientHydration } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideFileRouter(),
    provideHttpClient(withFetch()),
    provideClientHydration(),
    provideNoopAnimations(),
    importProvidersFrom(NzIconModule.forRoot(icons)),
  ],
};
