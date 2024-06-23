import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DataService } from '../data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  userForm!: FormGroup;

  constructor(
    private readonly dataService: DataService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.userForm = new FormGroup({
      userName: new FormControl(null, [Validators.required]),
      password: new FormControl(null, [Validators.required]),
    });
  }
  onSubmit() {
    if (this.dataService.user.password === this.userForm.value.password) {
      this.router.navigate(['dashboard']);
    }
  }
}
