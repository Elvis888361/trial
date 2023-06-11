export interface OtsTender {
  OtsTenderID?: number;
  DateRange: string;
  CargoNo: string;
  SupplierID: number;
  ProductID: number;
  PricingMonth: number;
  TenderMonth: number;
  TenderType: string;
  YearID: number;
  Allocation: number;
  Premium: number;
  PriceMonth: string;
  TMonth: string;
  SupplierName: string;
  ProductName: string;
  YearName: number;
  Vessel: string;
  Actual: number;
  Local: number;
  Transit: number;
  Linefill: number;
  Discharged: boolean;
}

export interface DischargeItem {
  DischargeID: number;
  Quantity: number;
  DepotID: number;
  DepotName: string;
  DestinationID: number;
  DestinationName: string;
  CustomerID: number;
  CustomerName: string;
  Status: string;
}
