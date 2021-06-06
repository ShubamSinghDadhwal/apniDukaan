import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-changepswd',
  templateUrl: './changepswd.component.html',
  styleUrls: ['./changepswd.component.css']
})
export class ChangepswdComponent implements OnInit {

  currpass:string;
  newpass:string;
  cnewpass:string;
  msg:string;

  constructor(private chngpassservice:AccountsService,private myrouter:Router) { }

  ngOnInit(): void {
  }

  changepass()
  {
    if(this.newpass == this.cnewpass)
    {
        var databody={
          uname:sessionStorage.getItem("username"),
          cpass:this.currpass,
          npass:this.newpass
        }

        this.chngpassservice.changepass(databody).subscribe({
          
          next:(res)=>{
            if(res["nModified"] ==1)
            {
              // this.msg="Password Changed Successfully";
              alert("Password Changed Successfully, Re-login to proceed")
              sessionStorage.clear();
              this.myrouter.navigateByUrl("/login");
            } 
            else
            {
              this.msg="Incorrect Current Password"
            }
          },
          error:(err)=>{
            this.msg=err;
          }
        })
      
    }
    else
    {
      this.msg="New Passwords Doesn't Match"
    }
  }

}
