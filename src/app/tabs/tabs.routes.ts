import { Routes } from '@angular/router';
import { TabsPage } from './tabs.page';

export const routes: Routes = [
  {
    path: 'tabs',
    component: TabsPage,
    children: [
      {
        path: 'single',
        loadComponent: () =>
          import('./single-duel/single-duel.page').then(
            (m) => m.SingleDuelPage
          ),
      },
      {
        path: 'profiles',
        loadComponent: () =>
          import('./profiles/profiles.page').then((m) => m.ProfilesPage),
      },
      {
        path: '',
        redirectTo: '/tabs/single',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: '',
    redirectTo: '/tabs/single',
    pathMatch: 'full',
  },
];
