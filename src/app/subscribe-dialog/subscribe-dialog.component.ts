import { EventListenerFocusTrapInertStrategy } from '@angular/cdk/a11y';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-subscribe-dialog',
  templateUrl: './subscribe-dialog.component.html',
  styleUrls: ['./subscribe-dialog.component.css']
})
export class SubscribeDialogComponent implements OnInit {


  heading1:string= "top favourites:-"
  favouriteHeading:string= "top favourites:-"
  heading2:string= "all subscriptions:-"
  searchValue= "";
  subscriptionList:string[] = ["netflix","amazon prime","apple music","show all...."];
  mainSubscriptionList:string[] = ["netflix","amazon prime","apple music","show all...."];
  selectedSubscription:string;
  selectedOffer:string;
  totalSubscriptionList:string[] = ["netflix","amazon prime","apple music","disney","HBO","View All offers"];
  mainTotalSubscriptionList:string[] = ["netflix","amazon prime","apple music","disney","HBO","View All offers"];
  searchResult:any[];


  constructor() { }

  ngOnInit(): void {
  }

  searchInput(){

    this.subscriptionList = this.mainSubscriptionList;
    this.subscriptionList = this.subscriptionList.filter((ele:any)=>ele.includes(this.searchValue))
  }

  selectSubscription(i:number){
    if(i===this.subscriptionList.length-1){
      if(this.subscriptionList[i]==="show all...."){
        this.heading1 = this.heading2;
        this.subscriptionList = this.totalSubscriptionList;
      }
      else if(this.subscriptionList[i]==="View All offers"){
        this.selectedSubscription = "All"
      }
    }
    else {
      this.selectedSubscription = this.subscriptionList[i];
    }
    

  }

  searchSubscription():boolean{

    if(this.selectedSubscription===null || this.selectedSubscription===undefined)
      return false;

     let obj = [{
      "title":"netflix",
      "costPerUser":"2",
      "subscriptionCycle":"month",
      "UsersLeft":3
     }]

     this.searchResult =obj;


    return true;  
  }

  RequestSubscription(){

  }

}


