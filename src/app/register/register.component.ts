import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import swal from "sweetalert2";
import { FirebaseService } from "../firebase.service";
import { Customer } from "../models/customer.model";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"],
})
export class RegisterComponent implements OnInit {
  public loginAccountForm: FormGroup;
  public customers: Array<Customer>;
  public urls = [
    // tslint:disable-next-line:max-line-length
    "https://firebasestorage.googleapis.com/v0/b/stoma-664fe.appspot.com/o/CUSTOMERS%2FZrzut%20ekranu%202023-04-7%20o%2019.22.44.png?alt=media&token=cca8271d-01df-4196-b63a-c5f6f03a5cd9",
    // tslint:disable-next-line:max-line-length
    "https://firebasestorage.googleapis.com/v0/b/stoma-664fe.appspot.com/o/CUSTOMERS%2FZrzut%20ekranu%202023-04-7%20o%2019.23.06.png?alt=media&token=5b7bf45f-1455-487c-a3a7-c079ccdf0324",
    // tslint:disable-next-line:max-line-length
    "https://firebasestorage.googleapis.com/v0/b/stoma-664fe.appspot.com/o/CUSTOMERS%2FZrzut%20ekranu%202023-04-7%20o%2019.23.09.png?alt=media&token=f718397a-786a-4b65-982e-8c41d50ab855",
    // tslint:disable-next-line:max-line-length
    "https://firebasestorage.googleapis.com/v0/b/stoma-664fe.appspot.com/o/CUSTOMERS%2FZrzut%20ekranu%202023-04-7%20o%2019.23.40.png?alt=media&token=ca54307a-ac23-484d-b09d-d8d683f18a56",
    // tslint:disable-next-line:max-line-length
    "https://firebasestorage.googleapis.com/v0/b/stoma-664fe.appspot.com/o/CUSTOMERS%2FZrzut%20ekranu%202023-04-7%20o%2019.23.43.png?alt=media&token=1ba5f39a-5333-4225-acbb-86690ad25d49",
    // tslint:disable-next-line:max-line-length
    "https://firebasestorage.googleapis.com/v0/b/stoma-664fe.appspot.com/o/CUSTOMERS%2FZrzut%20ekranu%202023-04-7%20o%2019.23.52.png?alt=media&token=68dcfafe-4bc7-47bd-91e2-fa5ebbac959a",
    // tslint:disable-next-line:max-line-length
    "https://firebasestorage.googleapis.com/v0/b/stoma-664fe.appspot.com/o/CUSTOMERS%2FZrzut%20ekranu%202023-04-7%20o%2019.24.03.png?alt=media&token=55dc8b22-0209-4e25-a14f-9b93f9fe6676",
    // tslint:disable-next-line:max-line-length
    "https://firebasestorage.googleapis.com/v0/b/stoma-664fe.appspot.com/o/CUSTOMERS%2FZrzut%20ekranu%202023-04-7%20o%2019.24.10.png?alt=media&token=1d572a9e-7c17-4a00-bdd7-26d15f7cc012",
    // tslint:disable-next-line:max-line-length
    "https://firebasestorage.googleapis.com/v0/b/stoma-664fe.appspot.com/o/CUSTOMERS%2FZrzut%20ekranu%202023-04-7%20o%2019.25.24.png?alt=media&token=7d287980-cb2e-4f35-abf2-9a843cbb9123",
    // tslint:disable-next-line:max-line-length
    "https://firebasestorage.googleapis.com/v0/b/stoma-664fe.appspot.com/o/CUSTOMERS%2FZrzut%20ekranu%202023-04-7%20o%2019.25.41.png?alt=media&token=8d09c641-51a2-466b-85b4-6d9eb03da6af",
  ];
  public url = this.urls[0];

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.initForms();
    this.firebaseService.customersData.subscribe((c) => {
      this.customers = c;
    });
  }

  public initForms(): void {
    this.loginAccountForm = new FormGroup({
      email: new FormControl("", Validators.required),
      password: new FormControl("", Validators.required),
      name: new FormControl("", Validators.required),
      surname: new FormControl("", Validators.required),
      address: new FormControl("", Validators.required),
      contact: new FormControl("", Validators.required),
    });
  }

  public submit(): void {
    if (this.loginAccountForm.valid) {
      const customer: Customer = {
        ...this.loginAccountForm.value,
        // tslint:disable-next-line:max-line-length
        imageUrl: this.url,
        imageName: this.loginAccountForm.value.email,
      };
      this.customers.push(customer);
      this.firebaseService
        .getDataBaseRef("customers")
        .set(this.customers)
        .then(() => {
          swal.fire("Rejestracja", "Klient został dodany", "success");
        });
    } else {
      swal.fire("Rejestracja", "Wypełnij Wszystkie Pola", "error");
    }
  }

  public setPicture(e): void {
    this.url = e.target.value;
  }
}
