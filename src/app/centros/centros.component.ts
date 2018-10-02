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
    this.buscar();
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

  public buscar() {
    this.dataSource.data = [];
    this.centros = [];

    this.loaderService.push();
    this.CentrosSub = this.centrosService.findAll(null).subscribe(data => {
      for(let key$ in data) {
        let elem:Centro = data[key$];
        elem.key$ = key$;
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
      this.router.navigate(['/centro/' + centro.key$]);
    }
  }

  private editar(centro: Centro) {
    if (centro) {
      this.router.navigate(['/centro/' + centro.key$]);
    }
  }


  private nuevo() {
    this.router.navigate(['centro/0']);
  }

  private eliminar(centro: Centro) {
    if (confirm("Are you sure?")) {
      this.centrosService.delete(centro.key$).subscribe(
        data => {
          console.log(data);
          this.buscar();
        },
        error => console.log(error));
    }
  }
}
