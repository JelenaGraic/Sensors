import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SensorListComponent } from '../sensors/components/sensor-list/sensor-list.component';
import { HomeComponent } from 'src/sensors/components/home/home.component';

//guards
import * as fromGuards from '../sensors/guards/index';


const appRoutes: Routes = [
  { path: '',
  component: HomeComponent,
  canActivate: [fromGuards.SensorsGuard],
  children:[
    {path: '', component: SensorListComponent},
    {path: 'table',
    loadChildren: () => import('../sensors/components/table/table/table.module').then(t => t.TableModule)
  }
  ]},
  { path: 'sensor', 
  loadChildren: () => import('../sensors/sensor.module').then(s => s.SensorModule) },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [fromGuards.guards]
})
export class AppRoutingModule { }

