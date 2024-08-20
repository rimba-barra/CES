Ext.define('Erems.model.Masterim', {
	extend: 'Ext.data.Model',
	alias: 'model.masterimmodel',

	idProperty: 'internalmemo_id',

	fields: [
		{name: 'internalmemo_id', type: 'int'},
		{name: 'project_id', type: 'int'},
		{name: 'pt_id', type: 'int'},
		{name: 'nomor_im', type: 'string'},
    	{name: "tanggal_im", type: "date", dateFormat: "Y-m-d" },
    	{name: "periode_start", type: "date", dateFormat: "Y-m-d" },
    	{name: "periode_end", type: "date", dateFormat: "Y-m-d" },
		{name: 'description', type: 'string'},
	]
});