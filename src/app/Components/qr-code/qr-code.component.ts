import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { QRCodeModule } from 'angularx-qrcode';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-qr-code',

  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.css'
})
export class QrCodeComponent {

   blGenerate:boolean = false
   visible:boolean = false;

  shareableLink = 'https://sfison.co.za'
  width:number = 200

     public qrCodeDownloadLink: SafeUrl = "";
     onChangeURL(url: SafeUrl) {
       this.qrCodeDownloadLink = url;
     }

     GenerateQRCode(){
      this.visible = true;

      setTimeout(() => {
        this.blGenerate = true;
        this.visible = false;
      }, 5000)
      
     }
}
