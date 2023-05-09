import { Component, OnInit, ViewChild } from '@angular/core';
import { ParticipantService } from 'src/app/services/paticipants.service';  
import { CenterService } from 'src/app/services/centers.service';
import { Participants } from 'src/app/models/participants';
import { Center } from 'src/app/models/center';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-records',
  templateUrl: './records.component.html',
  styleUrls: ['./records.component.scss']
})
export class RecordsComponent implements OnInit {
  participants: Participants[] = [];
  centers: Center[] = [];
  displayedColumns: string[] = ['id', 'firstName', 'lastName', 'centerName', 'ranking', 'recordTime'];
  dataSource !: MatTableDataSource<Participants>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor(private participantService: ParticipantService, private centerService: CenterService) { }

  ngOnInit() {
    this.getCenters();
    this.getParticipants();
  }

  getCenters() {
    this.centerService.getList().subscribe(centers => {
      this.centers = centers;
    });
  }
  
  getParticipants() {
    this.participantService.getList().subscribe((participants: Participants[]) => {
      const participantsWithCenterName = participants.map((participant: Participants) => {
        const center = this.centers.find(center => center.id === participant.centerId);
        const centerName = center ? center.name : '';
        return { ...participant, centerName };
      });
      this.dataSource = new MatTableDataSource<Participants>(participantsWithCenterName);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
    });
  }
}