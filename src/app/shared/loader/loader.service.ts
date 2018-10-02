import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/Subject';

@Injectable()
export class LoaderService {

    private visible_counter = 0;
    public status: Subject<boolean> = new Subject<boolean>();

    constructor() { }

    push() {
        this.visible_counter++;
        this.status.next(true);
    }

    pop() {
        this.visible_counter--;
        if (this.visible_counter <= 0) {
            setTimeout(() => {
                this.status.next(false);
                this.visible_counter = 0;
            }, 500);
        }
    }

    isLoading() {
        return this.visible_counter > 0;
    }

}
