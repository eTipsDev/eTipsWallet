import { Component, OnInit } from '@angular/core';
import { RealtimeDBService } from '../../../Services/Firebase/FirebaseDB/realtime-db.service';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})

export class DashboardComponent implements OnInit{

  loading:boolean = true;

  constructor(private realtime:RealtimeDBService){}

  userData:any ={
    firstName:"",
    lastName:"",
    kyc:false
  }

  visible:boolean = true
  ngOnInit(): void {

    // setTimeout(() => {
    // const ctx:any = document.getElementById('myChart');

    //     new Chart(ctx, {
    //       type: 'bar',
    //       data: {
    //         labels: ['Jan', '', 'Mar', '', 'May', ''],
    //         datasets: [{
    //           label: 'Tips Review',
    //           data: [12, 19, 3, 5, 2, 3],
    //           borderWidth: 1,
    //           backgroundColor: 'orange',
    //         }]
    //       },
    //       options: {
    //         scales: {
    //           y: {
    //             beginAtZero: true
    //           }
    //         }
    //       }
    //     });
    //     this.visible = false
    // },  2000)

    setTimeout(()=> {
      this.realtime.getLoggedUserDetails(this.realtime.mGetLoggedInUser().uid).then((data) => {
        if(data){
          this.userData = data
        }
        
        this.loading = false
      });
    },1000)
  }

}
