/*An Attribute directive changes 
//the appearance or behavior of a DOM element.
<!-- Creating custom validator-->
<!-- video 25-->
<!-- video 26-->
*/

import {Validator, AbstractControl, NG_VALIDATORS} from '@angular/forms';
import { Directive, Input } from '@angular/core';

@Directive({
selector: '[appSelectValidator]',
providers: [{
    provide: NG_VALIDATORS,
    useExisting: SelectRequiredValidatorDirective,
    multi: true
}]
})
export class SelectRequiredValidatorDirective implements Validator {
   // Here defaultValue is alias of appSelectValidator
   @Input('appSelectValidator') defaultValue: string;
  validate(control: AbstractControl): {[key: string]: any} | null {
      // return  control.value === 'select' ? {'defaultSelected': true} : null;
      return  control.value === this.defaultValue ? {'defaultSelected': true} : null;
    }

}