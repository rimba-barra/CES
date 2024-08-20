Ext.define('Erems.model.Masterutilitytype', {
    extend: 'Ext.data.Model',
    alias: 'model.masterutilitytypemodel',
        
    idProperty: 'utilitytype_id',

    fields: [
        {name: 'utilitytype_id',type: 'int'},
		{name: 'utilitytype',type: 'string'}
    ]
});