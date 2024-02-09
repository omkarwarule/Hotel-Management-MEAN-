import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {map} from 'rxjs/operators';
import { RestaurentData } from '../restaurent-dash/restaurent.model';

@Injectable({
  providedIn: 'root'
})

export class ApiService 
{
  [x: string]: any;
  


  constructor(private _http: HttpClient) { }
  addCustomer(data:any) {
    
    const dataString = JSON.stringify(data);
    
   console.log(dataString);
    return this._http.get<any>(`http://localhost:5555/signup/${dataString}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  addRestaurent(data:any) {
    
    const dataString = JSON.stringify(data);
    
   console.log(dataString);
    return this._http.get<any>(`http://localhost:5555/ghal/${dataString}`).pipe(
      map((res: any) => {
        return res;
      })
    );
  }
  
  
  //POST request
  postRestaurent(data:any ) 
  {
    return this._http.post<any>("http://localhost:5555", data).pipe(map((res:any)=>{
      return res;
    }))
  }
  //post menu
  getMenu()
  {
    return this._http.get<any>("http://localhost:5555/menus").pipe(map((res:any)=>{
      return res;
    }));
  }

  //GET request
  getRestaurent() 
  {
    return this._http.get<any>("http://localhost:5555/punes").pipe(map((res:any)=>{
      return res;
    }));
  }

  //delete request
  deleteRestaurant(id: any) {
    return this._http.delete<any>("http://localhost:5555/try" + id).pipe(map((res: any) => {
      return res;
    }));
  }
  

  //update request
  updateRestaurant(id: number, data: any) {
    const dataString = JSON.stringify(data);
    return this._http.get<any>(`http://localhost:5555/up/${id}/${dataString}`).pipe(map((res: any) => {
      return res;
    }));
  }
  
}
