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
  
  private constructor( private router: Router,) { 
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

  async kycComplete(customer:any){

    const user = this.mGetLoggedInUser().uid;
    
    // customer.externalUniqueId = user;
    if(user){
      return await update(
        ref(this.GetRealtimeInstance(), 'users/' + user), 
        customer
      );
    }
  }

  mGetLoggedInUser():any{
    const auth = getAuth();
    const user = auth.currentUser;
    
    if (user !== null) {
      return user;
    }

    return {};
  }

  async getLoggedUserDetails(userID:any):Promise<any>{

    let user:any;
    const db = getDatabase();

    const dbRef = ref(db);
    
     await get(child(dbRef, `users/${userID}`)).then((snapshot) => {
      if (snapshot.exists()) {

         user = snapshot.val();
        }
    }).catch((error) => {
      console.error(error);
    });

    return user;
  }






}
