import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { KYC } from '../../../Interfaces/kyc';
import { RealtimeDBService } from '../../../Services/Firebase/FirebaseDB/realtime-db.service';
import { WalletService } from '../../../Services/Wallet/wallet.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-tips-ui',
  templateUrl: './tips-ui.component.html',
  styleUrl: './tips-ui.component.css'
})
export class TipsUIComponent implements OnInit{

  constructor(private firebase:RealtimeDBService,  
    private realtime:RealtimeDBService,
    private walletServ:WalletService){

  }

  loading:boolean = true;
  user_kyc:KYC = {
    userDetails: {
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      id_image: '',
      photo: '',
      idNumber: '',
      work: ''
    },
    BankDetails: {
      account_holder: '',
      account_type: '',
      account_number: '',
      branch: '',
      bank: ''
    },
    externalUniqueId: '',
    address: {
      addressType: '',
      city: '',
      code: '',
      country: '',
      line1: '',
      line2: '',
      line3: '',
      state: ''
    },
    passedAWSLiveness: false,
    wallet:"",
    customerId: '',
    kyc:false
  };

  wallet: any = {
    currentBalance: 0,
    availableBalance: 0,
    reservations: 0,
    status: "ACTIVE",
    currency: "ZAR",
}
  
  ngOnInit(): void {
    setTimeout(() => {
      this.firebase.getLoggedUserDetails().then((data) => {
      // console.log(data);
        if(data){
          
          this.user_kyc = data

          this.getUserWallet()
        }

        this.loading = false;
      });
      this.loading = false
    }, 2000)
  }

  getUserWallet(){

    this.realtime.mGetCustomToken().then((JWT_Token:any) => {
      
      if(JWT_Token)
      {
        this.walletServ.getWallet(this.user_kyc.customerId, this.user_kyc.wallet, JWT_Token).pipe(finalize(() => {
          this.loading = false;
        })
      ).subscribe({
            next: (response) => {
              this.wallet = response.result
              // console.log(response);
              // this.route.navigate(['/upload-documents'])
            },
            error: (err) => {
              if(err.status == 401) { 
    
              }
              else { 
    
              }
    
              alert("Failed KYC")
              console.log(err);
              
              // this.blLoadComplete = false
            },
          })
      }
      
      
    });
   
  }

}
