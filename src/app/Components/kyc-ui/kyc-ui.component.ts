import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { KYC } from '../../../Interfaces/kyc';
import { RealtimeDBService } from '../../../Services/Firebase/FirebaseDB/realtime-db.service';
import { KycServService } from '../../../Services/EtipsBackend/kyc-serv.service';
import { log } from 'console';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-kyc-ui',
 
  templateUrl: './kyc-ui.component.html',
  styleUrl: './kyc-ui.component.css'
})

export class KycUIComponent implements OnInit{

  loading:boolean = true;

  constructor(private firebase:RealtimeDBService,
    private kycService:KycServService,
    private route:Router
  ){}

  user_kyc:KYC = {
    firstName: "",
    lastName: "",
    mobileNumber: "",
    image: "",
    BankDetails: {
      account_holder: "",
      account_type: "",
      account_number: "",
      branch: "",
      bank: ""
    },
    work: "",
    idNumber: "",
    externalUniqueId: "",
    address: {
      addressType: "PRIMARY",
      city: "",
      code: "",
      country: "",
      line1: "",
      line2: "",
      line3: "",
      state: ""
    },
    passedAWSLiveness: false
  };

ngOnInit(): void {
    setTimeout(()=>{
    //   this.firebase.getLoggedUserDetails(this.firebase.mGetLoggedInUser().uid).then((data) => {

    //     if(data){
    //       this.user_kyc.firstName = data.firstName;
    //       this.user_kyc.lastName = data.lastName
    //     }

        this.loading = false;
      });
    // },100)
  }
  uploaded = "/assets/images/ic-round-upload-file.svg";

  imageID = "..//assets/images/gallery-2.png";

  async loadImage(event:any){
    const selectedFile = event.target.files[0];
    const reader = new FileReader();

    this.user_kyc.image = event.target.files[0]
    
    reader.onload = async (event:any) => {

     this.imageID = event.target.result
    }
    this.uploaded = "/assets/images/pablita-big-blue-tick.gif";
   reader.readAsDataURL(selectedFile);
  }

  CurrentPage = 0

  pageCount:number = 2;

  performKYC(form: any){
    if (form.valid) {

      alert("This will perform KYC")


      // this.firebase.uploadKYC(this.user_kyc).then((data) => {
      //   this.UploadToBackend();
      // });
      
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
    formData.append("firstName", this.user_kyc.firstName)
    formData.append("lastName", this.user_kyc.lastName)
    formData.append("mobileNumber", this.user_kyc.mobileNumber)
    formData.append("idNumber", this.user_kyc.idNumber)
    formData.append("externalUniqueId", this.user_kyc.externalUniqueId)
    formData.append("image", this.user_kyc.image)
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
