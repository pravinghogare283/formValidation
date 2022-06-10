import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'formValidation';

  myForm: any;

  isSubmitted: boolean = false;
  constructor(private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.myForm = this.fb.group({
      select: ['', Validators.required],
      fname: ['', [Validators.required]],
      lname: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/)]],
      password: ['', [Validators.required]],
      cpassword: ['', [Validators.required]],
      checkbox: [false, Validators.requiredTrue],

    }, {
      validators: this.MustMatch('password', 'cpassword')
    });
  };
  MustMatch(controlName: string, matchingControlName: string) {
    return (formGroup: FormGroup) => {
      const control = formGroup.controls[controlName];
      const matchingControl = formGroup.controls[matchingControlName];
      if (matchingControl.errors && !matchingControl.errors['MustMatch']) {
        return
      }
      if (control.value !== matchingControl.value) {
        matchingControl.setErrors({ MustMatch: true })
      } else {
        matchingControl.setErrors(null);
      }
    }
  }

  onSubmitForm() {
    console.log(this.myForm);
    console.log(this.myForm.value)
    this.isSubmitted = true;
  }
  get f() {
    return this.myForm.controls;
  }



}
