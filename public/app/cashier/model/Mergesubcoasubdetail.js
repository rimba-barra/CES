Ext.define('Cashier.model.Mergesubcoasubdetail', {
    extend: 'Ext.data.Model',
    alias: 'model.mergesubcoasubdetailmodel',
    idProperty: 'mergesubcoasubdetail_id',
    fields: [
       
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
        {name: 'subgl_id', type: 'int'},
        {name: 'subcode', type: 'string'},
        {name: 'code', type: 'string'},
        {name: 'code1', type: 'string'},
        {name: 'code2', type: 'string'},
        {name: 'code3', type: 'string'},
        {name: 'code4', type: 'string'},
        {name: 'kelsub', type: 'string'},
        {name: 'description', type: 'string'},
        {name: 'unit_id', type: 'string'},
        {name: 'unit_number', type: 'string'},
         {name: 'projectpt_name', type: 'string'},
       
    ]
});