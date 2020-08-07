import { Sensor } from "../../models/sensor";
import { createReducer, on, Action } from "@ngrx/store";
import * as fromSensorsActions from '../actions/sensors.action';



export interface SensorState {
    sensors: Sensor[],
    loading: boolean
    loaded: boolean
}

export const initialState: SensorState = {
    sensors: [],
    loading: false,
    loaded: false
}

export const sensorReducer = createReducer (
    initialState,
    on(fromSensorsActions.loadSensors,
        (state, action) => {
          return {
            ...state,
            loading: true,
            loaded: false
          }
        }),
      on(fromSensorsActions.loadSensorsSuccess,
          (state, action) => {
            return {
                ...state,
                sensors: action.sensors,
                loading: false,
                loaded: true
            }
          }
        ),
        on(fromSensorsActions.loadSensorsFailure,
          (state, action) => {
            return {
              ...state,
              error: action.error
            }
          }
        ),
)

export function reducer (state: SensorState | undefined, action: Action) {
    return sensorReducer(state, action);
  }


export const getSensors = (state: SensorState) => state.sensors;
export const getSensorsLoading = (state: SensorState) => state.loading;
export const getSensorsLoaded = (state: SensorState) => state.loaded;
