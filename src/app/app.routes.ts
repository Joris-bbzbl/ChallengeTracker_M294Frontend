import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { NoAccessPage } from './pages/no-access-page/no-access-page';
import { ChallengeListPage } from './pages/challenge-list-page/challenge-list-page';
import { ChallengeFormPage } from './pages/challenge-form-page/challenge-form-page';
import { CategoryListPage } from './pages/category-list-page/category-list-page';
import { CategoryFormPage } from './pages/category-form-page/category-form-page';
import { authGuard } from './guards/auth.guard';
import { roleGuard } from './guards/role.guard';
import { Role } from './app.roles';

export const routes: Routes = [
  { path: '', redirectTo: 'challenges', pathMatch: 'full' },
  { path: 'login', component: LoginPage },
  { path: 'no-access', component: NoAccessPage },

  {
    path: 'challenges',
    component: ChallengeListPage,
    canActivate: [authGuard, roleGuard],
    data: { role: Role.READ },
  },
  {
    path: 'challenges/new',
    component: ChallengeFormPage,
    canActivate: [authGuard, roleGuard],
    data: { role: Role.UPDATE },
  },
  {
    path: 'challenges/:id',
    loadComponent: () =>
      import('./pages/challenge-detail-page/challenge-detail-page').then(
        (m) => m.ChallengeDetailPage,
      ),
    canActivate: [authGuard, roleGuard],
    data: { role: Role.READ },
  },
  {
    path: 'challenges/:id/edit',
    component: ChallengeFormPage,
    canActivate: [authGuard, roleGuard],
    data: { role: Role.UPDATE },
  },

  {
    path: 'categories',
    component: CategoryListPage,
    canActivate: [authGuard, roleGuard],
    data: { role: Role.ADMIN },
  },
  {
    path: 'categories/new',
    component: CategoryFormPage,
    canActivate: [authGuard, roleGuard],
    data: { role: Role.ADMIN },
  },
  {
    path: 'categories/:id/edit',
    component: CategoryFormPage,
    canActivate: [authGuard, roleGuard],
    data: { role: Role.ADMIN },
  },

  { path: '**', redirectTo: 'challenges' },
];
