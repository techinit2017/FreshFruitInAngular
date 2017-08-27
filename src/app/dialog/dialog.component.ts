import { Component, OnInit, Input, Inject } from '@angular/core';
import { MdDialogRef, MD_DIALOG_DATA } from "@angular/material";
import { DialogModel } from "app/_model/model";

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {
  dialogmodel:DialogModel;
 
 
  constructor(public dialogRef: MdDialogRef<DialogComponent>,@Inject(MD_DIALOG_DATA) public data: any) {
    
    this.dialogmodel= new DialogModel();
    this.dialogmodel.headerText= data.dialogmodel;
    this.dialogmodel.boxLabel=data.boxLabel;
    this.dialogmodel.confirmButtonLabel=data.confirmButtonLabel;
    this.dialogmodel.cancelButtonLabel=data.cancelButtonLabel;
   
   }

  ngOnInit() {
    
  }

}
