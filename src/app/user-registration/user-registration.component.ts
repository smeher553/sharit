import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { CallingServiceService } from '../calling-service.service';

@Component({
  selector: 'app-user-registration',
  templateUrl: './user-registration.component.html',
  styleUrls: ['./user-registration.component.css']
})
export class UserRegistrationComponent implements OnInit {

  public RegisterationForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private formBuilder: FormBuilder,private router: Router, private authService: CallingServiceService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.RegisterationForm = this.formBuilder.group({
      email: ["", [Validators.email, Validators.required]],
      userName: ["",],
      password: [
        "",
      ],
      city : ["",],
      country : ["",]
    });
  }

  onRegister(){

    let requestBody = {
      "userName": this.RegisterationForm.get('userName')?.value,
      "password": this.RegisterationForm.get('password')?.value,
      "address":{
        "city": this.RegisterationForm.get('city')?.value,
        "country": this.RegisterationForm.get('country')?.value
      }
      
    }
    this.authService.userRegistration(requestBody).subscribe((res:any)=>{
      this.openSnackBar("Registration Successfull");
      this.router.navigate(["login"]);

    },
    (error:any)=>{
      this.openSnackBar(error.error.response);
    }
    );
  }

  login(){
    this.router.navigate(["login"]);
  }

  openSnackBar(displayTest:string) {
    this._snackBar.open(displayTest, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}
