import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  // imageObject: Array<object> = [
  //     {
  //       image: 'images/11.jpg',
  //       thumbImage: 'images/11.jpg',
  //       title: 'Buy Rice Products Are Now On Line With Us'
  //     },
  //     {
  //       image: 'images/22.jpg',
  //       thumbImage: 'images/22.jpg',
  //       title: 'Whole Spices Products Are Now On Line With Us'
  //     },
  //     {
  //       image: 'images/44.jpg',
  //       thumbImage: 'images/44.jpg',
  //       title: 'Whole Spices Products Are Now On Line With Us'
  //     }, 
  // ];
  imageObject: Array<object> = [
    {
      image: 'images/banner.jpg',
      thumbImage: 'images/11.jpg',
      alt: 'banner 1',
      title: 'title 1 of image',
    },
    {
      image: 'images/banner2.jpg',
      thumbImage: 'images/22.jpg',
      alt: 'banner 2',
      title: 'title 2 of image',
    },
    {
      image: 'images/banner3.jpg',
      thumbImage: 'images/44.jpg',
      alt: 'banner 3',
      title: 'title 3 of image',
    },
  ];
  constructor() { }

  ngOnInit(): void {
  }

}
