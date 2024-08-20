Ext.define('Cashier.model.Tloanpayment', {
    extend: 'Ext.data.Model',
    alias: 'model.tloanpaymentmodel',
    idProperty: 'loanpayment_id',
    fields: [
        {name: 'loanpayment_id', type: 'int'},
        {name: 'loan_id', type: 'int'},
        {name: 'type', type: 'string'},       
        {name: 'payment_no', type: 'int'},       
        {name: 'payment_date', type: 'date'}, 
        {name: 'statedata', type: 'string'},       
        {name: 'amount', type: 'number'},       
        {name: 'description', type: 'string'},       
        {name: 'active', type: 'bit'},       
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});