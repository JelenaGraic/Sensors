import * as fromSensors from './sensors.reducer';
import { ActionReducerMap, createFeatureSelector } from '@ngrx/store';

export interface MainState {
    sensors: fromSensors.SensorState
}

export const reducers: ActionReducerMap <MainState> = {
    sensors: fromSensors.sensorReducer                  //if we had more reducers besides sensor in this area, we could add it here, but
                                                        // in this case we had only one reducer = sensorReducer
}

export const getMainState = createFeatureSelector <MainState>(
    'main'                                          //selector for geting main state and initializing it in sensor module
                                                    //wich will be lazy loaded with this main state
)