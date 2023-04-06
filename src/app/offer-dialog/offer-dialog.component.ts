import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

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

  constructor(private formBuilder: FormBuilder) { }

  ngOnInit(): void {

    this.newOfferForm = this.formBuilder.group({
      username: ["",],
      password: [
        "",
      ]
    });
  }

  searchInput(){
    this.subscriptionList = this.mainSubscriptionList;
    this.subscriptionList = this.subscriptionList.filter((ele:any)=>ele.includes(this.searchValue))
  }

  selectSubscription(i:any){
    this.selectedSubscription = this.subscriptionList[i];
    this.startOffer();

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
}
