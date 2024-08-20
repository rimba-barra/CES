Ext.define('Cashier.model.Mergesubcoadetail', {
    extend: 'Ext.data.Model',
    alias: 'model.mergesubcoadetailmodel',
    idProperty: 'mergesubcoadetail_id',
    fields: [
       {name: 'mergesubcoadetail_id', type: 'int'},
        {name: 'subgl_id', type: 'int'},
        {name: 'subcode', type: 'string'},
         {name: 'projectpt_name', type: 'string'},
        {name: 'code', type: 'string'},
        {name: 'code1', type: 'string'},
        {name: 'code2', type: 'string'},
        {name: 'code3', type: 'string'},
        {name: 'code4', type: 'string'},
        {name: 'kelsub', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'unit_id', type: 'string'},
        {name: 'unit_number', type: 'string'},
    ]
});