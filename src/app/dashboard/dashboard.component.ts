import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { CallingServiceService } from '../calling-service.service';
import { OfferDialogComponent } from '../offer-dialog/offer-dialog.component';
import { SubscribeDialogComponent } from '../subscribe-dialog/subscribe-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  panelOpenState = false;
  requestedList:any[] = [];
  pendingRequestList:any[]=[];

  offeredSubscriptions:any[] = [];

  constructor(public dialog: MatDialog,private callingService :CallingServiceService) { }

  ngOnInit(): void {

    this.getOfferedSubscription();
  }

  login(){

  }

  subscribe(){
    this.openDialog(SubscribeDialogComponent);
  }

  openDialog(component:any): void {
    this.dialog.open(component, {
      width: '800px',
      maxHeight: '400px'
    });
  }

  offer(){
    this.openDialog(OfferDialogComponent);
  }

  getOfferedSubscription(){
    
    this.callingService.getByPublishedUser(sessionStorage.getItem("userName")).subscribe((res:any)=>{
        this.offeredSubscriptions = res.body.responseBody;
    },
    (error:any)=>{
      console.log("error occured")
    });
  }

  decline(i:number,j:number){

  }
  
  approve(i:number,j:number){

  }

  getSubscriptiondetails(i:number){
    let selectedSubscription = this.offeredSubscriptions[i];
    this.callingService.getSubscriptionByIdAndUserName(sessionStorage.getItem("userName"),selectedSubscription.id).subscribe((res:any)=>{
      this.pendingRequestList = res.body.responseBody;
    },
    (error:any)=>{

    })
  }
}
