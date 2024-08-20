Ext.define('Erems.model.Pencairankprcashier', {
    extend: 'Ext.data.Model',
    alias: 'model.pencairankprcashiermodel',
    idProperty: 'purchaseletter_pencairankpr_id',
    fields: [
		{name: 'purchaseletter_pencairankpr_id', type: 'int'},
		{name: 'purchaseletter_id', type: 'int'},
		{name: 'payment_id', type: 'int'},
		{name: 'schedule_id', type: 'int'},
		{name: 'escrow_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'pengajuan_berkas_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'pencairan_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'pencairan_amount', type: 'decimal'},
		{name: 'persen_pencairan', type: 'decimal'},
		{name: 'persen_progress', type: 'decimal'},
		{name: 'plafon_id', type: 'int'},
		{name: 'keterangan', type: 'string'},
		{name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'duedate_escrow', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'addby', type: 'int'},
		{name: 'deleted', type: 'boolean'},
		{name: 'no_voucher', type: 'string'}
    ]
});