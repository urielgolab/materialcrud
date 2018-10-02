import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatButton  } from "@angular/material";
import {Observable} from 'rxjs/rx';
import { CentrosService } from "../services/centros.service";
import { Centro } from '../../domain/centro';
import {Router, ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-centro',
  templateUrl: './centro.component.html',
  styleUrls: ['./centro.component.css']
})
export class CentroComponent {
  form: FormGroup;
  id: string;
  nuevo: boolean;

  private centro: Centro = {
    nombre: "",
    activo: true,
    descripcion: "",
    fechaAlta: new Date()
  };

  constructor(private _centrosService: CentrosService, private router: Router, private route: ActivatedRoute) {
    this.form = new FormGroup({
      'nombre': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'activo': new FormControl(''),
      'descripcion': new FormControl('')
      // 'fechaAlta': new FormControl('', [Validators.required])
    });

    this.route.params.subscribe( params => {
        this.id = params['id'];
        if (this.id !== "0") {
          this._centrosService.get(this.id).subscribe( data => {
            this.centro = data;
            this.form.patchValue(this.centro);
          },
          error => console.log(error));
        } else {
          this.form.reset();
        }
      }
    );

    this.nuevo = this.id === "0";
  }

  get(key$: string) {
    if (key$) {
      this.centro = this._centrosService.get(key$).subscribe(
        data => {
          console.log(data);
          this.form.setValue(data);
          // this.router.navigate(['/centro', data.name]);
        },
        error => console.log(error));
    }
  }

  save() {
    console.log(this.form);

    this.centro = this.form.value;
    console.log(this.centro);
    this._centrosService.save(this.centro, this.id).subscribe(
      data => {
        console.log(data);
      },
      error => console.log(error));
  }

  delete() {
    if (this.id) {
      this.centro = this._centrosService.delete(this.id).subscribe(
        data => {
          console.log(data);
          this.router.navigate(['centros']);
        },
        error => console.log(error));
    }
  }
}
