import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KYC } from '../../../Interfaces/kyc';
import { RealtimeDBService } from '../../../Services/Firebase/FirebaseDB/realtime-db.service';
import { KycServService } from '../../../Services/EtipsBackend/kyc-serv.service';
import { log } from 'console';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { BackLocationService } from '../../../Services/BackLocation/back-location.service';

@Component({
  selector: 'app-kyc-ui',
 
  templateUrl: './kyc-ui.component.html',
  styleUrl: './kyc-ui.component.css'
})

export class KycUIComponent implements OnInit{

  loading:boolean = true;

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
    passedAWSLiveness: false
  };

ngOnInit(): void {
    setTimeout(()=>{
      this.firebase.getLoggedUserDetails().then((data) => {

        if(data){
          this.user_kyc.userDetails.firstName = data.userDetails.firstName;
          this.user_kyc.userDetails.lastName = data.userDetails.lastName
          this.user_kyc.userDetails.mobileNumber = data.userDetails.mobileNumber

          this.user_kyc.BankDetails.account_holder = data.userDetails.firstName + " " + data.userDetails.lastName;

        }

        this.loading = false;
      });
    },100)
  }

  CurrentPage = 0

  pageCount:number = 1;

  performKYC(form: any){
    // if (form.valid) {

      if(confirm("Are you sure that the detaisl provided are correct?")){
          let userID = this.user_kyc.userDetails.idNumber

        this.user_kyc.userDetails.idNumber = ''
        this.firebase.uploadKYC(this.user_kyc).then((data) => {
        this.user_kyc.userDetails.idNumber = userID
        // console.log('>> ', this.realtime.mGetCustomToken());
        
        this.realtime.mGetCustomToken().then((JWT_Token:any) => {
        
          if(JWT_Token)
          {
            this.UploadToBackend(JWT_Token);
          }
          
          
        });
          
        });
      }
      
      
      
    // }
  }

  NextClick(form: any){

    if (form.valid) {
      if(this.CurrentPage < this.pageCount){
        this.CurrentPage += 1
      }
      else{
      
      }
    }
  }

  UploadToBackend(JWT_Token:any){
    this.loading = true;

    const formData = new FormData();
    formData.append("firstName", this.user_kyc.userDetails.firstName)
    formData.append("lastName", this.user_kyc.userDetails.lastName)
    formData.append("mobileNumber", this.user_kyc.userDetails.mobileNumber)
    formData.append("idNumber", this.user_kyc.userDetails.idNumber)
    formData.append("externalUniqueId", this.user_kyc.externalUniqueId)

    formData.append("address", JSON.stringify(this.user_kyc.address))

    this.kycService.registerCustomer(formData, JWT_Token).pipe(finalize(() => {
      this.loading = false;
    })
  ).subscribe({
        next: (response) => {
          this.firebase.kycComplete({customerRegister:true, customerId:response.timestamp}).then((data) => {
            alert("Details uploaded successfully, now upload your ID document and a selfie ")
            // console.log(data);
            
          })
          // console.log(response);
          this.route.navigate(['/upload-documents'])
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

  goBack(){
    this.back.goBack()
  }

  PreviousClick(){
    if(this.CurrentPage > 0) {
      this.CurrentPage -= 1
    }
  }

}
