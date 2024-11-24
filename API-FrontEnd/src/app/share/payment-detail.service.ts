import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { PaymentDetail } from './payment-detail.model';
import { NgForm } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class PaymentDetailService {

  url:string = environment.apiBaseUrl+'/PaymentDetail'
  list:PaymentDetail[] =[];
  formData:PaymentDetail = new PaymentDetail();
  constructor(private http:HttpClient) { }

  refreshList(){
    this.http.get(this.url)
    .subscribe({
      next:res=>{
        this.list = res as PaymentDetail[]
        //console.log(res)
      },
      error:err=>{
        console.log(err)
      }
    })
  }

  postPaymentDetail(){
    return this.http.post(this.url, this.formData)
  }

  putPaymentDetail(){
    return this.http.put(this.url+'/'+this.formData.paymentDetalId, this.formData)
  }

  deletePaymentDetail(id:number){
    return this.http.delete(this.url+'/'+ id)
  }

  resetForm(form:NgForm){
    form.form.reset()
    this.formData = new PaymentDetail()
  }
}
