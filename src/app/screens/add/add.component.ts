import { Component } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/compat/auth";
import { Firestore } from "@angular/fire/firestore";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router } from "@angular/router";
import { addDoc, collection } from "firebase/firestore";

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
        rate: ['', Validators.required],
    });
    available: boolean = true;

    constructor(private fireauth: AngularFireAuth, private fb: FormBuilder, private router: Router, private store: Firestore){}
    async add(){
        if (this.form.value.brand.trim() == '' || this.form.value.model.trim() == '' || this.form.value.carType.trim() == '' || this.form.value.location.trim() == ''|| this.form.value.numSeat == ''|| this.form.value.rate == '') {
            alert("Incomplete Form");
        }else{
            const acollection = collection(this.store, 'rentals');
            try {
                // Add the current booking to the 'prevBooking' collection
                 await addDoc(acollection, {
                    'brand': this.form.value.brand.trim(),
                    'model': this.form.value.model.trim(),
                    'carType': this.form.value.carType.trim(),
                    'location': this.form.value.location.trim(),
                    'numSeat': this.form.value.numSeat,
                    'rate': this.form.value.rate,
                    'available': this.available,
                });
                alert("Succesfully added new rental");
        }catch (error) {
            console.error('New rental couldnt be  added');
            alert('New rental couldnt be  added');
        }
    }
    }
}