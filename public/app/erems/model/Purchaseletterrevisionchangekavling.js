Ext.define('Erems.model.Purchaseletterrevisionchangekavling', {
    extend: 'Ext.data.Model',
    alias: 'model.purchaseletterrevisionchangekavlingmodel',
    idProperty: 'changekavling_id',
    fields: [
		{name: 'purchaseletterrevision_id', type: 'int'},		
		{name: 'revisiontype', type: 'string'},
		{name: 'changekavling_id', type: 'int'},
		{name: 'changekavling_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		
		{name: 'purchaseletter_old', type: 'string'},
		{name: 'purchaseletter_old_id', type: 'int'},
		{name: 'cluster_old', type: 'string'},
		{name: 'block_old', type: 'string'},
		{name: 'unit_old', type: 'string'},
		{name: 'harga_old', type: 'decimal'},
		
		{name: 'purchaseletter_new', type: 'string'},
		{name: 'purchaseletter_new_id', type: 'int'},
		{name: 'cluster_new', type: 'string'},
		{name: 'block_new', type: 'string'},
		{name: 'unit_new', type: 'string'},
		{name: 'harga_new', type: 'decimal'},
		
		{name: 'alasan_changekavling', type: 'string'},
		{name: 'is_approve', type: 'boolean'},
		{name: 'approve_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'approve_by_name', type: 'string'}
    ]
});