import { Component, OnInit } from '@angular/core';
import { AuthService } from 'app/services/auth.service';
import {NgForm} from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public username: string = '';
  public password: string = '';

  public col: string = 'col-md-offset-4';
  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.isMobileMenu();
  }
  isMobileMenu() {
    if ($(window).width() > 799) {
      this.col = 'col-md-offset-4';
      return;
    }
    this.col = 'col-md-offset-3';
  }

  onSubmit() {
    if(this.username !== '' && this.password !== '') this.authService.login(this.username,this.password);
  }

}
