import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//components and services
import { SensorAddComponent } from './components/sensor-add/sensor-add.component';
import { SensorEditComponent } from './components/sensor-edit/sensor-edit.component';
import { DeleteAlertComponent } from './components/delete-alert/delete-alert.component';
import { SensorService } from './services/sensor.service';

//materials module
import { MaterialsModule } from '../materials/materials.module';

const routes: Routes = [
  { path: 'add', component: SensorAddComponent },
  { path: 'edit/:id', component: SensorEditComponent }
]

@NgModule({
  declarations:[
    SensorAddComponent,
    SensorEditComponent,
    DeleteAlertComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    SensorAddComponent,
    SensorEditComponent,
    DeleteAlertComponent
  ],
  providers: [SensorService]
})
export class SensorModule { }

