Ext.define('Cashier.model.Journalsalesbooking', {
    extend: 'Ext.data.Model',
    alias: 'model.journalsalesbookingmodel',
    idProperty: 'unit_id',
    fields: [
        {name: 'unit_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'projectname', type: 'string'},
        {name: 'ptname', type: 'string'},
        {name: 'cluster', type: 'string'},
        {name: 'unit_number', type: 'string'},
        {name: 'paymentmethod', type: 'string'},
        {name: 'productcategory', type: 'string'},
        {name: 'pricetype', type: 'string'},
        {name: 'sales_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'unit_price', type: 'number'},
        {name: 'total_payment', type: 'number'},
        {name: 'payment_percentage', type: 'number'},
        {name: 'construction_percentage', type: 'number'},
        {name: 'handover_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'booking_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'}
    ]
});