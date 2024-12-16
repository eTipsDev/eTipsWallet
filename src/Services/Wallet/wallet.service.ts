import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WalletService {



   private endPoint:string = "https://api.etipswallet.co.za/api/v1/wallet"
    // private endPoint:string = "http://localhost:2024/api/v1/wallet"
  
    constructor(private http:HttpClient) {  }
  
    getWallet(customerId:any, walletId:any, token:any):Observable<any>{
      const headers = new HttpHeaders()
      .append('Authorization', 'Bearer ' + token)
      .append('Accept', '*/*')
  
      
      return this.http.get(`${this.endPoint}?customer=${customerId}&wallet=${walletId}`, {headers})
    }

    getQRcode(customerId:any, walletId:any, token:any):Observable<any>{
      const headers = new HttpHeaders()
      .append('Authorization', 'Bearer ' + token)
      .append('Accept', '*/*')
  
      
      return this.http.get(`${this.endPoint}/qrcode?customer=${customerId}&wallet=${walletId}`, {headers})
    }
}
