Ext.define('Erems.model.Installmentpayment', {
    extend: 'Ext.data.Model',
    alias: 'model.installmentpaymentmodel',
    idProperty: 'payment_id',
    fields: [
        {name: 'payment_id', type: 'int'},
        {name: 'payment_no', type: 'string'},
        {name: 'payment_date', type: 'string'},
        {name: 'payment_duedate', type: 'string'},
        {name: 'payment', type: 'string'},
        {name: 'payment_note', type: 'string'},
        {name: 'denda', type: 'string'},
        {name: 'customer_name', type: 'string'},
        {name: 'unit_number', type: 'string'},
        {name: 'cluster', type: 'string'},
        {name: 'cluster_code', type: 'string'},

        //add by anas 16122020
        {name: 'Addby', type: 'string'},
        {name: 'Addon', type: 'string'},
        {name: 'Modiby', type: 'string'},
        {name: 'Modion', type: 'string'}


    ]
});