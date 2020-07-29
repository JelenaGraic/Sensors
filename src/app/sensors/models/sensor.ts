export class Sensor {
    id: number;
    name: string;
    image: string;
    path: string;
    unitSymbol: string;
    value: any;
    lastUpdate: number;
    type: string;

    constructor (obj?: any){
        this.id = obj && obj.id || 0;
        this.name = obj && obj.name || "";
        this.image = obj && obj.image || "";
        this.path = obj && obj.path || "";
        this.unitSymbol = obj && obj.unitSymbol || "";
        this.value = obj && obj.value || "";
        this.lastUpdate = obj && obj.lastUpdate || null;
        this.type = obj && obj.type || "";
    }
}
