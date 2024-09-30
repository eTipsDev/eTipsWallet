import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthenticationService } from '../../../Services/Firebase/FirebaseAuth/authentication.service';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  constructor(private route:Router, 
    private authentication:AuthenticationService

  ){}

  LoginDetails = {
    email:"",
    password:""
  }

  Login(form: any){

    if (form.valid) {
        this.authentication.Login(this.LoginDetails.email, this.LoginDetails.password).then((userCredential) => {
          // Signed in 
          const user = userCredential.user;

          if(user.emailVerified){
            // this.logListener.mLogin(true)
            // this.loading = false
            this.route.navigate(["/dashboard"]);
          }
          else{
            alert("Email not verified, please check your emails.")
            // this.loading = false
          }

        })
        .catch((error) => {
          // this.loading = false
          const errorCode = error.code;
          const errorMessage = error.message;
          // if(errorCode && errorMessage === "INVALID_LOGIN_CREDENTIALS"){
          //   console.log("---", errorCode)
          // }

          if(errorMessage == "Firebase: Error (auth/invalid-credential)."){
            alert("User with the given login details was not found")
          }
          else{
            alert(errorMessage)
          }
        });

    }

    // this.router.navigate(['/dashboard'])
  }
  

}
