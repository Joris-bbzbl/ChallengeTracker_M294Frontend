import { Routes } from '@angular/router';
import { LoginPage } from './pages/login-page/login-page';
import { NoAccessPage } from './pages/no-access-page/no-access-page';
import { ChallengeListPage } from './pages/challenge-list-page/challenge-list-page';
import { ChallengeFormPage } from './pages/challenge-form-page/challenge-form-page';
import { CategoryListPage } from './pages/category-list-page/category-list-page';
import { CategoryFormPage } from './pages/category-form-page/category-form-page';

export const routes: Routes = [
	{ path: '', redirectTo: 'challenges', pathMatch: 'full' },
	{ path: 'login', component: LoginPage },
	{ path: 'no-access', component: NoAccessPage },

	{ path: 'challenges', component: ChallengeListPage },
	{ path: 'challenges/new', component: ChallengeFormPage },
	{
		path: 'challenges/:id',
		loadComponent: () => import('./pages/challenge-detail-page/challenge-detail-page').then(m => m.ChallengeDetailPage)
	},
	{ path: 'challenges/:id/edit', component: ChallengeFormPage },

	{ path: 'categories', component: CategoryListPage },
	{ path: 'categories/new', component: CategoryFormPage },
	{ path: 'categories/:id/edit', component: CategoryFormPage },

	{ path: '**', redirectTo: 'challenges' }
];
