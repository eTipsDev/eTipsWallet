import { Component } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { AuthenticationService } from '../../../Services/Firebase/FirebaseAuth/authentication.service';

@Component({
  selector: 'app-security-privacy',
  templateUrl: './security-privacy.component.html',
  styleUrl: './security-privacy.component.css'
})
export class SecurityPrivacyComponent {
UpdatePassword() {
throw new Error('Method not implemented.');
}

  constructor(private authentication:AuthenticationService,){}

  selectedOption:any = "none"

  passwords:any = {
    password:"",
    repassword:"",
  }

  selectComponent(component:any){
    this.selectedOption = component
  }

}
