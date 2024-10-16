import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { HeaderComponent } from '../header/header.component';
import { AuthenticationService } from '../../../Services/Firebase/FirebaseAuth/authentication.service';


@Component({
  selector: 'app-account-setting',

  templateUrl: './account-setting.component.html',
  styleUrl: './account-setting.component.css'
})


export class AccountSettingComponent {
  constructor(private _location: Location,
    private authentication:AuthenticationService,
  ) { }

  goBack() {
    this._location.back();
  }

  activeTab: string = 'account-settings';

  setActiveTab(tab: string) {
    this.activeTab = tab;
  }

  logout(){
    this.authentication.mLogout();
  }

}
