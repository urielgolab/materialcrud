import { Component, OnInit, Input } from '@angular/core';
import { LoaderService } from './loader.service';
import { Subscriber } from 'rxjs';

@Component({
  selector: 'loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  @Input() message = 'Loading...';
  visible: boolean = false;

  constructor(private loaderService: LoaderService) { }

  ngOnInit() {
    this.loaderService.status.subscribe(x => {
      this.visible = x;
    });
  }

}