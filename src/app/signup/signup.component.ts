import { HttpClient } from '@angular/common/http';
// keep in mind we have to import HttpClietn form /common

import { Component, OnInit } from '@angular/core';

import { Signup } from '../signup';
import { SignupService } from '../signup.service';

import {Conn} from '../conn'
import * as CryptoJS from 'crypto-js'

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  nm:string;
  phone:number;
  msg:string;
  email:string;
  password:string;
  
  signupobj:Signup

  //here we are creating obj of Http Client so that we can use it form data transfer
  constructor(private myhttp: HttpClient, private signupservice:SignupService) { }

  //here package.json file is already present so no need to create it again.
  // also in latest angualar versions - express, bodyparser, nodemon are already pr so no need to install them too 

  ngOnInit(): void {
  }

  /*
  onsignup()
  {
    //body data is the data which will be sent inside our http body
    var bodydata={
      name:this.nm,
      phone:this.phone,
      email:this.email,
      password:this.password
    }

    //here we are using our http obj
    // here we're sending the data to our api using http client
    // as return type of the myhttp.post is observable so we have to subscribe it in order to use it
    // whatever data is responded back by the api to observer we are displaying it

    //                                                aasan bhasa mein
    // .post method is used to send data to api and inorder to take back the response sent by it we are subscribing it

    //now if everything went good then we get CORS error which is preventing node running on port 3000 to be accessed by angular
    //so now we have to tell our node that "angular apna he bhai hai"
    this.myhttp.post("http://localhost:3000/signup",bodydata, {responseType:"text"}).subscribe(
      {
        next:(resp) =>{
          console.log(resp);
          this.msg=resp;
        },
        error:(err) =>{
          console.log(err);
        }
      }
    )
  }
  */


  //SIGNUP USING SERVICES AND CLASSES
  onsignup()
  {
    var encypswd= CryptoJS.AES.encrypt(this.password, Conn.skey).toString();
    // alert(encypswd);
    this.signupobj= new Signup(this.nm,this.phone,this.email,encypswd, "normal");
    
    //here save2db type is observer
    this.signupservice.save2db(this.signupobj).subscribe({
      next:(resp)=>{
        this.msg= resp;
      },
      error:(err)=>{
        this.msg= err;
      }
    })
    
  }

}

