import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { QRCodeModule } from 'angularx-qrcode';
import { HeaderComponent } from "../header/header.component";
import { finalize } from 'rxjs';
import { KYC } from '../../../Interfaces/kyc';
import { RealtimeDBService } from '../../../Services/Firebase/FirebaseDB/realtime-db.service';
import { WalletService } from '../../../Services/Wallet/wallet.service';

@Component({
  selector: 'app-qr-code',

  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.css'
})

export class QrCodeComponent implements OnInit {

  blGenerate:boolean = false
  visible:boolean = false;
  loading:boolean = true;

 shareableLink = 'https://sfison.co.za'
 width:number = 200

  constructor(private firebase:RealtimeDBService,  
      private realtime:RealtimeDBService,
      private walletServ:WalletService){
  
    }

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

    QrData =  {
          walletId: 2522260,
          type: "ZA_MASTERPASS",
          code: "9595462308",
          amount: 0,
          expires: "2100-01-01T00:00:00.000Z",
          reference: "2522260",
          merchantName: "eTips UAT",
          description: "",
          additionalFields: [],
          acceptedCardSchemes: "MASTER,VISA,MAESTRO,AMEX",
          acceptedPaymentMechanisms: "AMT,SECURE_CODE,CNP",
          merchantId: 16478,
          pspId: 1,
          partialPaymentAllowed: false
      }
    
    ngOnInit(): void {
      setTimeout(() => {
        this.firebase.getLoggedUserDetails().then((data) => {
        // console.log(data);
          if(data){ 
            this.user_kyc = data
          }
  
          this.loading = false;
        });
        this.loading = false
      }, 2000)
    }
  
    getUserQrCode(){
  
      this.realtime.mGetCustomToken().then((JWT_Token:any) => {
        
        if(JWT_Token)
        {
          this.walletServ.getQRcode(this.user_kyc.customerId, this.user_kyc.wallet, JWT_Token).pipe(finalize(() => {
            this.loading = false;
            this.visible = false;
          })
        ).subscribe({
              next: (response) => {
                
                console.log(response);
                this.QrData = response.result

                if(Object.keys(this.QrData).length){

                }
                this.shareableLink = this.QrData.code
                // this.visible = false;
                this.blGenerate = true;
                // this.route.navigate(['/upload-documents'])
              },
              error: (err) => {
                if(err.status == 401) { 
      
                }
                else { 
      
                }
      
                alert("Failed to get QR code")
                console.log(err);
                
                // this.blLoadComplete = false
              },
            })
        }
        
        
      });
     
    }

  //   {
  //     "walletId": 2522260,
  //     "type": "ZA_MASTERPASS",
  //     "code": "9595462308",
  //     "amount": 0,
  //     "expires": "2100-01-01T00:00:00.000Z",
  //     "reference": "2522260",
  //     "merchantName": "eTips UAT",
  //     "description": "",
  //     "additionalFields": [],
  //     "acceptedCardSchemes": "MASTER,VISA,MAESTRO,AMEX",
  //     "acceptedPaymentMechanisms": "AMT,SECURE_CODE,CNP",
  //     "merchantId": 16478,
  //     "pspId": 1,
  //     "partialPaymentAllowed": false
  // }

     public qrCodeDownloadLink: SafeUrl = "";
     onChangeURL(url: SafeUrl) {
       this.qrCodeDownloadLink = url;
     }

     GenerateQRCode(){
      this.visible = true;

      setTimeout(() => {

        this.getUserQrCode()
      }, 2000)
      
     }
}
