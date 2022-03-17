export interface Invoice{
    counter: Number,
    addres: String,
    serialNr: String,
    date: String,
    invoiceType: String,
    products: [{
        nr: String,
        description: String,
        msrUnit: String,
        quantity: Number,
        price: Number,
        ddv: Number,
        priceWithoutDDV: Number,
        priceWithDDV: Number,
    }],
    total: Number,
    totalDDV: Number,
    payment: Number
}