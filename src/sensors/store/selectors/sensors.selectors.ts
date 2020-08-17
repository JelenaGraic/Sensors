import { createSelector } from '@ngrx/store';
import * as fromMain from '../reducers/index';
import * as fromSensors from '../reducers/sensors.reducer';
import * as fromRoot from '../../../app/router store/reducers/index';
import { Sensor } from 'src/sensors/models/sensor';
import { arraysAreNotAllowedMsg } from '@ngrx/store/src/models';

export const getSensorState = createSelector (
    fromMain.getMainState,
    (state: fromMain.MainState) => state.sensors
)

export const getSensors = createSelector (
    getSensorState,
    fromSensors.selectAll
)

export const getLoading = createSelector (
    getSensorState,
    fromSensors.getSensorsLoading
)

export const getLoaded = createSelector (
    getSensorState,
    fromSensors.getSensorsLoaded
)

export const getSensorsEntities = createSelector (
    getSensorState, fromSensors.selectEntities
)

export const getSelectedSensor = createSelector (
    getSensorsEntities,
    fromRoot.getRouterState,
    (entities, router): Sensor => {
        return router.state && entities [router.state.params.id]
    }
)



export const getFilteredSensors = createSelector(
    getSensors,
    fromRoot.getRouterState,
    (sensors, router): Sensor[] => {
        return router.state && sensors.filter( el =>
             el.name.toLowerCase().includes(router.state.queryParams.q)
        )
    }
)