import { Component } from '@angular/core';


@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrls: ['./inscription.component.scss']
})
export class InscriptionComponent {


// create form group
// add formControll in formGroup
// make array of inputs and keys: name, type, key, control : formControll

/**
 * <ng-container *ngFor = "let _ctrl of formMaker" >
 *      <mat-form-field>
 *          <mat-label>{{ _ctrl.name}}</mat-label>
 *          <input matInput [placeholder] = "_ctrl.name" [formControlName] = "_ctrl.key"
 *          name = "_ctrl.name" [type] = "_ctrl.type">
 * 
 *          <mat-error *ngIf = "_ctrl.control?.errors?">
 *            <span *ngIf = "_ctrl.control.errors?.['required']" >
 *              {{ _ctrl.name }} is required</span>
 *            {{ _ctrl.control?.errors | json }}
 *          </mat-error>
 *        </mat-form-field>
 * </ng-container>
 */


  constructor() { }

}
