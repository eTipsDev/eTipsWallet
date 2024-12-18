import { Component, OnInit } from '@angular/core';
import { Router } from 'express';
import { KYC } from '../../../Interfaces/kyc';
import { BackLocationService } from '../../../Services/BackLocation/back-location.service';
import { KycServService } from '../../../Services/EtipsBackend/kyc-serv.service';
import { RealtimeDBService } from '../../../Services/Firebase/FirebaseDB/realtime-db.service';

@Component({
  selector: 'app-bottom-nav',
  templateUrl: './bottom-nav.component.html',
  styleUrl: './bottom-nav.component.css'
})
export class BottomNavComponent implements OnInit{

    constructor(private firebase:RealtimeDBService,
      private kycService:KycServService,
      private route:Router,
      private realtime:RealtimeDBService,
      private back:BackLocationService
    ){}

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
      customerId:'',
      wallet:"",
      passedAWSLiveness: false,
      kyc:false
    };

    

  ngOnInit(): void {
    setTimeout(()=>{
      this.firebase.getLoggedUserDetails().then((data) => {

        if(data){
          this.user_kyc = data
        }

      });
    },100)
  }

}
