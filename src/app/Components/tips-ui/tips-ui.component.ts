import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderComponent } from "../header/header.component";
import { KYC } from '../../../Interfaces/kyc';
import { RealtimeDBService } from '../../../Services/Firebase/FirebaseDB/realtime-db.service';

@Component({
  selector: 'app-tips-ui',
  templateUrl: './tips-ui.component.html',
  styleUrl: './tips-ui.component.css'
})
export class TipsUIComponent implements OnInit{

  constructor(private firebase:RealtimeDBService,){

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
    customerId: ''
  };
  
  ngOnInit(): void {
    setTimeout(() => {
      this.firebase.getLoggedUserDetails().then((data) => {
      // console.log(data);
        if(data){
          
          this.user_kyc = data
          // this.isKYCPerformed = data.kyc;
          // this.user_kyc.userDetails.firstName = data.firstName;
          // this.user_kyc.userDetails.firstName = data.lastName;
          // this.user_kyc.userDetails.email = data.email;
          // this.user_kyc.userDetails.mobileNumber = data.mobileNumber;
          // this.user_kyc.userDetails.work = data.work;

          // this.user_kyc.BankDetails = data.BankDetails;
          // this.user_kyc.address = data.address;
          // this.user_kyc.BankDetails.account_type = data.account_type;
          // this.user_kyc.BankDetails.account_number = data.account_number;
          // this.user_kyc.BankDetails.branch = data.branch;
          // this.user_kyc.BankDetails.bank = data.bank;
          console.log(this.user_kyc);
        }
        console.log("yess");
        
        this.loading = false;
      });
      this.loading = false
    }, 2000)
  }

}
