import { createSelector } from '@ngrx/store';
import * as fromMain from '../reducers/index';
import * as fromSensors from '../reducers/sensors.reducer';

export const getSensorState = createSelector (
    fromMain.getMainState,
    (state: fromMain.MainState) => state.sensors
)

// export const getSensorsEntities = createSelector (
//     getSensorState,
//     fromSensors.getSensors
// )

export const getSensors = createSelector (
    getSensorState,
    fromSensors.selectAll
    // getSensorsEntities,
    // getSensorsEntities,
    // (entities) => {
    //     return Object.keys(entities).map(
    //         id => entities[parseInt(id,10)]
    //     )
    // }
)

export const getLoading = createSelector (
    getSensorState,
    fromSensors.getSensorsLoading
)