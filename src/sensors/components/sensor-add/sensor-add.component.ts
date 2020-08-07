import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { MainState } from 'src/sensors/store/reducers';
import { Store } from '@ngrx/store';
import * as fromActions from '../../store/actions/sensors.action';

@Component({
  selector: 'ss-sensor-add',
  templateUrl: './sensor-add.component.html',
  styleUrls: ['./sensor-add.component.scss']
})
export class SensorAddComponent implements OnInit {

  sensorForm: FormGroup;

  constructor(private fb: FormBuilder, private store: Store<MainState>) { }

  ngOnInit(): void {
    this.sensorForm = this.fb.group ({
      'name': ["", [Validators.required, Validators.minLength(4)]],
      'image': [""],
      'path': ["", Validators.required],
      'unit_symbol': ["", Validators.required],
      'value': ["", Validators.required],
      'last_update': ["", Validators.required],
      'type': ["", Validators.required]
    })
  }

  onSubmit() {
    this.store.dispatch(fromActions.addSensor({sensor: this.sensorForm.value}))
  }

  enableSubmitBtn () {
    return this.sensorForm.valid;
  }

}
