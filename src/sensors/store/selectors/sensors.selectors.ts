import { createSelector } from '@ngrx/store';
import * as fromMain from '../reducers/index';
import * as fromSensors from '../reducers/sensors.reducer';

export const getSensorState = createSelector (
    fromMain.getMainState,
    (state: fromMain.MainState) => state.sensors
)

export const getSensors = createSelector (
    getSensorState,
    fromSensors.getSensors
)