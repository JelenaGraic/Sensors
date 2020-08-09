import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SensorListComponent } from '../sensors/components/sensor-list/sensor-list.component';


const appRoutes: Routes = [
  { path: '', 
  component: SensorListComponent},
  { path: 'sensor', 
  loadChildren: () => import('../sensors/sensor.module').then(s => s.SensorModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: []
})
export class AppRoutingModule { }

