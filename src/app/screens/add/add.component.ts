import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";

@Component({
    selector: 'app-add',
    templateUrl: './add.component.html',
    styleUrls: ['./add.component.css']
})

export class AddComponent{
    form: FormGroup = this.fb.group({
        brand: ['', Validators.required],
        model: ['', Validators.required],
        carType: ['', Validators.required],
        location: ['', Validators.required],
        numSeat: ['', Validators.required],
        rates: ['', Validators.required],
    });

    constructor(private fireauth: AngularFireAuth, private fb: FormBuilder, private router: Router){}
    add(){
    }
}