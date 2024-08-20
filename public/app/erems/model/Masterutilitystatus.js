Ext.define('Erems.model.Masterutilitystatus', {
    extend: 'Ext.data.Model',
    alias: 'model.masterutilitystatusmodel',
        
    idProperty: 'utilitystatus_id',

    fields: [
        {name: 'utilitystatus_id',status: 'int'},
		{name: 'utilitystatus',status: 'string'}
    ]
});