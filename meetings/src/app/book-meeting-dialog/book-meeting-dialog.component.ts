import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DataService } from '../data.service';
import { Meeting } from '../models/meeting.model';

@Component({
  selector: 'app-book-meeting-dialog',
  templateUrl: './book-meeting-dialog.component.html',
  styleUrls: ['./book-meeting-dialog.component.css'],
})
export class BookMeetingDialogComponent implements OnInit {
  public meetingForm!: FormGroup;
  public rooms: string[] = [];
  public timeError = false;
  public roomSearch = false;

  constructor(
    private dialogRef: MatDialogRef<BookMeetingDialogComponent>,
    private formBuilder: FormBuilder,
    private dataService: DataService,
    private cd: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.initializeForm();
    this.initializeData();
  }
  
  public onSubmit(): void {
    if (this.durationInMinutes() < 30) {
      this.timeError = true;
    } else {
      const meetings: Meeting[] = [...this.dataService.meetings];
      meetings.push(this.meetingForm.value);
      this.dataService.meetings = meetings;
      this.dataService.changeNotify.next();
      this.dialogRef.close();
    }
  }

  public onClose(): void {
    this.dialogRef.close();
  }

  public searchRooms(): void {
    this.roomSearch = !this.roomSearch;
    this.cd.detectChanges();
  }

  private initializeForm(): void {
    this.meetingForm = this.formBuilder.group({
      userName: [null, [Validators.required]],
      date: [null, [Validators.required]],
      startTime: [null, [Validators.required]],
      endTime: [null, [Validators.required]],
      room: [null, [Validators.required]],
      agenda: [null, [Validators.required]],
    });
  }

  private initializeData(): void {
    this.meetingForm.controls.userName.setValue(this.dataService.user.userName);
    this.rooms = this.dataService.rooms;
  }

  private durationInMinutes(): number {
    const [startHours, startMinutes] = this.meetingForm.value.startTime
      .split(':')
      .map(Number);
    const [endHours, endMinutes] = this.meetingForm.value.endTime
      .split(':')
      .map(Number);
    if (startHours < 9 || endHours > 18) {
      return 0;
    }
    const startDate = new Date();
    startDate.setHours(startHours, startMinutes);
    const endDate = new Date();
    endDate.setHours(endHours, endMinutes);

    // getTime() will return time in milliseconds hence dividing the difference it by 60000 to get in in mins
    const duration = (endDate.getTime() - startDate.getTime()) / 60000;
    return duration;
  }
}
