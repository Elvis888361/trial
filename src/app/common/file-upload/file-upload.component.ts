import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { SmsService } from 'src/app/services/sms.service';

@Component({
  selector: 'app-file-upload',
  templateUrl: './file-upload.component.html',
  styleUrls: ['./file-upload.component.css'],
})
export class FileUploadComponent {
  @ViewChild('fileInput') fileInput;

  file: any;

  constructor(private smsSvc: SmsService, public activeModal: NgbActiveModal) {}

  selectFile(e: any) {
    this.file = e.target.files[0];
  }

  uploadFile() {
    let formData = new FormData();
    formData.append('file', this.file);
    this.smsSvc.uploadCustomers(formData).subscribe((result) => {
      this.closeModal(result);
    });
  }

  closeModal(sendData) {
    this.activeModal.close(sendData);
  }
}
