import { Sensor } from './sensor';

export class SensorList {
    sensors: Sensor[];

    constructor (obj?: any){
        this.sensors = obj && obj.map(elem =>{ return new Sensor(elem) }) || [];
    }
}