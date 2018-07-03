import { Validator, NG_VALIDATORS, AbstractControl } from '@angular/forms';
import { Directive } from '@angular/core';

@Directive({
selector: '[appConfirmEqualValidator1]',
providers: [{
    provide: NG_VALIDATORS,
    useExisting: ConfirmEqualValidator1Directive,
    multi: true
}]
})
export class ConfirmEqualValidator1Directive implements Validator {

   validate(passwordGroup: AbstractControl): {[key: string]: any} | null {
     const passwordField = passwordGroup.get('password1');
     const confirmPasswordField = passwordGroup.get('confirmPassword1');
    
     if (passwordField && confirmPasswordField && passwordField.value !== confirmPasswordField.value) {
     return {'notEqual': true};
     }
     return null;
    }
}
