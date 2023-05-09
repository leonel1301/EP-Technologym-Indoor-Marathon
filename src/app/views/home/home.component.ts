import { Component, OnInit } from '@angular/core';

import { ParticipantService } from 'src/app/services/paticipants.service';
import { CenterService } from 'src/app/services/centers.service';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
})
export class HomeComponent implements OnInit {
  name: any;
  lastName: any;
  recordTime: any;
  marathonCenterName: any;
  image: any;

  constructor(
    private httpDataService: ParticipantService,
    private httpCenterService: CenterService,
  ) {}

  ngOnInit() {
    this.getMarathonWinner();
  }

  getCenterName(id: any) {
    this.httpCenterService.getList().subscribe((data) => {
      data.forEach((item: any) => {
        if (item.id == id) {
          this.marathonCenterName = item.name;
        }
        console.log(item);
      });
    });
  }

  getMarathonWinner() {
    this.httpDataService.getList().subscribe((data) => {
      let winner = data[0];
      data.forEach((item: any) => {
        if (item.recordTime < winner.recordTime) {
          winner = item;
        }
        console.log(item);
      });
      this.name = winner.firstName;
      this.lastName = winner.lastName;
      this.recordTime = winner.recordTime;
      this.getCenterName(winner.centerId);
      this.image = winner.photoUrl;
    });
  }
}