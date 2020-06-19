import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { DepartmentService } from '../../module-service/department.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.css']
})
export class QuestionsComponent implements OnInit {

  addQuestions: FormGroup;
  setMessage: any = {};msg: string; status: String;
  companyNameSubscription: Subscription;
  companyNames:string[];

  constructor(
    private formBuilder: FormBuilder,
    private _companyNameService: DepartmentService
  ) { }

  ngOnInit() {
    this.companyNameSubscription = this._companyNameService.getCompanyName().subscribe(resp => {
      this.companyNames=resp;
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })
  
    this.addQuestions = this.formBuilder.group({
      companyName: ['', [Validators.required, Validators.minLength(1)]],
      jobFunction: ['', [Validators.required, Validators.minLength(2)]],
      addQuestion: ['', [Validators.required, Validators.minLength(2)]],
      addanswer: ['', [Validators.required, Validators.minLength(2)]]
    });
  }

}
