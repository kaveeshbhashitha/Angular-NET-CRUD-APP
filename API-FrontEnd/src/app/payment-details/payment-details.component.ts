import { Component, OnInit } from '@angular/core';
import { PaymentDetailService } from '../share/payment-detail.service';
import { PaymentDetail } from '../share/payment-detail.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-details',
  standalone: false,
  
  templateUrl: './payment-details.component.html',
  styleUrl: './payment-details.component.css'
})
export class PaymentDetailsComponent implements OnInit{
  constructor(public service:PaymentDetailService, private toastr: ToastrService){

  }
  ngOnInit(): void {
    this.service.refreshList();
  }

  populateForm(selectedRecord: PaymentDetail){
    this.service.formData = Object.assign({},selectedRecord);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deletePaymentDetail(id)
        .subscribe({
          next: res => {
            this.service.list = this.service.list.filter(item => item.paymentDetalId !== id); 
            this.toastr.success('Successfully Deleted', 'Payment Detail Register');
          },
          error: err => {
            console.log(err);
            this.toastr.error('Successfully Deleted', 'Payment Detail Register');
          }
        });
    }
  }
}
