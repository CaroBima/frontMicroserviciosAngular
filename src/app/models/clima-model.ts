export class clima{
    name : string;
    country : string;
    region : string;
    tempC : number;
    lastUpdated : string;
    humidity : number;
    feelslikeC : number;
    windKph : number;

    constructor(name: string, country:string, region:string, tempC:number, lastUpdated:string, humidity:number, feelslikeC:number, windKph:number){
        this.name = name;
        this.country = country;
        this.region = region;
        this.tempC = tempC;
        this.lastUpdated = lastUpdated;
        this.humidity = humidity;
        this.feelslikeC = feelslikeC;
        this.windKph = windKph;
    }
}
