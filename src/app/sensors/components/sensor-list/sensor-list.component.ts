import { Component, OnInit } from '@angular/core';
import { Sensor } from '../../models/sensor';
import { SensorService } from '../../services/sensor.service';

@Component({
  selector: 'ss-sensor-list',
  templateUrl: './sensor-list.component.html',
  styleUrls: ['./sensor-list.component.scss']
})
export class SensorListComponent implements OnInit {

  sensors: Sensor[];

  constructor(private service: SensorService) { }

  ngOnInit(): void {

    this.refresh();
  }

  refresh () {
    this.service.getAll().subscribe( data => this.sensors = data.sensors)
  }

}
