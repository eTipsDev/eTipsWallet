import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { SafeUrl } from '@angular/platform-browser';
import { QRCodeModule } from 'angularx-qrcode';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-qr-code',

  templateUrl: './qr-code.component.html',
  styleUrl: './qr-code.component.css'
})

export class QrCodeComponent implements OnInit {

  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false
    }, 2000)
  }

   blGenerate:boolean = false
   visible:boolean = false;
   loading:boolean = true;

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
        this.loading = false
      }, 5000)
      
     }
}
