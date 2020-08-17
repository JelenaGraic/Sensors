import { Component, OnInit } from '@angular/core';
import { Sensor } from '../../models/sensor';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAlertComponent } from '../delete-alert/delete-alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MainState } from 'src/sensors/store/reducers';
import { Store } from '@ngrx/store';
import * as fromSensorsSelectors from '../../store/selectors/sensors.selectors';
import { Observable } from 'rxjs';
import * as fromActions from '../../store/actions/sensors.action';
import { Router } from '@angular/router';

@Component({
  selector: 'ss-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.scss']
})
export class SensorListComponent implements OnInit {

  sensors$: Observable<Sensor[]>;
  date = new Date();
  hours = this.date.getHours() + ":" + this.date.getMinutes();
  showProgressBar$: Observable<boolean>;

 filterBy: string;

  constructor(private dialog: MatDialog, private snackBar: MatSnackBar,
              private store: Store<MainState>, private router: Router) { }

  ngOnInit(): void {
      this.store.dispatch(fromActions.loadSensors()); 
      this.refresh();
  }

  refresh () {
      this.sensors$ = this.store.select(fromSensorsSelectors.getSensors);
      this.showProgressBar$ = this.store.select(fromSensorsSelectors.getLoading);

  }

  onDelete( id: number ) {

      let dialogRef = this.dialog.open(DeleteAlertComponent);

      dialogRef.afterClosed().subscribe(
        data=> {
          if (data == "true") {
            this.store.dispatch(fromActions.deleteSensor({ id }));
          } else {
            this.snackBar.open("Data is not deleted!", "", {duration: 2000});      
          }
        })
  }

  filter() {
    this.router.navigate(['/'], { queryParams: {q: this.filterBy.toLowerCase()}})
    this.sensors$ = this.store.select(fromSensorsSelectors.getFilteredSensors);
  }

}
