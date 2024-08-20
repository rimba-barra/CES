Ext.define('Erems.model.Changeprice', {
    extend: 'Ext.data.Model',
    alias: 'model.changepricemodel',
    idProperty: 'changeprice_id',
    fields: [
        {name: 'changeprice_id', type: 'int'},
        {name: 'purchaseletter_id', type: 'int'},
        {name: 'landsize', type: 'string'},
        {name: 'landsize_new', type: 'string'},
        {name: 'kelebihan', type: 'string'},
        {name: 'kelebihan_new', type: 'string'},
        {name: 'buildingsize', type: 'string'},
        {name: 'buildingsize_new', type: 'string'},
        {name: 'changeprice_date', type: 'string'},
        {name: 'purchase_date', type: 'string'},
        {name: 'unit_number', type: 'string'},
        {name: 'type_name', type: 'string'},
        {name: 'type_name_new', type: 'string'}
    ]
});