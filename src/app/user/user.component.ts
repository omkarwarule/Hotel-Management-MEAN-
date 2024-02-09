import { Component } from '@angular/core';
import { ApiService } from '../shared/api.service';
import {RestaurentData} from './man.model';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent 
{
 
  
  allRestaurentData: any;
  

  constructor( private api:ApiService) { }
  
  ngOnInit(): void {
    
    this.getAllData();
  }

  getAllData()
  {
    this.api.getRestaurent().subscribe(res => {
      this.allRestaurentData= res;
    }, err=>{
      console.log(err);
    })
  }

 
 
    
  }

