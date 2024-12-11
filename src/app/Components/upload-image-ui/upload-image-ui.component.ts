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
  selector: 'app-upload-image-ui',
  templateUrl: './upload-image-ui.component.html',
  styleUrl: './upload-image-ui.component.css'
})
export class UploadImageUIComponent  implements OnInit{

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
    customerId:"",
    passedAWSLiveness: false
  };



ngOnInit(): void {
    setTimeout(()=>{
      
      this.firebase.getLoggedUserDetails().then((data) => {

        if(data){
          // this.user_kyc.userDetails.firstName = data.userDetails.firstName;
          // this.user_kyc.userDetails.lastName = data.userDetails.lastName
          // this.user_kyc.userDetails.mobileNumber = data.userDetails.mobileNumber
          this.user_kyc = data
          console.log(data);
          
          this.user_kyc.BankDetails.account_holder = data.userDetails.firstName + " " + data.userDetails.lastName;
        }

        this.loading = false;
      });
    },100)
  }
  uploaded = "/assets/images/ic-round-upload-file.svg";

  imageID = "..//assets/images/gallery-2.png";
  imagePhoto = "..//assets/images/gallery-2.png";

  async loadID(event:any){
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    this.user_kyc.userDetails.id_image = event.target.files[0]
    
    reader.onload = async (event:any) => {

     this.imageID = event.target.result
    }
    this.uploaded = "/assets/images/pablita-big-blue-tick.gif";
   reader.readAsDataURL(selectedFile);
  }

  async loadPhoto(event:any){
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    this.user_kyc.userDetails.photo = event.target.files[0]
    
    reader.onload = async (event:any) => {
     this.imagePhoto = event.target.result
    }

    this.uploaded = "/assets/images/pablita-big-blue-tick.gif";
   reader.readAsDataURL(selectedFile);
  }

  goBack(){
    this.back.goBack()
  }

  CurrentPage = 0

  pageCount:number = 1;

  performKYC(form: any){
    // if (form.valid) {

      alert("This will perform KYC")

      // let userID = this.user_kyc.userDetails.idNumber

      // this.user_kyc.userDetails.idNumber = ''
      // this.firebase.uploadKYC(this.user_kyc).then((data) => {
      // this.user_kyc.userDetails.idNumber = userID
      // console.log('>> ', this.realtime.mGetCustomToken());
      
      this.realtime.mGetCustomToken().then((JWT_Token:any) => {
      
        if(JWT_Token)
        {
          this.UploadToBackend(JWT_Token);
        }
        
        
      });
        
      // });
      
      
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
    formData.append("id_image", this.user_kyc.userDetails.id_image)
    formData.append("photo", this.user_kyc.userDetails.photo)
    formData.append("customerId", this.user_kyc.customerId)
    
    this.kycService.uploadDocs(formData, JWT_Token).pipe(finalize(() => {
      this.loading = false;
    })
  ).subscribe({
        next: (message) => {
          // this.products = product,

          this.firebase.kycComplete({uploadedDoc:true}).then((data) => {
            alert("updated ")
            
          })
         
          this.performLiveness(JWT_Token);
        },
        error: (err) => {
          if(err.status == 401)
          {
           
          }
          else{
           
          }

          alert("Failed KYC")
          console.log(err);
          
          // this.blLoadComplete = false
        },
      
      })
  }

  awsLiveness:any = {
    documentId: '',
    awsFaceLivenessSessionId:'',
    completionUrl:''
  }

  performLiveness(JWT_Token:any){
    this.loading = true;
    this.kycService.performAWSLiveness(this.user_kyc.customerId, JWT_Token).pipe(finalize(() => {
      this.loading = false;
    })
  ).subscribe({
        next: (response:any) => {
          // this.products = product,

          // this.firebase.kycComplete({uploadedDoc:true}).then((data) => {
          //   alert("updated ")
            
          // })

          this.awsLiveness.documentId = response.result.documentId
          this.awsLiveness.awsFaceLivenessSessionId = response.result.awsFaceLivenessSessionId
          this.awsLiveness.completionUrl = JSON.parse(response.result.extraInfo).completionUrl

          this.firebase.kycComplete(this.awsLiveness).then((data) => {
            alert("updated ")
          })
          
        },
        error: (err) => {
          if(err.status == 401)
          {
           
          }
          else{
           
          }

          alert("Failed KYC")
          console.log(err);
          
          // this.blLoadComplete = false
        },
      })
  }


  PreviousClick(){

    if(this.CurrentPage > 0){
      this.CurrentPage -= 1
    }
    
  }

}
