import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CallingServiceService } from '../calling-service.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  public RegisterationForm: FormGroup;
  constructor(private formBuilder: FormBuilder,private router: Router, private authService: CallingServiceService) { }

  ngOnInit(): void {
    this.RegisterationForm = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required]],
      userName: ["",],
      password: [
        "",
      ]
    });
  }

  onRegister(){

    let requestBody = {
      "userName": this.RegisterationForm.get('userName')?.value,
      "password": this.RegisterationForm.get('password')?.value
    }
    this.authService.userRegistration(requestBody).subscribe((res:any)=>{
      alert('login sucessful');
    },
    (error:any)=>{
      alert('Error occured');
    }
    );
  }

  login(){
    this.router.navigate(["login"]);
  }

}
