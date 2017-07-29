import { AppUtility } from '../AppUtility';
import {Component, OnInit} from '@angular/core';
import { FormGroup, FormArray, FormBuilder,
          Validators, ReactiveFormsModule, FormControl  } from '@angular/forms';
@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css'],
})
export class TestComponent implements OnInit {


  form;
  payLoad = null;

  constructor() {
    const group: any = {};
    group.firstName = new FormControl('', Validators.required);
    group.streetAddress = new FormControl('', Validators.required);
    group.email = new FormControl('', [
      Validators.required,
      Validators.pattern(AppUtility.EMAIL_VALIDATOR)
    ]);
    group.zip = new FormControl('', [Validators.pattern(AppUtility.ZIP_CODE_PATTERN)]);
    group.type = new FormControl('home');

    this.form = new FormGroup(group);
  }
  ngOnInit(): void {
  }

  onSubmit() {
    this.payLoad = JSON.stringify(this.form.value);
    console.log(this.form.value);
  }

}
