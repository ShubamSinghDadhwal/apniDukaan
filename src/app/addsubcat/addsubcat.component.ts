import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-addsubcat',
  templateUrl: './addsubcat.component.html',
  styleUrls: ['./addsubcat.component.css']
})
export class AddsubcatComponent implements OnInit {

  scatname:string;
  myfile:File;
  msg:string;
  category:string="";
  allcatlist:String[];
  allsubcatlist:String[];
  flag:boolean=false;

  constructor(private catsrvobj: AccountsService) { 
    this.fetchcat();
  }

  ngOnInit(): void {
  }

  fileselected(event)
  {
    this.myfile= event.target.files[0]
    console.log(event);
  };

  addsubcat()
  {
    var mydata= new FormData

    mydata.append("catname",this.category);
    mydata.append("subcatname",this.scatname);
    mydata.append("subcatpic",this.myfile);

    this.catsrvobj.savescat2db(mydata).subscribe({
      next:(res)=>{
        this.msg= res;
      },
      error:(err)=>{
        this.msg= err;
      }
    })
  }

  fetchcat()
  {
    this.catsrvobj.fetchallcat().subscribe({
      next:(res:any[])=>{
        this.allcatlist= res;
      },
      error:(err)=>{
        this.msg=err;
      }
    })
  }

  fetchsubcatbycatid()
  {
    this.catsrvobj.fetchsubcatbycatid(this.category).subscribe({
      next:(res:any[])=>{
        if(res.length>0)
        {
          this.flag=true;
          this.allsubcatlist= res;
          this.msg=null;
        }
        else
        {
          this.flag=false;
          this.msg="No sub categories to display"
        }
      },
      error:(err)=>{
        this.msg=err;
      }
    })
  }

}
