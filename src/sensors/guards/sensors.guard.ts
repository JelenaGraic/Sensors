import { tap, filter, take, switchMap, catchError } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { Observable, of } from 'rxjs';
import { MainState } from '../store/reducers/index';
import * as fromSelectors from '../store/selectors/sensors.selectors';
import { loadSensors } from '../store/actions/sensors.action';

import { Store } from '@ngrx/store';

@Injectable()

export class SensorsGuard implements CanActivate {
    constructor (private store: Store<MainState>) {}

    canActivate(): Observable<boolean>{
        return this.checkStore().pipe(
            switchMap(() => of(true)),
            catchError(() => of(false))
        );
    }

    checkStore(): Observable<boolean>{
        return this.store.select(fromSelectors.getLoaded).pipe(
            tap (loaded => {
                if (!loaded) {
                    this.store.dispatch(loadSensors())
                }
            }),
            filter (loaded => loaded),
            take(1)
        )
    }
}

