import { Location } from '@angular/common';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BackLocationService {

  constructor(private _location: Location) { }

  goBack(){
    this._location.back();
  }
}
