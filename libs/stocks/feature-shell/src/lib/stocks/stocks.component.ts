import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PriceQueryFacade } from '@coding-challenge/stocks/data-access-price-query';

@Component({
  selector: 'coding-challenge-stocks',
  templateUrl: './stocks.component.html',
  styleUrls: ['./stocks.component.css']
})
export class StocksComponent implements OnInit {
  stockPickerForm: FormGroup;
  symbol: string;
  today = new Date();
  startDate: Date;
  endDate: Date;

  quotes$ = this.priceQuery.priceQueries$;

  constructor(private fb: FormBuilder, private priceQuery: PriceQueryFacade) {
    this.stockPickerForm = fb.group({
      symbol: [null, Validators.required],
      customDateRange: fb.group({
        startDate: [new Date(this.today.getFullYear(), this.today.getMonth() - 1, this.today.getDate()), Validators.required],
        endDate: [this.today, Validators.required]
      })
    });
  }

  ngOnInit() {}

  fetchQuote() {
    if (this.stockPickerForm.valid) {
      const { symbol, customDateRange } = this.stockPickerForm.value;
      const { startDate, endDate} = customDateRange;
      const diff = endDate.getTime() - startDate.getTime();
      const range = Math.ceil(diff / (1000 * 3600 * 24));
      const month = endDate.getMonth() < 10 ? `0${endDate.getMonth()}` : endDate.getMonth();
      const date = `${endDate.getFullYear()}${month}${endDate.getDate()}`
      this.priceQuery.fetchQuote(symbol, date, range);
    }
  }

  validateStartDate() {
    const { startDate, endDate } = this.stockPickerForm.value.customDateRange;
    if (startDate.getTime() > endDate.getTime()) {
      this.stockPickerForm.controls['customDateRange'].setValue({
        startDate: endDate,
        endDate: endDate
      });
    }
  }
}
