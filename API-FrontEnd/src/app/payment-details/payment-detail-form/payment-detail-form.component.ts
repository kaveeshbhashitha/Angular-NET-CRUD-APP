import { Component } from '@angular/core';
import { PaymentDetailService } from '../../share/payment-detail.service';
import { NgForm } from '@angular/forms';
import { PaymentDetail } from '../../share/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-detail-form',
  standalone: false,
  
  templateUrl: './payment-detail-form.component.html',
  styleUrl: './payment-detail-form.component.css'
})
export class PaymentDetailFormComponent {
  constructor(public service:PaymentDetailService, private toastr:ToastrService){
  }

  // onSubmit(form:NgForm){
  //   this.service.postPaymentDetail()
  //   .subscribe({
  //     next:res=>{
  //       this.service.list = res as PaymentDetail[];
  //       this.service.resetForm(form);
  //       this.toastr.success('Successfully Inserted', 'Payment Detail Register');
  //     },
  //     error: err => {
  //       console.log(err);
  //       this.toastr.error('Something went wrong!', 'Error');
  //     }
  //   })
  // }

  onSubmit(form: NgForm) {
    if (form.valid) {
      if(this.service.formData.paymentDetalId == 0){
        this.insertRecord(form);
      }else{
        this.updateRecord(form);
      }
    }else{
      this.toastr.warning('Require All fields!', 'Warning');
    }
    
  }

  insertRecord(form: NgForm){
    this.service.postPaymentDetail()
      .subscribe({
        next: res => {
          this.service.list.push(res as PaymentDetail);
          this.service.resetForm(form);
          this.toastr.success('Successfully Inserted', 'Payment Detail Register'); // Toastr success message
        },
        error: err => {
          console.log(err);
          this.toastr.error('Something went wrong!', 'Error');
        }
      });
  }
  updateRecord(form: NgForm){
    this.service.putPaymentDetail()
      .subscribe({
        next: res => {
          this.service.list.push(res as PaymentDetail);
          this.service.resetForm(form);
          this.toastr.info('Successfully Updated', 'Payment Detail Register');
        },
        error: err => {
          console.log(err);
          this.toastr.error('Something went wrong!', 'Error');
        }
      });
  }
}
