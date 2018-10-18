import { Injectable } from '@angular/core';
import { Entity } from '../../domain/entity';
import { Http, Headers} from '@angular/http';
import 'rxjs/Rx';

@Injectable()
export class EntitiesService {

  private entityURL = "https://angularabm.firebaseio.com/entities";


  findAll(query?: any): any {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.get(this.entityURL + ".json", { headers } ).map( res => {
      return res.json();
    });
  }

  constructor(private http: Http) { }

  save (entity: Entity, id: string) {
    const body = JSON.stringify(entity);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    if (id) {
      return this.http.put(`${ this.entityURL }/${ id }.json`, body, { headers }).map( res => {
        return res.json();
      });
    } else {
      return this.http.post(this.entityURL + ".json", body, { headers }).map( res => {
        return res.json();
      });
    }
  }

  get (id: string): any {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.get(`${ this.entityURL }/${id}.json`, { headers }).map( res => {
      return res.json();
    });
  }

  delete (id: string): any {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.delete(`${ this.entityURL }/${id}.json`, { headers }).map( res => {
      return res.json();
    });
  }
}
