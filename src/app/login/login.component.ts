import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CallingServiceService } from '../calling-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  public loginForm: FormGroup;
  error:any = "wrong credentials";
  constructor(private formBuilder: FormBuilder,private router: Router, private authService: CallingServiceService) { }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      username: ["",],
      password: [
        "",
      ]
    });
  }

  get formControl() {
    return this.loginForm.controls;
  }

  onLogin(){
    console.log(this.loginForm.value);
    
    let requestBody = {
      "userName": this.loginForm.get('username')?.value,
      "password": this.loginForm.get('password')?.value
    }

    sessionStorage.setItem("userName",this.loginForm.get('username')?.value)
    this.authService.userLogin(requestBody).subscribe((res:any)=>{
      alert('login sucessful');
      this.router.navigate(['dashboard'])
      localStorage.setItem("isLogin", "true");
    },
    (error:any)=>{
      alert('Error occured');
    }
    );

   
  }

  onGoogleLogin(){
    this.authService.googleAuth();
  }

  register(){
    this.router.navigate(["user-registration"]);
  }
}
