import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class KycServService {

  private endPoint:string = 'http://localhost:3000/api/v1/'

  constructor(private http:HttpClient) { }

  performKYC(body:any):Observable<any>{
    
    return this.http.post(this.endPoint + "customer/", body)
  }
}
