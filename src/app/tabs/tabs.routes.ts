import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'duel',
        loadComponent: () => import('./duel/duel.page').then((m) => m.DuelPage),
      },
      {
        path: 'profiles',
        loadComponent: () =>
          import('./profiles/profiles.page').then((m) => m.ProfilesPage),
      },
      {
        path: '',
        redirectTo: '/tabs/duel',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/duel',
    pathMatch: 'full',
  },
];
