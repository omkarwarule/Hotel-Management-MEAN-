import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../shared/api.service';
@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit 
{
  signupForm!: FormGroup
  constructor(private formbuilder: FormBuilder, private _http:HttpClient, private _router:Router,private _api: ApiService ) 
  { }

  ngOnInit(): void 
  {
    this.signupForm = this.formbuilder.group({
      name:['',[Validators.required]],
      email:['',[Validators.required]],
      mobile:['',[Validators.required]],
      password: ['',[Validators.required]]
    })
  }
  signUp()
  {
    
      const restaurantData: any = this.signupForm.value;

      this._api.addCustomer(restaurantData).subscribe(
        (res) => {
          console.log(res);
          alert('Restaurant Added Successfully');
          // Additional logic if needed
        },
        (err) => {
          console.error(err);
           alert('registered');
        }
      );
    
  }

  // signUp()
  // {
  //   this._http.get<any>('http://localhost:5555/signup',this.signupForm.value).subscribe(res=>{
  //     console.log(res)
  //     alert('Signup Successfully');
  //     this.signupForm.reset();
  //     this._router.navigate(['/login']);
  //   }), (err: any)=>{
  //     console.log(err);
  //     alert('Signup Error');
  //   }
  // }

}
