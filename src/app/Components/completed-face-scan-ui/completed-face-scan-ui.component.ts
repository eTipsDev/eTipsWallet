import { Component, OnInit } from '@angular/core';
import { KycServService } from '../../../Services/EtipsBackend/kyc-serv.service';
import { SessionStorageService } from '../../../Services/SessionStorage/session-storage.service';
import { RealtimeDBService } from '../../../Services/Firebase/FirebaseDB/realtime-db.service';
import { finalize } from 'rxjs/operators';
import { log } from 'console';
import { Router } from '@angular/router';

@Component({
  selector: 'app-completed-face-scan-ui',
  templateUrl: './completed-face-scan-ui.component.html',
  styleUrl: './completed-face-scan-ui.component.css'
})
export class CompletedFaceScanUiComponent implements OnInit {

  constructor(private kyc:KycServService, 
    private sessionStorage:SessionStorageService, 
   private realtime:RealtimeDBService,
   
       private route:Router,
   private firebase:RealtimeDBService){}

   loading:boolean = true;

   LivenessDetails:any = {};

  ngOnInit(): void {
    
    setTimeout(() => {
      this.LivenessDetails = this.sessionStorage.retrieveToWebStorage()

      // this.realtime.mGetCustomToken().then((JWT_Token:any) => {
      
        // if(JWT_Token)
        // {
          if(this.LivenessDetails.awsFaceLivenessSessionId){

            this.updateAwsLiveness(this.LivenessDetails.token);
          }
          else{
            alert("missing values")
            console.log(this.LivenessDetails);
            
          }
        // }
      // }).catch(err => {
      //   alert("No token")
      //   console.log(err);
        
      // });
    }, 3000)
  }


  updateAwsLiveness(JWT_Token:any) {
    this.kyc.updateAWSLiveness(this.LivenessDetails, JWT_Token).pipe(finalize(() => {
      this.loading = false;
    })
  ).subscribe({
        next: (response:any) => {
  
          this.firebase.kycComplete({passedAWSLiveness:true, kyc: true}).then((data) => {
            alert("updated ")
            this.route.navigate(['/dashboard'])
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

 

}
