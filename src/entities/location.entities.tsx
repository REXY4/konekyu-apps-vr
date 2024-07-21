export interface GetLocationEntities {
    accuracy:  number ;
    altitude:  number ;
    bearing:   number ;
    latitude:  number ;
    longitude: number ;
    provider:  string ;
    speed:     number ;
    time:      number ;
}


export interface MyLocationEntities {
    accuracy: number
    altitude: number
    bearing: number
    latitude:number
    longitude: number
    provider: string
    speed : number
    time : number
}

export interface GetMemberLocation {
    id:        number;
    parent_id: number;
    name:      string;
    ssid : string;
    address:   string;
    latitude:  string;
    longitude: string;
    distance : string;
    logo:      null;
    pictures:  PictureLoc[];
    parent:    Parent;
}

export interface Parent {
    id:   number;
    name: string;
    logo: string;
}

export interface PictureLoc {
    id:        number;
    entity_id: number;
    url:       string;
}


export interface GetRekomendLocationEn {
        location : GetMemberLocation,
        distance : number
}
