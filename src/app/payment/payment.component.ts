import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";

import { StripeService, Elements, StripeCardComponent, ElementsOptions, ElementOptions } from "ngx-stripe";
import { Router } from '@angular/router';

@Component({
  selector: 'app-payment',
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  elements: Elements;
  @ViewChild(StripeCardComponent,{static:true}) card: StripeCardComponent;
  totalPagar: number = 0;
  // optional parameters
  elementsOptions: ElementsOptions = {
    locale: 'es'
  };
  cardOptions: ElementOptions = {
    style: {
      base: {
        iconColor: '#666EE8',
        color: '#31325F',
        lineHeight: '40px',
        fontWeight: 300,
        fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
        fontSize: '18px',
        '::placeholder': {
          color: '#CFD7E0'
        }
      },
      invalid: {
        color: 'red'
      }
    }
  };
 
  stripeTest: FormGroup;
 
  constructor(
    private fb: FormBuilder,
    private stripeService: StripeService,
    private router: Router) {
      console.log(this.router.getCurrentNavigation().extras.state);
    }
 
  ngOnInit() {
    this.stripeTest = this.fb.group({
      name: ['', [Validators.required]]
    });
    this.totalPagar = history.state.mount;
  }
 
  buy() {
    const name = this.stripeTest.get('name').value;
    this.stripeService
      .createToken(this.card.getCard(), { name: name })
      .subscribe(result => {
        if (result.token) {
          // Use the token to create a charge or a customer
          // https://stripe.com/docs/charges
          console.log(result.token.id);
        } else if (result.error) {
          // Error creating the token
          console.log(result.error.message);
        }
      });
  }

}
