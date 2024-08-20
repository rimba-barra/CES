Ext.define('Erems.model.Jenisbiayapurchaseletter', {
	extend     : 'Ext.data.Model',
	alias      : 'model.jenisbiayapurchaselettermodel',
	idProperty : 'purchaseletter_id',
	fields     : [
        {name: 'purchaseletter_jenis_biaya_id', type: 'int'},
        {name: 'biaya_purchaseletter_id', type: 'int'},
        {name: 'jenis_biaya', type: 'string'},
        {name: 'is_use', type: 'boolean'}
    ]
});