import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { RealtimeDBService } from '../Firebase/FirebaseDB/realtime-db.service';
import { environment } from '../../environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class KycServService {

  private endPoint:string = "https://api.etipswallet.co.za/api/v1/customer"
  // private endPoint:string = "http://localhost:2024/api/v1/customer"

  constructor(private http:HttpClient) { 

  }

  registerCustomer(body:any, token:any):Observable<any>{
    const headers = new HttpHeaders()
    .append('Authorization', 'Bearer ' + token)
    .append('Accept', '*/*')

    
    return this.http.post(this.endPoint + "/", body, {headers})
  }

  uploadDocs(body:any, token:any):Observable<any>{
    const headers = new HttpHeaders()
    .append('Authorization', 'Bearer ' + token)
    .append('Accept', '*/*')

    
    return this.http.post(this.endPoint + "/docs/", body, {headers})
  }
  

  performAWSLiveness(customerId:any, token:any){
    const headers = new HttpHeaders()
    .append('Authorization', 'Bearer ' + token)
    .append('Accept', '*/*')

    return this.http.get(this.endPoint + `/liveness?customerId=${customerId}`, {headers})
  }
}
