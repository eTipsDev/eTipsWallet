import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';

import { LoaderComponent } from "../loader/loader.component";
import { RealtimeDBService } from '../../../Services/Firebase/FirebaseDB/realtime-db.service';

@Component({
  selector: 'app-header',
 
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})

export class HeaderComponent  {

  constructor(private realtime:RealtimeDBService){}

  userData:any ={
    firstName:"...",
    lastName:"........"
  }

  ngAfterViewInit(): void {
    setTimeout(()=>{
      this.realtime.getLoggedUserDetails().then((data) => {
        // console.log(data);
        
        if(data)
        {
          this.userData = data.userDetails
        }
        
      });
    },100)
    
  }



}
