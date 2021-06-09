import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AccountsService } from '../accounts.service';
import {Conn} from '../conn';
import * as CryptoJS from 'crypto-js'


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  username:string;
  password:string;
  msg:string;
  prodid:string;

  constructor( private myrouter:Router , private loginservice:AccountsService,private myroute:ActivatedRoute) { 
    this.myroute.queryParams.subscribe({
      next:(resp)=>{
        this.prodid=resp["pid"];
      },
      error:(err)=>{}
    })
  }

  ngOnInit(): void {
    
  }

  onlogin()
  {
   
    
    // alert(decypswd);
    this.loginservice.login(this.username).subscribe(
      {
        next:(res)=>
            {
              if(res[0].activated == true)
              {
                  if(res[0] == null)
                {
                  this.msg="Incorrect Username/Password"  
                }
                else
                {
                  //28april
                  //session storage is a global storage inside browser inside which we can store key-value pairs , after storing we can fetch 
                  //those values at any page
                  var decypswd= CryptoJS.AES.decrypt(res[0].pass,Conn.skey ).toString(CryptoJS.enc.Utf8);
                  if(decypswd == this.password)
                  {
                    sessionStorage.setItem("pname",res[0].name);
                    sessionStorage.setItem("username",res[0].username);
                    sessionStorage.setItem("usertype",res[0].usertype);

                    if(this.prodid!=undefined){
                      this.myrouter.navigate(["/showpdetails"],{queryParams:{pid:this.prodid}});
                    }
                    else
                    {
                      if(res[0].usertype == "admin")
                        {
                            this.myrouter.navigateByUrl("/adminpanel")
                        }
                      else
                        {
                        this.myrouter.navigateByUrl("/home")
                        }
                        }
                  }
                  else
                  {
                    this.msg="Incorrect Password"
                  }
                      
                }
              }
              else
              {
                this.msg="Please Activate your account first"
              }
            },
            error:(err)=>{
            }
          }
        )
      }

    }


   
     