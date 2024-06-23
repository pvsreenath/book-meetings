import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { DataService } from '../data.service';
import { Meeting } from '../models/meeting.model';

@Component({
  selector: 'app-meetings',
  templateUrl: './meetings.component.html',
  styleUrls: ['./meetings.component.css'],
})
export class MeetingsComponent implements OnInit {
  public displayedColumns: string[] = [
    'position',
    'userName',
    'agenda',
    'date',
    'time',
    'room',
  ];
  public dataSource = this.dataService.meetings;

  constructor(
    private dataService: DataService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeData();
  }

  public deleteMeeting(row: Meeting): void {
    this.dataService.meetings = this.dataService.meetings.filter(
      (meeting) =>
        !(
          meeting.room === row.room &&
          meeting.date == row.date &&
          meeting.startTime === row.startTime
        )
    );
    this.dataSource = this.dataService.meetings;
    this.dataService.changeNotify.next();
  }

  private initializeData(): void {
    this.dataService.changeNotify.subscribe(() => {
      this.dataSource = this.dataService.meetings;
      this.cd.detectChanges();
    });
  }
}
