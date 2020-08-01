import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SensorAddComponent } from '../components/sensor-add/sensor-add.component';
import { SensorEditComponent } from '../components/sensor-edit/sensor-edit.component';
import { MaterialsModule } from '../../materials/materials.module';
import { CommonModule } from '@angular/common';
import { SensorService } from '../services/sensor.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

const routes: Routes = [
  { path: 'add', component: SensorAddComponent },
  { path: 'edit/:id', component: SensorEditComponent }
]

@NgModule({
  declarations:[
    SensorAddComponent,
    SensorEditComponent
  ],
  imports: [
    MaterialsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    SensorAddComponent,
    SensorEditComponent
  ],
  providers: [SensorService]
})
export class SensorModule { }

