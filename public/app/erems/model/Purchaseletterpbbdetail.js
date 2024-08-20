Ext.define('Erems.model.Purchaseletterpbbdetail', {
    extend: 'Ext.data.Model',
    alias: 'model.purchaseletterpbbdetailmodel',
    idProperty: 'purchaseletter_pbb_id',
    fields: [
		{name: 'purchaseletter_pbb_id', type: 'int'},
		{name: 'purchaseletter_id', type: 'int'},	
		{name: 'unit_id', type: 'string'},
		{name: 'nop_dibayar', type: 'decimal'},
		{name: 'tahun', type: 'int'},
		{name: 'pokok', type: 'decimal'},
		{name: 'denda', type: 'decimal'},
		{name: 'total', type: 'decimal'},
		{name: 'tahun_bayar', type: 'int'},
		{name: 'keterangan', type: 'string'},
		{name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'addby', type: 'int'},
		{name: 'deleted', type: 'boolean'}
    ]
});