import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from 'src/shared/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  hide = true;
  public userName = '';

  public password = '';

  constructor(
    private loginService: LoginService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  public login() {
    this.loginService.login(this.userName, this.password).subscribe((response: any) => {
      alert('Đăng nhập thành công!');
      localStorage.clear();
      localStorage.setItem('token', response.token);
      this.router.navigate(['/layout-main']);
    }, (error) => {
      alert('Sai tài khoản hoặc mật khẩu!');
      localStorage.clear();
    });
  }
}
