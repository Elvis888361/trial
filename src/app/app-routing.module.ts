import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const routes: Routes = [
  { path: 'dashboard', component: HomeComponent },
  {
    path: 'sms',
    loadChildren: () => import('./sms/sms.module').then((x) => x.SmsModule),
  },
  {
    path: 'ots',
    loadChildren: () => import('./ots/ots.module').then((x) => x.OtsModule),
  },
  {
    path: '',
    loadChildren: () =>
      import('./depot/depot.module').then((x) => x.DepotModule),
  },
  {
    path: 'accounts',
    loadChildren: () =>
      import('./accounts/accounts.module').then((x) => x.AccountsModule),
  },
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.module').then((x) => x.SettingsModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
