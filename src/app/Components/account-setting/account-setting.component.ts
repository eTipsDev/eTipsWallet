import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { HeaderComponent } from '../header/header.component';


@Component({
  selector: 'app-account-setting',

  templateUrl: './account-setting.component.html',
  styleUrl: './account-setting.component.css'
})


export class AccountSettingComponent {
  constructor(private _location: Location) { }

  goBack() {
    this._location.back();
  }
}
