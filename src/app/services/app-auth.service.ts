import { Injectable } from '@angular/core';
import { OAuthService, OAuthEvent } from 'angular-oauth2-oidc';
import { authConfig } from '../app.auth';
import { Role } from '../app.roles';
import { filter, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AppAuthService {
  private initPromise?: Promise<void>;

  private jwtHelper = new JwtHelperService();

  constructor(private oauthService: OAuthService) {}

  initAuth(): Promise<void> {
    if (!this.initPromise) {
      this.oauthService.configure(authConfig);

      this.initPromise = this.oauthService
        .loadDiscoveryDocumentAndTryLogin()
        .then(() => undefined)
        .catch((error) => {
          console.error('Auth initialization error', error);
        });
    }

    return this.initPromise;
  }

  ready(): Promise<void> {
    return this.initAuth();
  }

  login(): void {
    console.log('Initiating login process');
    this.oauthService.initCodeFlow();
  }

  logout(): void {
    this.oauthService.logOut();
  }

  isLoggedIn(): boolean {
    return this.oauthService.hasValidAccessToken();
  }

  getUsername(): string | null {
    const claims = this.oauthService.getIdentityClaims() as any;
    return claims?.preferred_username || claims?.name || null;
  }

  getRoles(): Role[] {
    const token = this.oauthService.getAccessToken();

    if (!token) {
      return [];
    }

    const decodedToken = this.jwtHelper.decodeToken(token);

    const roles: string[] = decodedToken?.resource_access?.challengetracker?.roles ?? [];

    return roles
      .map((role) => role.toLowerCase())
      .filter((role) => Object.values(Role).includes(role as Role)) as Role[];
  }

  hasRole(role: Role): boolean {
    console.log('roles', this.getRoles(), 'required', role);
    return this.getRoles().includes(role);
  }

  getAccessToken(): string {
    return this.oauthService.getAccessToken();
  }

  onLoginStatusChanged(): Observable<boolean> {
    return this.oauthService.events.pipe(
      filter(
        (e: OAuthEvent) =>
          e.type === 'token_received' || e.type === 'token_refreshed' || e.type === 'logout',
      ),
      map(() => this.isLoggedIn()),
    );
  }
}
