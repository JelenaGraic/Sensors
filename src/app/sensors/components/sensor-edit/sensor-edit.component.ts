import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Sensor } from '../../models/sensor';
import { Router, ActivatedRoute } from '@angular/router';
import { SensorService } from '../../services/sensor.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-sensor-edit',
  templateUrl: './sensor-edit.component.html',
  styleUrls: ['./sensor-edit.component.scss']
})
export class SensorEditComponent implements OnInit {

  sensorForm: FormGroup;
  updateSensor: Sensor;

  constructor(private fb: FormBuilder, private service: SensorService, private snackBar: MatSnackBar, private router: Router,
              private route: ActivatedRoute) {

    this.createForm();
   }

  ngOnInit(): void {
    let id = this.route.snapshot.params.id;
    this.service.getOneSensor(id).subscribe(
      data => {
        this.updateSensor = data;
        this.sensorForm.patchValue(this.updateSensor);
      }
    )
    
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

    let submitedSensor = new Sensor (this.sensorForm.value);
    submitedSensor.id = this.updateSensor.id;
    this.service.updateSensor(submitedSensor).subscribe(
      data => {
        this.sensorForm.reset();
        this.snackBar.open("Data succesuccessfully updated!", "", {duration: 2000});
        this.router.navigate(['']); 
      }
    )
  }

  enableSubmitBtn () {
    return this.sensorForm.valid;
  }

}
