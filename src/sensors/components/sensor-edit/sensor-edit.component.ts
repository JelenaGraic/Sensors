import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Sensor } from '../../models/sensor';
import { ActivatedRoute } from '@angular/router';
import { SensorService } from '../../services/sensor.service';
import { Update } from '@ngrx/entity';
import { MainState } from 'src/sensors/store/reducers';
import { Store } from '@ngrx/store';
import * as fromActions from '../../store/actions/sensors.action';

@Component({
  selector: 'app-sensor-edit',
  templateUrl: './sensor-edit.component.html',
  styleUrls: ['./sensor-edit.component.scss']
})
export class SensorEditComponent implements OnInit {

  sensorForm: FormGroup;
  updateSensor: Sensor;

  constructor(private fb: FormBuilder, private service: SensorService,
              private route: ActivatedRoute, private store: Store<MainState>) {

    this.createForm();
   }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    this.service.getOneSensor(id).subscribe(
      data => {
        this.updateSensor = data;
        this.sensorForm.patchValue(this.updateSensor);
      }),
    error => {
      console.error(error);
    }
    
  }

  createForm() {
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
