import { Component, OnInit } from '@angular/core';

import { CommonModule } from '@angular/common';
import { RouterLink, RouterModule } from '@angular/router';
import { HeaderComponent } from "../header/header.component";

@Component({
  selector: 'app-tips-ui',
  templateUrl: './tips-ui.component.html',
  styleUrl: './tips-ui.component.css'
})
export class TipsUIComponent implements OnInit{

  loading:boolean = true;
  
  ngOnInit(): void {
    setTimeout(() => {
      this.loading = false
    }, 2000)
  }

}
