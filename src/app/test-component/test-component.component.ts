import { Component, OnInit } from '@angular/core';
import { RealtimeDBService } from '../../Services/Firebase/FirebaseDB/realtime-db.service';

@Component({
  selector: 'app-test-component',
  templateUrl: './test-component.component.html',
  styleUrl: './test-component.component.css'
})
export class TestComponentComponent implements OnInit{
  constructor(private realtime:RealtimeDBService){}

  userData:any ={
    firstName:"...",
    lastName:"........"
  }

  ngOnInit(): void {
    setTimeout(()=>{
      // this.realtime.getLoggedUserDetails(this.realtime.mGetLoggedInUser().uid).then((data) => {
      //   if(data)
      //   {
      //     this.userData = data
      //   }
        
      // });
    },5000)
    
  }

}
