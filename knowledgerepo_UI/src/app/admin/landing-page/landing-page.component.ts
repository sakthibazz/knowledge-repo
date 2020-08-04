import { Component, OnInit,ViewChild } from '@angular/core';
import { CompanyComponent} from '../company/company.component';
import { StorageService } from '../../shared/storage.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { Router } from '@angular/router';
import { DepartmentService } from '../../module-service/department.service'
import { from,Subscription } from 'rxjs';
import * as _ from 'lodash';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css'],
  providers: [StorageService,DepartmentService]
})
export class LandingPageComponent implements OnInit {
  private router: Router;
  companyNameSubscription: Subscription;
  questionSubscription:Subscription;
  questionClientSubscription:Subscription;
  topicNameSubscription:Subscription;
  questionsClientList:string[];
  companyNames : string[];
  questionsList:string[];
  setMessage : any = {};
  public dataSource: any;
  displayedColumns: string[];
  public show:boolean = false;
  public show_topic:boolean = false;
  public searchText:string;
  public clientId:number;
  public uniqueTopics: string[];
  private loadQuestionsComponent: boolean = false;
  private loadAllQuestionsComponent: boolean = true; 
  topicNames : string[];
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  constructor(private _storage: StorageService,private _companyNameService: DepartmentService) { }
  
  ngOnInit() {
    this.companyNameSubscription = this._companyNameService.getCompanyName().subscribe(resp => {
      this.companyNames=resp;
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    });
    this.topicNameSubscription = this._companyNameService.getTopicName().subscribe(res =>{
      this.topicNames = res;
      this.uniqueTopics = _.uniqBy(this.topicNames,'topicName');
      console.log(this.uniqueTopics);
    })
   
  }
  toggle() {
    this.show = !this.show;
    this.show_topic =  false;
  }
  toggle1() {
    this.show_topic = !this.show_topic;
    this.show = false;
  }
  questionsOnclient(CName){
    this.clientId = CName.textContent;
    this.questionClientSubscription = this._companyNameService.getClientQuestionsList(this.clientId).subscribe(respObj => {
      this.questionsClientList=respObj;
      this.dataSource = new MatTableDataSource(respObj);
      this.dataSource.paginator = this.paginator;
    }, err => {
      this.setMessage = { message: 'Server Error /Server Unreachable!', error: true };
    })
    this.loadQuestionsComponent = true;
    this.loadAllQuestionsComponent = false;
  }
  SignUpComponent() {
    sessionStorage.clear();
  }
  LogInBodyComponent(){
    sessionStorage.clear();
  }
}
