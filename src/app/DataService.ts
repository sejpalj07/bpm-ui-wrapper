import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
 providedIn: 'root'
})
export class DataService {
    private product$ = new BehaviorSubject<any>({});
    selectedProduct$ = this.product$.asObservable();
    private approvlTaskDetails$ = new BehaviorSubject<any>([]);
    selectedapprovlTaskDetails$ = this.approvlTaskDetails$.asObservable();
    private UserData$ = new BehaviorSubject<any>([]);
    selecteUserData$ = this.UserData$.asObservable();
    setProduct(product: any) {
      this.product$.next(product);
    }
    setUserDara(name: any) {
      this.UserData$.next(name);
    }
    setApprovalTaskDetail(approvlTaskDetail: any) {
        this.approvlTaskDetails$.next(approvlTaskDetail);
    }
}