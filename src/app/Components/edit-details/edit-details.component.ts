
import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KYC } from '../../../Interfaces/kyc';
import { RealtimeDBService } from '../../../Services/Firebase/FirebaseDB/realtime-db.service';
import { KycServService } from '../../../Services/EtipsBackend/kyc-serv.service';
import { log } from 'console';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../Services/Firebase/FirebaseAuth/authentication.service';


@Component({
  selector: 'app-edit-details',
  templateUrl: './edit-details.component.html',
  styleUrl: './edit-details.component.css'
})
export class EditDetailsComponent  implements OnInit{

  loading:boolean = true;

  constructor(private firebase:RealtimeDBService,
    private kycService:KycServService,

    private route:Router
  ){}

  user_kyc:KYC = {
    userDetails: {
      firstName: '',
      lastName: '',
      email: '',
      mobileNumber: '',
      image: '',
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
    passedAWSLiveness: false
  };

ngOnInit(): void {
    setTimeout(()=>{
      this.firebase.getLoggedUserDetails().then((data) => {
console.log(data);
        if(data){
          
          
          this.user_kyc.userDetails = data.userDetails;

          // this.user_kyc.userDetails.firstName = data.firstName;
          // this.user_kyc.userDetails.firstName = data.lastName;
          // this.user_kyc.userDetails.email = data.email;
          // this.user_kyc.userDetails.mobileNumber = data.mobileNumber;
          // this.user_kyc.userDetails.work = data.work;

          this.user_kyc.BankDetails = data.BankDetails;
          this.user_kyc.address = data.address;
          // this.user_kyc.BankDetails.account_type = data.account_type;
          // this.user_kyc.BankDetails.account_number = data.account_number;
          // this.user_kyc.BankDetails.branch = data.branch;
          // this.user_kyc.BankDetails.bank = data.bank;

        }
        console.log("yess");
        
        this.loading = false;
      });
    },100)
  }
  uploaded = "/assets/images/ic-round-upload-file.svg";

  imageID = "..//assets/images/gallery-2.png";

  async loadImage(event:any){
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    this.user_kyc.userDetails.image = event.target.files[0]
    
    reader.onload = async (event:any) => {

     this.imageID = event.target.result
    }
    this.uploaded = "/assets/images/pablita-big-blue-tick.gif";
   reader.readAsDataURL(selectedFile);
  }

  CurrentPage = 0

  pageCount:number = 1;

  performKYC(form: any){
    if (form.valid) {

      alert("This will perform KYC")

      this.firebase.uploadKYC(this.user_kyc).then((data) => {
        this.UploadToBackend();
      });
      
    }
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

  UploadToBackend(){

    this.loading = true;
    const formData = new FormData();
    formData.append("firstName", this.user_kyc.userDetails.firstName)
    formData.append("lastName", this.user_kyc.userDetails.lastName)
    formData.append("mobileNumber", this.user_kyc.userDetails.mobileNumber)
    formData.append("idNumber", this.user_kyc.userDetails.idNumber)
    formData.append("externalUniqueId", this.user_kyc.externalUniqueId)
    formData.append("image", this.user_kyc.userDetails.image)
    formData.append("address", JSON.stringify(this.user_kyc.address)
    )

    this.kycService.performKYC(formData).pipe(finalize(() => {
      this.loading = false;
    })
  ).subscribe({
        next: (message) => {
          // this.products = product,

          this.firebase.kycComplete({kyc:true}).then((data) => {
            alert("updated ")
            console.log(data);
            
          })
          alert(message);
          this.route.navigate(['/dashboard'])
          
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
