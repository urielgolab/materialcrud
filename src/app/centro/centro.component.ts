import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialog } from "@angular/material";
import { Observable } from 'rxjs/rx';
import { CentrosService } from "../services/centros.service";
import { Centro } from '../../domain/centro';
import { Item } from '../../domain/item';
import { Router, ActivatedRoute} from '@angular/router';
import { ItemComponent } from "../item/item.component";

@Component({
  selector: 'app-centro',
  templateUrl: './centro.component.html',
  styleUrls: ['./centro.component.css']
})
export class CentroComponent {
  centro: Centro = {
    nombre: "",
    activo: true,
    descripcion: "",
    dateCreated: new Date(),
    items: []
  };
  form: FormGroup;
  id: string;
  nuevo: boolean;


  private testItems: Item[] = [
    { name: "Name1", title: "Title1", dateCreated: new Date() },
    { name: "Name2", title: "Title2", dateCreated: new Date() }
  ];

  constructor(
    private _centrosService: CentrosService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog) {
    this.form = new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'activo': new FormControl(''),
      'descripcion': new FormControl('')
      // 'fechaAlta': new FormControl('', [Validators.required])
    });

    this.route.params.subscribe( params => {
        this.id = params['id'];
        if (this.id) {
          this._centrosService.get(this.id).subscribe( data => {
            Object.assign(this.centro, data);
            this.form.patchValue(this.centro);

            console.log(this.centro);
          },
          error => console.log(error));
        } else {
          this.form.reset();
        }
      }
    );

    this.nuevo = this.id === null;
  }

  save() {
    this.centro = this.form.value;
    this._centrosService.save(this.centro, this.id).subscribe(
      data => {
      },
      error => console.log(error));
  }

  delete() {
    if (this.id) {
      this.centro = this._centrosService.delete(this.id).subscribe(
        data => {
          this.router.navigate(['centros']);
        },
        error => console.log(error));
    }
  }

  addItem() {
    console.log("hola:", this.centro);
    const dialogRef = this.dialog.open(ItemComponent, {
      width: '300px',
      data: { order: 1 } //(this.centro == null || this.centro.items === null ? 0 : this.centro.items.length) +
    });

    dialogRef.afterClosed().subscribe(result => {
        console.log(result);
        console.log(this.centro);

        if (result) {
          this.centro.items.push(result);
        }
    });
  }
}
