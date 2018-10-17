import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { Item } from '../../domain/item';
import { DataType } from '../../domain/dataType';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styles: []
})
export class ItemComponent {
  form: FormGroup;

  dataTypes: DataType[] = [
      {value: '0', name: 'String'},
      {value: '1', name: 'Number'},
      {value: '2', name: 'Date'},
      {value: '3', name: 'Check'}
    ];

  private item: Item = {
    name: "",
    title: "",
    description: "",
    dateCreated: new Date(),
    dataType: null,
    required: false,
    active: true,
    readOnly: false,
    order: null
  };


  constructor(
    public dialogRef: MatDialogRef<ItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data?: Item) {
      this.form = new FormGroup({
        'name': new FormControl('', [Validators.required, Validators.minLength(5)]),
        'title': new FormControl('', [Validators.required, Validators.minLength(5)]),
        'dataType': new FormControl(null, [Validators.required]),
        'active': new FormControl(''),
        'readOnly': new FormControl(''),
        'requiered': new FormControl(''),
        'description': new FormControl(''),
        'order': new FormControl('')
      });


      Object.assign(this.item, data);
      this.form.patchValue(this.item);
    }

  onNoClick(): void {
    this.dialogRef.close();
  }

  save() {
    // this.item = this.form.value;
    // debugger;
  }
}
