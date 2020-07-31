import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SensorAddComponent } from '../components/sensor-add/sensor-add.component';

const routes: Routes = [
  { path: 'add', component: SensorAddComponent}
]

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [ RouterModule ]
})
export class SensorModule { }

