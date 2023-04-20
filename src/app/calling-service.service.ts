import { Injectable } from '@angular/core';
import {GoogleAuthProvider} from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
 
@Injectable({
  providedIn: 'root'
})
export class CallingServiceService {

  constructor(private fireAuth:AngularFireAuth,private router:Router,private httpCall:HttpClient) { }


  googleAuth(){
    return this.fireAuth.signInWithPopup(new GoogleAuthProvider).then((res)=>{
      this.router.navigate(["dashboard"]);
      localStorage.setItem("token",JSON.stringify(res.user?.uid))
    },err=>{
      alert(err.message);
    })                                 
  }

  userLogin(requestBody:any){
    let url="http://localhost:8080/shareit/mem-auth/login";
    let headers = new HttpHeaders();
    headers = headers.set('Access-Control-Allow-Origin', '*');
    // header('Access-Control-Allow-Origin: *');
    return this.httpCall.post(url,requestBody,{headers:headers,observe:'response'});
  }

  userRegistration(requestBody:any){
    let url="http://localhost:8080/shareit/mem-auth/registration";
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json');
    return this.httpCall.post(url, requestBody,{headers:headers,observe:'response'});
  }

  offerSubscription(requestBody:any){
    let url="http://localhost:8080/shareit/sub/offerSubscription/isUpdate/false";
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json');
    return this.httpCall.post(url, requestBody,{headers:headers,observe:'response'});
  }

  RequestSubscription(userName:any, id:number){
    let url="http://localhost:8080/shareit/sub/requestForSubscription?userName="+userName+"&subscriptionId="+id;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json');
    return this.httpCall.post(url,{headers:headers,observe:'response'});
  }

  getSubscriptionByTitle(title:any){
    let url="http://localhost:8080/shareit/sub/requestForSubscription?subscriptionName="+title;
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type','application/json');
    return this.httpCall.get(url,{headers:headers,observe:'response'});
  }            
}
