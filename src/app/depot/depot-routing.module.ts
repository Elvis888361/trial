import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DepotMasterComponent } from './depot-master/depot-master.component';
import { LoadingInstructionsComponent } from './loading-instructions/loading-instructions.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'depot' },
  {
    path: 'depot',
    component: DepotMasterComponent,
    children: [
      { path: 'instructions', component: LoadingInstructionsComponent },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class DepotRoutingModule {}
