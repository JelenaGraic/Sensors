import { Injectable } from '@angular/core';
import { SensorService } from '../../services/sensor.service';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import * as fromActions from '../actions/sensors.action';


@Injectable()

export class SensorsEffects {

    constructor( private service: SensorService, private actions$: Actions) {}

    loadSensors$ = createEffect(() =>
    this.actions$.pipe(
      ofType(fromActions.loadSensors),
      switchMap(() =>
        this.service.getAll().pipe(
          map(sensors => fromActions.loadSensorsSuccess({sensors: sensors.sensors })),
          catchError(error =>
            of(fromActions.loadSensorsFailure(error))
          )
        )
      )
    )
  );
}