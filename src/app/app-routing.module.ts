import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SensorListComponent } from '../sensors/components/sensor-list/sensor-list.component';

import * as fromGards from '../sensors/guards/index';



const appRoutes: Routes = [
  { path: '', 
  canActivate: [fromGards.SensorsGuard],
  component: SensorListComponent},
  { path: 'sensor', 
  loadChildren: () => import('../sensors/sensor.module').then(s => s.SensorModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [fromGards.guards]
})
export class AppRoutingModule { }

