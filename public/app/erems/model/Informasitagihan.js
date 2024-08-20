Ext.define('Erems.model.Informasitagihan', {
	extend     : 'Ext.data.Model',
	alias      : 'model.informasitagihanmodel',
	idProperty : 'tagihan_id',
	fields     : [
		{name : 'tagihan_id', type : 'int'},
		{name : 'proses_date', type : 'date'},
		{name : 'periode', type : 'int'},
        {name : 'flag_delete', type : 'int'},
	]
});