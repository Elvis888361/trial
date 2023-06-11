export interface OrderInvoice {
  InvoiceID: number;
  OtsOrderID: number;
  InvoiceNo: string;
  InvoiceDate: string;
  CurrencyID: number;
  CurrAbbvr: string;
  Amount: number;
  SupplierID: number;
  Status: string;
}
