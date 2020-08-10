import { Sensor } from "../../models/sensor";
import { createReducer, on, Action } from "@ngrx/store";
import * as fromSensorsActions from '../actions/sensors.action';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';



export interface SensorState extends EntityState<Sensor> {
    loading: boolean,
    loaded: boolean,
    error: any,
    filterBy: string
}

export const adapter: EntityAdapter<Sensor> = createEntityAdapter<Sensor>();

export const initialState: SensorState = adapter.getInitialState ({
    loading: false,
    loaded: false,
    error: undefined,
    filterBy: 'all'
})

export const sensorReducer = createReducer (
    initialState,
    on(fromSensorsActions.loadSensors,
      (state, action) => {
        return {
          ...state,
          loading: true,
          loaded: false
        }
      }
    ),
    on(fromSensorsActions.loadSensorsSuccess,
      (state, action) => {
        state = {...state, loading: false, loaded: true}
        return adapter.setAll(action.sensors, state)
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
    on(fromSensorsActions.deleteSensorSuccess,
      (state, action) => adapter.removeOne(action.id, state)
    ),
    on(fromSensorsActions.deleteSensorFailure,
      (state, action) => {
        return {
          ...state,
          error: action.error
        }
      }
    ),
    on(fromSensorsActions.addSensorSuccess,
      (state, action) => adapter.addOne(action.sensor, state)
    ),
    on(fromSensorsActions.addSensorFailure,
      (state, action) => {
        return {
          ...state,
          error: action.error
        }
      }
    ),
    on(fromSensorsActions.updateSensor,
      (state, action) => adapter.updateOne(action.sensor, state)
    ),
    on(fromSensorsActions.filterBy,
      (state, action) =>{
        return {...state, filterBy: action.payload}
      })
)

export function reducer (state: SensorState | undefined, action: Action) {
    return sensorReducer(state, action);
  }


export const getSensorsLoading = (state: SensorState) => state.loading;
export const getSensorsLoaded = (state: SensorState) => state.loaded;
export const getFilteredSensors = (state: SensorState) => state.filterBy;


export const {
    selectAll,
    selectEntities
  } = adapter.getSelectors();
