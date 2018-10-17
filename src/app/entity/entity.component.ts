import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators, FormArray } from '@angular/forms';
import { MatDialog } from "@angular/material";
import { Observable } from 'rxjs/rx';
import { EntitiesService } from "../services/entities.service";
import { Entity } from '../../domain/entity';
import { Item } from '../../domain/item';
import { Router, ActivatedRoute} from '@angular/router';
import { ItemComponent } from "../item/item.component";

@Component({
  selector: 'app-entity',
  templateUrl: './entity.component.html',
  styleUrls: ['./entity.component.css']
})
export class EntityComponent {
  entity: Entity = {
    name: "",
    active: true,
    description: "",
    dateCreated: new Date(),
    items: []
  };
  form: FormGroup;
  id: string;
  nuevo: boolean;

  constructor(
    private _entitiesService: EntitiesService,
    private router: Router,
    private route: ActivatedRoute,
    public dialog: MatDialog) {
    this.form = new FormGroup({
      'name': new FormControl('', [Validators.required, Validators.minLength(5)]),
      'active': new FormControl(''),
      'description': new FormControl('')
      // 'fechaAlta': new FormControl('', [Validators.required])
    });

    this.route.params.subscribe( params => {
        this.id = params['id'];
        if (this.id) {
          this._entitiesService.get(this.id).subscribe( data => {
            Object.assign(this.entity, data);
            this.form.patchValue(this.entity);
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
    Object.assign(this.entity, this.form.value);
    this._entitiesService.save(this.entity, this.id).subscribe(
      data => {
        this.router.navigate(['entities']);
      },
      error => console.log(error));
  }

  delete() {
    if (this.id) {
      this.entity = this._entitiesService.delete(this.id).subscribe(
        data => {
          this.router.navigate(['entities']);
        },
        error => console.log(error));
    }
  }

  addItem(item?: Item, idx?: number) {
    if (idx != null) {
      item.order = idx;
    }

    const dialogRef = this.dialog.open(ItemComponent, {
      width: '300px',
      data: idx != null ? item : {}
    });

    dialogRef.afterClosed().subscribe(result => {
        if (result) {
          if (result.order !== null) {
            this.entity.items[result.order] = result;
          } else {
            this.entity.items.push(result);
          }
        }
    });
  }
}
