import { createAction, props } from '@ngrx/store';
import { Sensor } from '../../models/sensor';
import { Update } from '@ngrx/entity';


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
  '[Effects: Delete Sensor] Delete Sensor Success',
  props<{ id: number }>()
);

export const deleteSensorFailure = createAction(
  '[Effects: Delete Sensor] Delete Sensor Failure',
  props<{ error: any }>()
);


//add sensor

export const addSensor = createAction(
  '[Sensor Add Component] Add Sensor',
  props<{ sensor: Sensor }>()
);

export const addSensorSuccess = createAction(
  '[Effects: Add Sensor] Add Sensor Success',
  props<{ sensor: Sensor }>()
);

export const addSensorFailure = createAction(
  '[Effects: Add Sensor] Add Sensor Failure',
  props<{ error: any }>()
);



//update (edit) sensor

export const updateSensor = createAction(
  '[Sesor Edit Component] Edit Sensor',
  props<{ sensor: Update<Sensor> }>()
);

