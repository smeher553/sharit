import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { OfferDialogComponent } from '../offer-dialog/offer-dialog.component';
import { SubscribeDialogComponent } from '../subscribe-dialog/subscribe-dialog.component';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {



  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
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

  // @Component({
  //   selector: 'dialog-subscription-dialog',
  //   templateUrl: 'dialog-subscription-dialog.html',
  // })
  // export class DialogsubscriptionDialog {
  //   constructor(public dialogRef: MatDialogRef<DialogsubscriptionDialog>) {}
  // }
  
}
