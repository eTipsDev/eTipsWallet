import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RealtimeDBService } from '../Firebase/FirebaseDB/realtime-db.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class KycServService {

  private endPoint:string = environment.ENDPOINT
  // private token:string | undefined;

  constructor(private http:HttpClient) { 
    // this.realtime.mGetCustomToken().then((data:any) => {
      
    //   if(data)
    //   {
    //     this.token = data
    //     console.log(this.token);
    //   }
      
  
    // });
  }

  performKYC(body:any, token:any):Observable<any>{
    const headers = new HttpHeaders()
    .append('Authorization', 'Bearer ' + token)
    .append('Accept', '*/*')

    console.log(token);
    
    return this.http.post(this.endPoint + "customer/", body, {headers})
  }
}
