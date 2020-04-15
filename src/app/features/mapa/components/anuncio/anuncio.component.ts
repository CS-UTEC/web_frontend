import { Component, OnInit, Inject } from '@angular/core';
import { MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { NotificationService } from 'src/app/shared/services/notification.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Person } from 'src/app/shared/models/person.model';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NotifyRegion } from 'src/app/shared/models/notifyRegion';
import { SelectionService } from 'src/app/shared/services';

@Component({
  selector: 'app-anuncio',
  templateUrl: './anuncio.component.html',
  styleUrls: ['./anuncio.component.css']
})
export class AnuncioComponent {


  selection: Map <string, string>;
  notificationForm = this.fb.group({
    message: ['', Validators.required],
  })

  constructor(
    public dialogRef: MatDialogRef<AnuncioComponent>, 
    @Inject(MAT_DIALOG_DATA) public data: any,
    private notificationService: NotificationService,
    private selectionService: SelectionService,
    private fb: FormBuilder) {
      this.selection = this.selectionService.getSelectedMarkersByType(data);
    }

  onNotify(){
    let ubigeos = [];
    for(let key of this.selection.keys()){
      ubigeos.push(key);
    }
    let notify = new NotifyRegion(this.notificationForm.value.message, ubigeos);
    this.notificationService.notifyUbigeos(notify)
    .subscribe(res=> {this.notificationForm.reset()})
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
