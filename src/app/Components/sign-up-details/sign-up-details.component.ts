import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../Services/Firebase/FirebaseAuth/authentication.service';
import { FormsModule } from '@angular/forms';
import { LoaderComponent } from "../loader/loader.component";
import { VerifyEmailComponent } from "../verify-email/verify-email.component";
import { NewUser } from '../../../Interfaces/NewUser';
import { getAuth, updateProfile } from "firebase/auth";

@Component({
  selector: 'app-sign-up-details',

  templateUrl: './sign-up-details.component.html',
  styleUrl: './sign-up-details.component.css'
})
export class SignUpDetailsComponent {

  CurrentPage = 0

  constructor(private router:Router, 
    private authentication:AuthenticationService
  ){}

  loading:boolean = false;
  successful:boolean = false;

  passwords:any = {
    password:"",
    repassword:"",
  }

  user:NewUser = {
    userDetails: {
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: ''
    },
    settings: {
      termsAndCon: false,
      privacy_policy: false,
      email_notificaton: false
    },
    kyc: false
  };

  mRegister(form: any){
    if (form.valid ) {
      this.loading = true
      this.authentication.mRegister(this.user).then((data) =>{
        this.loading = false

        if(data == 200){
          form.reset();
          this.successful = true
        }
      }).catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        alert(errorMessage)
        this.loading = false
      });
    }
  }

  // updateDetails(){
   
  //   const auth = getAuth();
  //   updateProfile(auth.currentUser, {
  //     displayName: "Jane Q. User", photoURL: "https://example.com/jane-q-user/profile.jpg"
  //   }).then(() => {
  //     // Profile updated!
  //     // ...
  //   }).catch((error) => {
  //     // An error occurred
  //     // ...
  //   });
  // }


  pageCount:number = 1;

  NextClick(form: any){
    if(this.CurrentPage == 1 && (!this.user.settings.privacy_policy || !this.user.settings.termsAndCon)){
      return;
    }
    
    if (form.valid ) {
      if(this.CurrentPage < this.pageCount){
        this.CurrentPage += 1
      }
      else{
        if(this.passwords.password != this.passwords.repassword){
          return
        }
      }
    }
  }

  PreviousClick(){

    if(this.CurrentPage > 0){
      this.CurrentPage -= 1
    }
    
  }
}
