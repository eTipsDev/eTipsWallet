import { Injectable } from '@angular/core';

import { FirebaseApp, initializeApp } from "firebase/app";
import { environment } from '../../../environments/environment.development';


@Injectable({
  providedIn: 'root'
})
export class FirebaseService {

    public app?:any;

  private constructor() { 
    // console.log(environment.firebase);
    this.app = initializeApp(environment.firebase);
  }

  getFirebaseInstance():FirebaseApp{
    return this.app;
  }

  
  
}
