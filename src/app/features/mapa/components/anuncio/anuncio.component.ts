import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { FormBuilder, Validators } from '@angular/forms';
import { Person } from 'src/app/shared/models/person.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.css']
})
export class AnuncioComponent {

  constructor(
    public dialogRef: MatDialogRef<AnuncioComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    private fb: FormBuilder) {}

  onNotify(){
    
  }


  reportCaseForm = this.fb.group({
    document: [null, Validators.required],
    type: [null, Validators.required],
    report: [null, Validators.required]
  })

  docTypes: string[] = ['DNI', 'Pasaporte', 'Carnet de Extranjería'];
  reportType: string[] = ['Caso confirmado', 'Caso recuperado'];

  onReportCase () {
    let person = this.reportCaseForm.value;
    let req = new Person();
    req.document = person.document;
    req.type = person.type;
    if (person.report === "Caso confirmado"){
      this.notificationService.notifyConfirmedCase(req)
      .subscribe(res=> {this.resetReportCaseForm()})
    }else if(person.report === "Caso recuperado"){
      this.notificationService.notifyRecoverCase(req)
      .subscribe(res=> {this.resetReportCaseForm()})
    }

  }

  resetReportCaseForm () {
    this.reportCaseForm.reset();
  }

  notificationForm = this.fb.group({
    message: [null, Validators.required]
  })

}
