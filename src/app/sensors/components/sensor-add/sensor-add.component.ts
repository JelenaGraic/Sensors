import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Sensor } from '../../models/sensor';
import { SensorService } from '../../services/sensor.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'ss-sensor-add',
  templateUrl: './sensor-add.component.html',
  styleUrls: ['./sensor-add.component.scss']
})
export class SensorAddComponent implements OnInit {

  sensorForm: FormGroup;
  newSensor: Sensor;

  constructor(private fb: FormBuilder, private service: SensorService, private snackBar: MatSnackBar, private router: Router) { }

  ngOnInit(): void {
    this.sensorForm = this.fb.group ({
      // 'id': ['', Validators.required],
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
    this.newSensor = this.sensorForm.value;
    this.service.addSensor(this.newSensor).subscribe(
      data =>{
        this.sensorForm.reset();
        this.snackBar.open("Data succesuccessfully added!", "", {duration: 2000});
        this.router.navigate([''])
      }
    )
  }

  enableSubmitBtn () {
    return this.sensorForm.valid;
  }

}
