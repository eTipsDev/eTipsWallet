import { Injectable } from '@angular/core';
import { getAuth } from 'firebase/auth';
import { FirebaseService } from '../FirebaseService/firebase.service';
import { Router } from '@angular/router';
import { getDatabase, ref, set, child, onValue, get, onChildAdded, update} from "firebase/database";
import { log } from 'console';

@Injectable({
  providedIn: 'root'
})
export class RealtimeDBService {

   private realtimedatabase?:any;
  
  private constructor( private router: Router, firbaseInst: FirebaseService) { 
    // console.log(">>>> ", firbaseInst.app);

    // if(!firbaseInst.app){
    //   firbaseInst.getFirebaseInstance()
    // }
    
    this.realtimedatabase = getDatabase();
  }


  GetRealtimeInstance(){
    return this.realtimedatabase
  }

  async uploadKYC(customer:any){

    const user = this.mGetLoggedInUser().uid;
    
    customer.externalUniqueId = user;
    if(user){
      return await update(
        ref(this.GetRealtimeInstance(), 'users/' + user), 
        customer
      );
    }
  }

  async kycComplete(data:any){

    const user = this.mGetLoggedInUser().uid;
    
    // customer.externalUniqueId = user;
    if(user){
      return await update(
        ref(this.GetRealtimeInstance(), 'users/' + user), 
        data
      );
    }
  }

  mGetLoggedInUser():any{
    const auth = getAuth();
    const user = auth.currentUser;
    // console.log(user?.email);
    
    if (user !== null) {
      return user;
    }

    return {};
  }

  async mGetCustomToken():Promise<any>{

    
    // if(Object.keys(userFound).length){
    //   console.log(userFound);
      
    //   userFound!.getIdToken().then((data:any) => {

    //     userToken = data
      
    //  }).catch((error:any) => {
    //    console.error(error);
    //  });
    // }

    let userToken = null;

    await this.mGetLoggedInUser()!.getIdToken().then((data:any) => {

       userToken = data
     
    }).catch((error:any) => {
      console.error(error);
    });

     return userToken

  }

  async getLoggedUserDetails():Promise<any>{

    const userFound = this.mGetLoggedInUser().uid;
    
    if(!userFound){
      return null
    }

    let user:any;
    const db = getDatabase();

    const dbRef = ref(db);
    
     await get(child(dbRef, `users/${userFound}`)).then((snapshot) => {
      if (snapshot.exists()) {

         user = snapshot.val();
        }
    }).catch((error) => {
      console.error(error);
    });

    return user;
  }

}
