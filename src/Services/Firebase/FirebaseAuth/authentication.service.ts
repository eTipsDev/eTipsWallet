import { Injectable } from '@angular/core';
import { FirebaseService } from '../FirebaseService/firebase.service';
import { getAuth, onAuthStateChanged, createUserWithEmailAndPassword, 
  signInWithEmailAndPassword, sendEmailVerification, signOut, 
  deleteUser, sendPasswordResetEmail, updatePassword,
  User} from "firebase/auth";
import { set, ref } from 'firebase/database';
import { Router } from '@angular/router';
import { RealtimeDBService } from '../FirebaseDB/realtime-db.service';


@Injectable({
  providedIn: 'root'
})

export class AuthenticationService {

  private authentication?:any;
  
  constructor(firbaseInst: FirebaseService,  
    private router: Router,
    private realtimeDB:RealtimeDBService) { 
      
    this.authentication = getAuth(firbaseInst.getFirebaseInstance());
  }
  
  async Login(email: string, password: string){
    return await signInWithEmailAndPassword(this.authentication, email, password);
  }

  async mRegister(user: any, password:any){
    console.log(user);
    console.log(password);
    
    return createUserWithEmailAndPassword(this.authentication, user.userDetails.email, password)
    .then(async (userCredential) => {
      // Signed up 
      const Newuser = userCredential.user;

      await this.mSendVerificationEmail(Newuser);

      await set(ref(this.realtimeDB.GetRealtimeInstance(), 
      'users/' + userCredential.user.uid), user);

      console.log("added");
      
      return 200;
        
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(errorMessage)
      return 400;
    });
  }

  async mSendVerificationEmail(user: User){
    await sendEmailVerification(user)
 .then((data) => {
   alert("Registration Successful check your emails, \nbefore logging in")
 });
 }

 mLogout(){
   signOut(this.authentication).then(() => {
    //  this.logListener.mLogin(false)
     this.router.navigate(['/sign-in'])
   }, err => {
     alert(err.message)
   })
 }

 getAuthStatus(){
   onAuthStateChanged(this.authentication, (user) => {
     if (!user) {
      
      //  this.router.navigate(['/login'])
     }
   });
 }

 getCustomToken(){
  
 }


  forgotPassword(email:string){
    return sendPasswordResetEmail(this.authentication, email)
  }

  async DeleteUser(User:any){
    return await deleteUser(User);
  }

  updatePassword(user:any, newPassword:any){
    return updatePassword(user, newPassword)
  }
}
