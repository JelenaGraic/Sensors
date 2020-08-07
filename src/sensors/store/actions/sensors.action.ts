import { createAction, props } from '@ngrx/store';
import { Sensor } from '../../models/sensor';



//load sensors

export const loadSensors = createAction(
    '[Sensor-list Component] Load Sensors'
  );
    
export const loadSensorsSuccess = createAction(
  '[Effects: Load Sensors] Load Sensors Success', 
  props<{ sensors: Sensor[] }>()
);

export const loadSensorsFailure = createAction(
  '[Effects: Load Sensors] Load Sensors Failure', 
  props<{ error: any }>()
);



//delete sensor

export const deleteSensor = createAction(
  '[Sensor-list Component and Delete Alert Component] Delete Sensor',
  props<{ id: number }>()
);

export const deleteSensorSuccess = createAction(
  '[Effects: Delete Sensors] Delete Sensor Success',
  props<{ id: number }>()
);

export const deleteSensorFailure = createAction(
  '[Effects: Delete Sensors] Delete Sensor Failure',
  props<{ error: any }>()
);