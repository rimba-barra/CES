Ext.define('Hrd.model.Discstatus', {
    extend: 'Ext.data.Model',
    alias: 'model.discstatustmodel',
    idProperty: 'discstatust_id',
    fields: [
	{name: 'discstatus_id', type: 'int'},  
        {name: 'status_name', type: 'string'}
    ]
});