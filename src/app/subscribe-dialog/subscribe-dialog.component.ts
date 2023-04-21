import { Component, OnInit } from '@angular/core';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { CallingServiceService } from '../calling-service.service';

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
  searchResult:any[] = [];
  isFavourite:boolean;
  horizontalPosition: MatSnackBarHorizontalPosition = 'end';
  verticalPosition: MatSnackBarVerticalPosition = 'top';


  constructor(private _snackBar: MatSnackBar,private callingService :CallingServiceService) { }

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
    
    this.searchResult=[];

     this.callingService.getSubscriptionByTitle(this.selectedSubscription,sessionStorage.getItem("city")).subscribe((res:any)=>{
      this.searchResult= res.body.responseBody;
      this.searchResult = this.searchResult.filter((ele:any)=>ele.publishedBy!==sessionStorage.getItem("userName"));
      // this.searchResult = this.searchResult.filter((ele:any)=>ele.pendingRequest)
      if(this.searchResult.length===0){
        this.openSnackBar("No subscriptions present at this moment in your city")
      }
      else{
        this.openSnackBar("Subscription list fetched successfully")
      }
      
     },
     (error:any)=>{
      console.log("error occured");
     }
     );

    //  this.callingService.getSubscriptionByTitle(this.selectedSubscription).subscribe((res:any)=>{
    //   this.searchResult= res;
    //  },
    //  (error:any)=>{
    //   console.log("error occured");
    //  }
    //  );

  }

  requestSubscription(i:number){
    console.log("assaf");
    let selectedRquest = this.searchResult[i];
    // this.                                                  service call
    this.callingService.RequestSubscription(sessionStorage.getItem("userName"),selectedRquest.id).subscribe((res:any)=>{
      this.openSnackBar(selectedRquest.subscriptionName+" Request sent successfully");
      this.searchResult = this.searchResult.filter((ele:any)=>ele.id!==selectedRquest.id
      );
    },
    (error:any)=>{
      console.log("error occured");
    }
    );
  }

  addToFavourites(i:number){
    this.isFavourite=true;
                                                            // service Call
    let selectedRquest = this.searchResult[i];
    this.openSnackBar(selectedRquest.title+" add to favourites.");
    this.searchResult = this.searchResult.filter((ele:any)=>!ele.id.includes(selectedRquest.id));
  }

  searchSubscription():boolean{

    if(this.selectedSubscription===null || this.selectedSubscription===undefined)
      return false;

    return true;  
  } 

  openSnackBar(displayTest:string) {
    this._snackBar.open(displayTest, 'Close', {
      horizontalPosition: this.horizontalPosition,
      verticalPosition: this.verticalPosition,
    });
  }

}


