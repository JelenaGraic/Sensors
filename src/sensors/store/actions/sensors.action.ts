import { createAction, props } from '@ngrx/store';
import { Sensor } from '../../models/sensor';

//load sensors

export const loadSensors = createAction(
    'Load Sensors'
  );
    
export const loadSensorsSuccess = createAction(
  'Load Sensors Success', 
  props<{ sensors: Sensor[] }>()
);

export const loadSensorsFailure = createAction(
  'Load Sensors Failure', 
  props<{ error: any }>()
);