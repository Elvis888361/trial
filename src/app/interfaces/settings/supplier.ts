export interface Supplier {
  SupplierID?: number;
  SupplierName: string;
  IsActive: boolean;
}

export interface SupplierAccount {
  SupplierID: number;
  SupplierName: string;
  CurrencyID: number;
  Balance: number;
}
