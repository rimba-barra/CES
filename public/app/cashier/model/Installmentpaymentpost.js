Ext.define('Cashier.model.Installmentpaymentpost', {
    extend: 'Ext.data.Model',
    alias: 'model.installmentpaymentpostmodel',
        
    idProperty: 'payment_id',

    fields: [
        {name: 'payment_id',type: 'int'},
        {name: 'payment_no',type: 'string'},
        {name: 'purchaseletter_id',type: 'int'},
        {name: 'paymentflag_id',type: 'int'},
        {name: 'paymentmethod_id',type: 'int'},
        {name: 'payment_date',type: 'string'},
        {name: 'payment',type: 'float'},
        {name: 'total_payment',type: 'float'},
        {name: 'detail',type: 'object'},
        {name: 'cdn_val',type: 'int'},
        {name: 'cdn_amount',type: 'float'},
        {name: 'admin_fee',type: 'float'},
        {name: 'denda',type: 'float'},
        {name: 'note',type: 'string'},
        {name: 'due_date',type: 'date'},
        {name: 'cair_date',type: 'date'},
        {name: 'is_reference_rejected',type: 'int'},
        {name: 'reference',type: 'string'},
        {name: 'cair_date',type: 'string'},
        {name: 'due_date',type: 'string'}
        
       
    ]
});