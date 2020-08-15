import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TableComponent } from '../table.component';
import { Routes, RouterModule } from '@angular/router';
import { MaterialsModule } from '../../../../materials/materials.module'


const routes: Routes = [
  { path: '', 
    component: TableComponent }
]


@NgModule({
  declarations: [TableComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MaterialsModule
  ],
  exports: [
    RouterModule,
    TableComponent
  ],
})
export class TableModule { }
