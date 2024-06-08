import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-motivation-modal',
  templateUrl: './motivation-modal.component.html',
  styleUrls: ['./motivation-modal.component.css']
})
export class MotivationModalComponent {
  quote: string;
  author: string;

  constructor(
    public dialogRef: MatDialogRef<MotivationModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.quote = data.message;
    this.author = data.author;
  }

  onClose(): void {
    this.dialogRef.close();
  }
}
