import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { Entity } from '../../domain/entity';
import { EntitiesService } from "../services/entities.service";
import { MatTableDataSource } from '@angular/material';
import { MaterialTableColumn } from '../shared/material-table/material-table.component';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService } from '../shared/loader/loader.service';

import * as Moment from 'Moment';

@Component({
  selector: 'app-entities',
  templateUrl: './entities.component.html',
  styleUrls: ['./entities.component.css']
})
export class EntitiesComponent implements OnInit {

  entities: Entity[] = [];
  entity: Entity = null;
  @ViewChild('columnDelete') columnDelete: TemplateRef<any>;
  @ViewChild('columnEdit') columnEdit: TemplateRef<any>;

  dataSource: MatTableDataSource<Entity> = new MatTableDataSource();
  cols: MaterialTableColumn[];
  EntitiesSub: Subscription;

  constructor(
    private router: Router,
    private entitiesService: EntitiesService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.setColumns();
    this.find();
  }

  setColumns () {
    this.cols = [
      { prop: 'key', name: '#', width: '60px'},
      { prop: 'name', name: 'Name', width: '120px'},
      { prop: 'active', name: 'Active', width: '60px', cellTransform: (cell, row) => row.activo ? "True" : "False"},
      { prop: 'dateCreated', name: 'Date created', width: '120px',
          cellTransform: (cell, row) => (row.dateCreated) ? Moment(row.dateCreated).format('DD/MM/YYYY HH:mm') : '',
          cellOrder: (cell, row) => (cell) ? Moment(cell).format('YYYY-MM-DD HH:mm') : '' },
      { prop: 'editar', name: 'Edit', width: '40px', cellTemplate: this.columnEdit },
      { prop: 'eliminar', name: 'Delete', width: '45px', cellTemplate: this.columnDelete }
    ];
  }

  public find() {
    this.dataSource.data = [];
    this.entities = [];

    this.loaderService.push();
    this.EntitiesSub = this.entitiesService.findAll().subscribe(data => {
      for (const id in data) {
        const elem: Entity = data[id];
        elem.id = id;
        this.entities.push(elem);
      }

      this.dataSource.data = this.entities;
      // this.recalculate.emit();
    }, (err) => {
      this.loaderService.pop();
    }, () => {
      this.loaderService.pop();
    });
  }

  onEntitySelected(entity: Entity) {
    if (entity) {
      this.router.navigate(['/entity/' + entity.id]);
    }
  }

  private edit(entity: Entity) {
    if (entity) {
      this.router.navigate(['/entity/' + entity.id]);
    }
  }


  private new() {
    this.router.navigate(['entity/']);
  }

  private delete(entity: Entity) {
    if (confirm("Are you sure?")) {
      this.entitiesService.delete(entity.id).subscribe(
        data => {
          console.log(data);
          this.find();
        },
        error => console.log(error));
    }
  }
}