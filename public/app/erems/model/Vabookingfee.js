Ext.define('Erems.model.Vabookingfee', {
    extend: 'Ext.data.Model',
    alias: 'model.VabookingfeeModel',

    idProperty: 'bookingfee_id',

    fields: [
        {
            name: 'bookingfee_id',
            type: 'int'
        },
        {
            name: 'nomor_va',
            type: 'int'
        },
        // added by rico 17062022
        {
            name: 'nomor_vamandiri',
            type: 'string'
        },
        {
            name: 'customer_name',
            type: 'string'
        },
        {
            name: 'amount',
            type: 'double'
        },
        {
            name: 'status',
            type: 'boolean'
        },
        {
            name: 'notes',
            type: 'string'
        },
        {
            name: 'modion',
            type: 'date', 
            dateFormat: 'Y-m-d H:i:s.u'
        },
        {
            name: 'modifiedby',
            type: 'string'
        },
        {
            name: 'receipt_no',
            type: 'string'
        },
        {
            name: 'amount_type',
            type: 'float'
        },
        {
            name: 'payment_va',
            type: 'string'
        },
        {
            name: 'paymentmethod',
            type: 'string'
        },
        {
            name: 'payment_addby_name',
            type: 'string'
        },
        {
            name: 'payment_date',
            type: 'date', 
            dateFormat: 'Y-m-d H:i:s.u'
        },
    ]
});