Ext.define('Erems.model.Nonlinkpayment', {
    extend: 'Ext.data.Model',
    alias: 'model.nonlinkpaymentmodel',
    idProperty: 'payment_id',
    fields: [
        {name: 'payment_id', type: 'int'},
        {name: 'payment_no', type: 'string'},
        {name: 'payment_date', type: 'string'},
        {name: 'cair_date', type: 'string'},
        {name: 'total_payment', type: 'string'},
        {name: 'name', type: 'string'},
        {name: 'address', type: 'string'},

        //add by anas 16122020
        {name: 'Addby', type: 'string'},
        {name: 'Addon', type: 'string'},
        {name: 'Modiby', type: 'string'},
        {name: 'Modion', type: 'string'}
    ]
});