Ext.define('Erems.model.Masterpenerimakomisi', {
    extend: 'Ext.data.Model',
    alias: 'model.masterpenerimakomisimodel',

    idProperty: 'komisi_penerima_id',

    fields: [
        {name: 'komisi_penerima_id', type: 'int'},
		{name: 'project_id', type: 'int'},
		{name: 'pt_id', type: 'int'},
		{name: 'code', type: 'string'},
		{name: 'penerima_komisi', type: 'string'},
    ]
});