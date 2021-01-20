import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { LoginService } from 'src/shared/login.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  hide = true;
  public registerForm: FormGroup;

  constructor(
    private loginService: LoginService,
    private router: Router
  ) {
    this.initializeRegisterForm();
  }

  ngOnInit() {
  }

  public initializeRegisterForm() {
    this.registerForm = new FormGroup({
      userName: new FormControl(null, Validators.required),
      password: new FormControl(null, [Validators.required, Validators.minLength(8)]),
      confirmPassword: new FormControl(null, Validators.required),
      email: new FormControl(null, [Validators.required, Validators.email]),
      phone: new FormControl(null, Validators.required),
    });
  }

  public register() {
    const user = this.registerForm.value;
    this.loginService.register(user).subscribe((response: any) => {
      alert('Đăng kí thành công!');
      this.router.navigate(['/login']);
    }, (error) => {
      alert('Đăng kí không thành công!');
    });

  }
}
