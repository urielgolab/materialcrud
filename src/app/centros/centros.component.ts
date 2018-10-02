import { Component, OnInit, ViewChild, TemplateRef } from '@angular/core';
import { Router } from '@angular/router';

import { Centro } from '../../domain/centro';
import { CentrosService } from "../services/centros.service";
import { MatTableDataSource } from '@angular/material';
import { MaterialTableColumn } from '../shared/material-table/material-table.component';
import { Subscription } from 'rxjs/Subscription';
import { LoaderService } from '../shared/loader/loader.service';

import * as Moment from 'Moment';

@Component({
  selector: 'app-centros',
  templateUrl: './centros.component.html',
  styleUrls: ['./centros.component.css']
})
export class CentrosComponent implements OnInit {

  centros: Centro[] = [];
  centro: Centro = null;
  @ViewChild('columnDelete') columnDelete: TemplateRef<any>;
  @ViewChild('columnEdit') columnEdit: TemplateRef<any>;

  dataSource: MatTableDataSource<Centro> = new MatTableDataSource();
  cols: MaterialTableColumn[];
  CentrosSub: Subscription;

  constructor(
    private router: Router,
    private centrosService: CentrosService,
    private loaderService: LoaderService
  ) { }

  ngOnInit() {
    this.setColumns();
    this.find();
  }

  setColumns () {
    this.cols = [
      { prop: 'key', name: '#', width: '60px'},
      { prop: 'nombre', name: 'Name', width: '120px'},
      { prop: 'activo', name: 'Active', width: '60px', cellTransform: (cell, row) => row.activo ? "True" : "False"},
      { prop: 'fechaAlta', name: 'Date Add', width: '120px',
          cellTransform: (cell, row) => (row.fechaAlta) ? Moment(row.fechaAlta).format('DD/MM/YYYY HH:mm') : '',
          cellOrder: (cell, row) => (cell) ? Moment(cell).format('YYYY-MM-DD HH:mm') : '' },
      { prop: 'editar', name: 'Edit', width: '40px', cellTemplate: this.columnEdit },
      { prop: 'eliminar', name: 'Delete', width: '45px', cellTemplate: this.columnDelete }
    ];
  }

  public find() {
    this.dataSource.data = [];
    this.centros = [];

    this.loaderService.push();
    this.CentrosSub = this.centrosService.findAll().subscribe(data => {
      for(let id in data) {
        let elem:Centro = data[id];
        elem.id = id;
        this.centros.push(elem);
      }

      this.dataSource.data = this.centros;
      // this.recalculate.emit();
    }, (err) => {
      this.loaderService.pop();
    }, () => {
      this.loaderService.pop();
    });
  }

  onCentroSelected(centro: Centro) {
    if (centro) {
      this.router.navigate(['/centro/' + centro.id]);
    }
  }

  private edit(centro: Centro) {
    if (centro) {
      this.router.navigate(['/centro/' + centro.id]);
    }
  }


  private new() {
    this.router.navigate(['centro/']);
  }

  private delete(centro: Centro) {
    if (confirm("Are you sure?")) {
      this.centrosService.delete(centro.id).subscribe(
        data => {
          console.log(data);
          this.find();
        },
        error => console.log(error));
    }
  }
}
