export const environment = {
  //sms api end points
  smsdata: 'https://localhost:7234/api/sms/GetSms',
  sendsms: 'https://localhost:7234/api/sms/SendSms',
  getmessages: 'https://localhost:7234/api/sms/GetMessages',
  getmpesacustomers: 'https://localhost:7234/api/sms/GetMpesaCustomers',
  uploadmpesacustomers: 'https://localhost:7234/api/sms/UploadMpesaCustomers',

  //stations
  getstations: 'https://localhost:7234/api/station/GetStations',

  /*------------------products-------------- */
  getproducts: 'https://localhost:7234/api/product/getproducts',
  addproducts: 'https://localhost:7234/api/product/addproduct',
  editproducts: 'https://localhost:7234/api/product/editproduct/',

  /*------------------suppliers-------------- */
  getsuppliers: 'https://localhost:7234/api/supplier/getsuppliers',
  addsupplier: 'https://localhost:7234/api/supplier/addsupplier',
  editsupplier: 'https://localhost:7234/api/supplier/editsupplier/',
  supplieraccounts: 'https://localhost:7234/api/supplier/getSuppliersAccounts',

  /*-----------------customers-------------- */
  getcustomers: 'https://localhost:7234/api/customer/getcustomers',
  addcustomer: 'https://localhost:7234/api/customer/addcustomer',
  editcustomer: 'https://localhost:7234/api/customer/editcustomer/',

  /*------------------common routes-------------- */
  getmonths: 'https://localhost:7234/api/common/getmonths',
  getyears: 'https://localhost:7234/api/common/getyears',
  getdepots: 'https://localhost:7234/api/common/getdepots',
  getdestinations: 'https://localhost:7234/api/common/getdestinations',
  getcurrency: 'https://localhost:7234/api/currency/GetCurrencies',
  adddepot: 'https://localhost:7234/api/common/adddepot',
  editdepot: 'https://localhost:7234/api/common/editdepot/',
  addcurrency: 'https://localhost:7234/api/currency/addcurrency',
  editcurrency: 'https://localhost:7234/api/currency/editcurrency/',

  /*------------------ots tenders-------------- */
  gettenders: 'https://localhost:7234/api/otstender/gettenders',
  addtender: 'https://localhost:7234/api/otstender/addtender',
  edittender: 'https://localhost:7234/api/otstender/edittender/',
  deltender: 'https://localhost:7234/api/otstender/deletetender/',
  gettenderdischargedetails:
    'https://localhost:7234/api/otstender/getdischargedetailsbyid/',
  postdischargeinstructions:
    'https://localhost:7234/api/otstender/updateDischargeInstructions/',

  /*------------------ots orders-------------- */
  getotsorders: 'https://localhost:7234/api/otsorder/getorders',
  editotsorder: 'https://localhost:7234/api/otsorder/editorder/',
  getorderinvoices:
    'https://localhost:7234/api/otsorder/getInvoiceDetailsById/',
  updateorderinvoices:
    'https://localhost:7234/api/otsorder/updateOrderInvoices/',
  updateouturn: 'https://localhost:7234/api/otsorder/updateOuturnValues/',
  getunpaidorders: 'https://localhost:7234/api/finance/GetUnpaidOrders',
};
