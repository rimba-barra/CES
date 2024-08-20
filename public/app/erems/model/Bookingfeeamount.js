Ext.define('Erems.model.Bookingfeeamount', {
    extend: 'Ext.data.Model',
    alias: 'model.bookingfeeamountmodel',
        
    idProperty: 'bookingfeeamount_id',

    fields: [
        {name: 'bookingfeeamount_id',type: 'int'},
        {name: 'amount',type: 'double'}
    ]
});