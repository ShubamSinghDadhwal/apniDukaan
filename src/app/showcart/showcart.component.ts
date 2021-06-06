import { Component, OnInit } from '@angular/core';
import { CartService } from '../cart.service';

@Component({
  selector: 'app-showcart',
  templateUrl: './showcart.component.html',
  styleUrls: ['./showcart.component.css']
})
export class ShowcartComponent implements OnInit {

  cartprods:string[];
  msg:string;
  flag:boolean;
  gtotal:number=0;
  
  constructor(private cartsrvobj:CartService) {
    this.getcart();
   }

  ngOnInit(): void {
  }

  getcart()
  {
    this.cartsrvobj.fetchcart(sessionStorage.getItem("username")).subscribe(
      {
        next:(resp:any[])=>
        {
          if(resp.length==0)
          {
            this.flag=false;
          }
          else
          {
            this.cartprods=resp;
            this.flag=true;
            for(var i=0;i<this.cartprods.length;i++)
            {
              this.gtotal+=this.cartprods[i]["totalcost"];
            }
            sessionStorage.setItem("billtotal",this.gtotal.toString());
          }
        },
        error:(err)=>
        {

        }
      }
    )
  }

}
