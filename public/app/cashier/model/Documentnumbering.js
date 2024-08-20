Ext.define('Cashier.model.Documentnumbering', {
    extend: 'Ext.data.Model',
    alias: 'model.documentnumberingmodel',
    idProperty: 'documentnumber_id',
    fields: [
        {name: 'documentnumber_id', type: 'int'},
        {name: 'project_id', type: 'int'},
        {name: 'pt_id', type: 'int'},
		{name: 'year', type: 'int'},
        {name: 'month', type: 'int'},
        {name: 'module_name', type: 'string'},
		{name: 'counter', type: 'int'},
        {name: 'format', type: 'string'},
        {name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'addby', type: 'string'},
        {name: 'modion', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
        {name: 'modiby', type: 'string'},
        {name: 'deleted', type: 'boolean'},
        {name: 'hideparam', type: 'string'},
    ]
});