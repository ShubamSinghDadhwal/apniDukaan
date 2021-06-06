import { Component, OnInit } from '@angular/core';
import { AccountsService } from '../accounts.service';

@Component({
  selector: 'app-manageproduct',
  templateUrl: './manageproduct.component.html',
  styleUrls: ['./manageproduct.component.css']
})
export class ManageproductComponent implements OnInit {

  scatname:string;
  myfile:File;
  msg:string;
  category:string="";
  subcat:string="";
  prodname:string;
  rate:string;
  disc:string;
  stock:string;
  description:string;

  allcatlist:String[];
  allsubcatlist:any[];
  allprodlist:any[];
  matchedsubcatlist:any[]=[];

  flag:boolean=false;

  catval:string;

  constructor(private catsrvobj:AccountsService) { }

  ngOnInit(): void {
    this.fetchcat();
    // this.fetchsubcat();
    
  }

  fileselected(event)
  {
    this.myfile= event.target.files[0]
    console.log(event);
  };

  addproduct()
  {
    var mydata= new FormData

    mydata.append("catname",this.category);
    mydata.append("subcatname",this.subcat);
    mydata.append("prodname",this.prodname);
    mydata.append("rate",this.rate);
    mydata.append("disc",this.disc);
    mydata.append("stock",this.stock);
    mydata.append("description",this.description);
    mydata.append("prodpic",this.myfile);

    this.catsrvobj.saveprod2db(mydata).subscribe({
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

  // fetchsubcat()
  // {
  //   this.catsrvobj.fetchsubcat(scid).subscribe({
  //     next:(res:any[])=>{
  //       this.allsubcatlist= res;
  //     },
  //     error:(err)=>{
  //       this.msg=err;
  //     }
  //   })
  // }

  fetchsubcatbycatid()
  {
    this.catsrvobj.fetchsubcatbycatid(this.category).subscribe({
      next:(res:any[])=>{
        this.allsubcatlist= res;
      },
      error:(err)=>{
        this.msg=err;
      }
    })
  }

  showsubcat()
  {
    //to clear previous category
    this.matchedsubcatlist.splice(0, this.matchedsubcatlist.length);

    for(let i=0;i < this.allsubcatlist.length; i++)
    {
      if (this.category == this.allsubcatlist[i].category)
       {this.matchedsubcatlist.push(this.allsubcatlist[i]);}
    }
  }

  fetchprodbyscid()
  {
    this.catsrvobj.fetchprodbyscid(this.subcat).subscribe({
      next:(res:any[])=>{
        if(res.length>0)
        {
          this.allprodlist= res;
          this.flag=true;
          this.msg=null;
        }
        else
        {
          this.flag=false;
          this.msg="No Products to show"
        }
        
      },
      error:(err)=>{
        this.msg=err;
      }
    })
  }

  proddelete(){

  }

}
