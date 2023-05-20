import { Component, OnInit } from '@angular/core';

interface Member {
  name: string;
  affiliation: string;
  position: string;
  website?: string;
  imagePath: string;
}

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.scss'],
})
export class MembersComponent implements OnInit {
  members: Member[] = [
    {
      name: 'Hemanth Reddy Samidi',
      affiliation: 'University of Maryland, Baltimore County',
      position: 'MS Student',
      imagePath: '../../../assets/images/hemanth.jpg',
    },
    {
      name: 'Sanjetha Pericherla',
      affiliation: 'University of Maryland, Baltimore County',
      position: 'MS Student',
      imagePath: '../../../assets/images/sanjetha.jpg',
    },
  ];

  constructor() {}

  ngOnInit(): void {}
}
