import {
  ApplicationConfig,
  importProvidersFrom,
  inject,
  provideEnvironmentInitializer,
} from '@angular/core';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { OAuthModule, OAuthStorage, provideOAuthClient } from 'angular-oauth2-oidc';

import { routes } from './app.routes';
import { AppAuthService } from './services/app-auth.service';
import { environment } from '../environments/environment';

export function storageFactory(): OAuthStorage {
  return sessionStorage;
}

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),

    provideHttpClient(withInterceptorsFromDi()),

    importProvidersFrom(BrowserAnimationsModule, OAuthModule.forRoot()),

    {
      provide: OAuthStorage,
      useFactory: storageFactory,
    },

    provideOAuthClient({
      resourceServer: {
        allowedUrls: [environment.backendBaseUrl],
        sendAccessToken: true,
      },
    }),

    provideEnvironmentInitializer(() => {
      inject(AppAuthService).initAuth();
    }),
  ],
};
