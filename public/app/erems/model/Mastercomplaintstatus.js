Ext.define('Erems.model.Mastercomplaintstatus', {
    extend: 'Ext.data.Model',
    alias: 'model.mastercomplaintstatusmodel',
        
    idProperty: 'complaintstatus_id',

    fields: [
        {name: 'complaintstatus_id',type: 'int'},
		{name: 'complaintstatus',type: 'string'}
    ]
});