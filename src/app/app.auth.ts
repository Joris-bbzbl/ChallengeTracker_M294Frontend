import { AuthConfig } from 'angular-oauth2-oidc';
import { environment } from '../environments/environment';

export const authConfig: AuthConfig = {
  issuer: 'http://localhost:8080/realms/challengetracker',
  clientId: 'challengetracker',
  responseType: 'code',
  redirectUri: window.location.origin,
  scope: 'openid profile email',
  showDebugInformation: !environment.production,
  requestAccessToken: true,
};
