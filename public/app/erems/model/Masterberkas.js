Ext.define('Erems.model.Masterberkas', {
    extend: 'Ext.data.Model',
    alias: 'model.masterberkasmodel',
    idProperty: 'berkas_id',
    fields: [
		{name: 'berkas_id', type: 'int'},
                {name: 'code', type: 'string'},
		{name: 'berkas', type: 'string'},
                {name: 'description', type: 'string'},
                

    ]
});