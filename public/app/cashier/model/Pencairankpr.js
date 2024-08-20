Ext.define('Cashier.model.Pencairankpr', {
    extend: 'Ext.data.Model',
    alias: 'model.pencairankprmodel',
    idProperty: 'purchaseletter_pencairankpr_id',
    fields: [
		{name: 'purchaseletter_pencairankpr_id', type: 'int'},
		{name: 'purchaseletter_id', type: 'int'},
		{name: 'payment_id', type: 'int'},
		{name: 'payment_no', type: 'string'},
		{name: 'schedule_id', type: 'int'},
		{name: 'escrow_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'pengajuan_berkas_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'pencairan_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'pencairan_amount', type: 'decimal'},
		{name: 'persen_pencairan', type: 'decimal'},
		{name: 'persen_progress', type: 'decimal'},
		{name: 'plafon_id', type: 'int'},
		{name: 'keterangan', type: 'string'},
		{name: 'duedate_escrow', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'bilyet_no', type: 'string'},
		{name: 'realisation_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'addon', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'addby', type: 'int'},
		{name: 'deleted', type: 'boolean'}
                //Rizal 16 April 2019
                ,
		{name: 'firstaddon_cair_date',  type: 'date', dateFormat: 'Y-m-d H:i:s.u'}
                ,
		{name: 'kasbank_id',  type: 'int'},
		{name: 'vid', type: 'string'},
                //
    ]
});