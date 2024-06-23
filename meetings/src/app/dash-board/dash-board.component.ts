import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DataService } from '../data.service';
import { BookMeetingDialogComponent } from '../book-meeting-dialog/book-meeting-dialog.component';
import { User } from '../models/user.model';

@Component({
  selector: 'app-dash-board',
  templateUrl: './dash-board.component.html',
  styleUrls: ['./dash-board.component.css'],
})
export class DashBoardComponent implements OnInit {
  public user!: User;

  constructor(
    private dataService: DataService,
    public dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.user = this.dataService.user;
  }

  public openBookMeetingDialog(): void {
    this.dialog.open(BookMeetingDialogComponent, {
      width: '750px',
    });
  }

  public logout(): void {
    this.router.navigate(['login']);
  }
}
