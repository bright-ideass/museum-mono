import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '@core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { environment } from 'environments/environment';
import { ConfigService } from '@config';
@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
  standalone: true,
  imports: [
    RouterLink,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
  ],
})
export class SigninComponent implements OnInit {
  authForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  returnUrl!: string;
  randomNo!: string;
  error = '';
  hide = true;
  isTestMode = this.configService.configuration()?.TEST_MODE;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private authService: AuthService,
    private configService: ConfigService,
  ) { }
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ['admin', Validators.required],
      password: ['admin', Validators.required],
    });
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    this.route.queryParams.subscribe((queryParams) => {
      // console.log(queryParams['randomNo']);
      this.randomNo = queryParams['randomNo']
    });
    this.cbc_Login();
  }
  get f() {
    return this.authForm.controls;
  }

  cbc_Login() {
    if (this.randomNo) {
      console.log(this.randomNo)
      this.authService.cbc_login(this.randomNo).subscribe(res => {
        this.router.navigate(['/dashboard/main']);
      });
    }
  }

  testLogin() {
    this.authService.cbc_login('123456').subscribe(res => {
      this.router.navigate(['/dashboard/main']);
    });
  }

}
