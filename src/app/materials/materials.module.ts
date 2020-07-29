import { NgModule } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { from } from 'rxjs';

const MATERIALS = [
  MatCardModule,
  MatButtonModule
]


@NgModule({
  imports: [
    MATERIALS
  ],
  exports: [
    MATERIALS
  ]
})
export class MaterialsModule { }
