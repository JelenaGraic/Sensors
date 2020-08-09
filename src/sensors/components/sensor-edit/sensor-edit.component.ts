import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Sensor } from '../../models/sensor';
import { Update } from '@ngrx/entity';
import { MainState } from 'src/sensors/store/reducers';
import { Store } from '@ngrx/store';
import * as fromActions from '../../store/actions/sensors.action';
import { Observable, Subscription } from 'rxjs';
import * as fromSelectors from '../../store/selectors/sensors.selectors';

@Component({
  selector: 'ss-sensor-edit',
  templateUrl: './sensor-edit.component.html',
  styleUrls: ['./sensor-edit.component.scss']
})
export class SensorEditComponent implements OnInit {

  sensorForm: FormGroup;
  updateSensor$: Observable<Sensor>;
  updateSensor: Sensor;

  constructor(private fb: FormBuilder, private store: Store<MainState>) {

    this.createForm();
   }

  ngOnInit(): void {

    this.updateSensor$ = this.store.select(fromSelectors.getSelectedSensor);
    this.updateSensor$.subscribe(res =>{
      this.updateSensor = res;
      this.sensorForm.patchValue(res);     
    })
  }


  createForm() {
    this.sensorForm = this.fb.group ({
      'name': ["", [Validators.required, Validators.minLength(4)]],
      'image': [""],
      'path': ["", Validators.required],
      'unitSymbol': ["", Validators.required],
      'value': ["", Validators.required],
      'lastUpdate': ["", Validators.required],
      'type': ["", Validators.required]
    })
  }

  onSubmit() {
    let update: Update<Sensor> = {
      id: this.updateSensor.id,
      changes: this.sensorForm.value
    }
    this.store.dispatch(fromActions.updateSensor({sensor: update}));

  }

  enableSubmitBtn () {
    return this.sensorForm.valid;
  }

}

