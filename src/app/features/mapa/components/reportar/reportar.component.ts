import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ReportService } from 'src/app/shared/services';
import { Person } from 'src/app/shared/models/person.model';

@Component({
  selector: 'app-reportar',
  templateUrl: './reportar.component.html',
  styleUrls: ['./reportar.component.css']
})
export class ReportarComponent {

  reportCaseForm: FormGroup;

  constructor(
    private reportService: ReportService,
    private fb: FormBuilder
  ) {
    this.reportCaseForm = this.fb.group({
      document: [null, Validators.required],
      type: [null, Validators.required],
      report: [null, Validators.required]
    })
   }

   docTypes: string[] = ['DNI', 'Pasaporte', 'Carnet de Extranjería'];
   reportType: string[] = ['Caso confirmado', 'Caso recuperado'];
 
   onReportCase () {
     let person = this.reportCaseForm.value;
     let req = new Person();
     req.document = person.document;
     req.type = person.type;
     if (person.report === "Caso confirmado"){
       this.reportService.reportConfirmedCase(req)
       .subscribe(res=> {this.resetReportCaseForm()})
     }else if(person.report === "Caso recuperado"){
       this.reportService.reportRecoverCase(req)
       .subscribe(res=> {this.resetReportCaseForm()})
     }
 
   }
 
   resetReportCaseForm () {
     this.reportCaseForm.reset();
   }


}
