Ext.define('Erems.model.Masterakadconfirmationstatus', {
    extend: 'Ext.data.Model',
    alias: 'model.masterakadconfirmationstatusmodel',
        
    idProperty: 'akadconfirmation_status_id',

    fields: [
        {name: 'akadconfirmation_status_id',type: 'int'},
		{name: 'akadconfirmation_status',type: 'string'}
    ]
});