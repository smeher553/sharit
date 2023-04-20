import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { CallingServiceService } from '../calling-service.service';

@Component({
  selector: 'app-offer-dialog',
  templateUrl: './offer-dialog.component.html',
  styleUrls: ['./offer-dialog.component.css']
})
export class OfferDialogComponent implements OnInit {

  searchValue= "";
  heading1:string = "All Subscription:-"
  subscriptionList:string[] = ["netflix","amazon prime","apple music","disney","HBO","Add new Subscription"];
  mainSubscriptionList:string[] = ["netflix","amazon prime","apple music","disney","HBO","Add new Subscription"];
  selectedSubscription:string;
  searchResult:any[];
  public newOfferForm: FormGroup;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';

  constructor(private formBuilder: FormBuilder, private _snackBar: MatSnackBar, private callingService :CallingServiceService) { }

  ngOnInit(): void {

    this.newOfferForm = this.formBuilder.group({
      offferTitle: ["",],
      usersCount: [
        "",
      ],
      price : ["",],
      subscriptionCycle : ["",]
    });
  }

  searchInput(){
    this.subscriptionList = this.mainSubscriptionList;
    this.subscriptionList = this.subscriptionList.filter((ele:any)=>ele.includes(this.searchValue))
  }

  selectSubscription(i:any){
    this.selectedSubscription = this.subscriptionList[i];
    this.startOffer();
    if(this.subscriptionList.length!==i+1){
      this.newOfferForm.controls['offferTitle'].setValue(this.selectedSubscription)
    }
    else if(this.subscriptionList.length===i+1){
      this.newOfferForm.controls['offferTitle'].setValue(null)

    }

  }

  startOffer():boolean{

    return true;
  }

  clearSearch(){
    this.searchValue="";
    this.subscriptionList = this.mainSubscriptionList;

  }

  onSubmit(){

  }

  postOffer(){
    let obj = {
      "subscriptionName" : this.newOfferForm.get('offferTitle')?.value,
      "totalUser" : this.newOfferForm.get('usersCount')?.value,
      "publishedBy" : sessionStorage.getItem("userName"),
      "subscriptionCycle" : this.newOfferForm.get('subscriptionCycle')?.value,
      "costPerCycle" : this.newOfferForm.get('price')?.value,
      "usersLeft": this.newOfferForm.get('usersCount')?.value,
    }

    this.callingService.offerSubscription(obj).subscribe((res:any)=>{
      this.newOfferForm.reset();
      this.openSnackBar("New Offer publised successfully")
    },
    (error:any)=>{
      this.openSnackBar("Some error occured in posting new offer")
    }
    );
  }

  openSnackBar(displayTest:string) {
    this._snackBar.open(displayTest, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }
}
