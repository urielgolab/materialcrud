import { Injectable } from '@angular/core';
import { Centro } from '../../domain/centro';
import { Http, Headers} from '@angular/http';
import 'rxjs/Rx';


@Injectable()
export class CentrosService {

  centrosURL = "https://angularabm.firebaseio.com/centros.json";
  centroURL = "https://angularabm.firebaseio.com/centros";


  findAll(query: any): any {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.get(this.centrosURL, { headers } ).map( res => {
      console.log(res.json());
      return res.json();
    });
  }

  constructor(private http: Http) { }

  save (centro: Centro, key$: string) {
    const body = JSON.stringify(centro);
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    if (key$ !== "0") {
      return this.http.put(`${ this.centroURL }/${ key$ }.json`, body, { headers }).map( res => {
        console.log(res.json());
        return res.json();
      });
    } else {
      return this.http.post(this.centrosURL, body, { headers }).map( res => {
        console.log(res.json());
        return res.json();
      });
    }
  }

  get (id: string): any {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.get(`${ this.centroURL }/${id}.json`, { headers }).map( res => {
      console.log(res.json());
      return res.json();
    });
  }

  delete (id: string): any {
    const headers = new Headers({
      'Content-Type': 'application/json'
    });

    return this.http.delete(`${ this.centroURL }/${id}.json`, { headers }).map( res => {
      console.log(res.json());
      return res.json();
    });
  }
}
