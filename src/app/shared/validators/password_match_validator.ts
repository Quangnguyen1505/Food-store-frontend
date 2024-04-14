import { AbstractControl } from "@angular/forms"

export const PasswordsMatchValidator = (passwordControlName: string, comfirmPasswordControlName: string) => {
    const validator = (form: AbstractControl) => {
        console.log("hehe", passwordControlName);
        
        const passwordControl = form.get(passwordControlName);
        const comfirmPasswordControl = form.get(comfirmPasswordControlName);

        if (!passwordControl || !comfirmPasswordControl) {
            return;
        }
        
        if(passwordControl.value !== comfirmPasswordControl.value){
            comfirmPasswordControl.setErrors({ notMatch: true });
        }else{
            const errors = comfirmPasswordControl.errors;
            if(!errors) return;

            delete errors.notMatch;
            comfirmPasswordControl.setErrors(errors);
        }
    }

    return validator;
}