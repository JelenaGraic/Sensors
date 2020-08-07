import { Component, OnInit } from '@angular/core';
import { Sensor } from '../../models/sensor';
import { SensorService } from '../../services/sensor.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteAlertComponent } from '../delete-alert/delete-alert.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MainState } from 'src/sensors/store/reducers';
import { Store } from '@ngrx/store';
import * as fromSensorsSelectors from '../../store/selectors/sensors.selectors';
import { Observable } from 'rxjs';
import * as fromActions from '../../store/actions/sensors.action';

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

  params = {
    all: ''
  }

  constructor(private service: SensorService, private dialog: MatDialog, private snackBar: MatSnackBar,
              private store: Store<MainState>) { }

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
        this.service.deleteSensor(id).subscribe(
          data => {
            this.snackBar.open("Data succesuccessfully deleted!", "", {duration: 2000});
            this.refresh();
          }
        );
      } else {
        this.snackBar.open("Data is not deleted!", "", {duration: 2000});      
      }
    }),
    error => {
      console.error(error);
    }
  }



}
