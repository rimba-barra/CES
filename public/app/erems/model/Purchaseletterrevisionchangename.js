Ext.define('Erems.model.Purchaseletterrevisionchangename', {
    extend: 'Ext.data.Model',
    alias: 'model.purchaseletterrevisionchangenamemodel',
    idProperty: 'changename_id',
    fields: [
		{name: 'purchaseletterrevision_id', type: 'int'},		
		{name: 'revisiontype', type: 'string'},
		{name: 'changename_id', type: 'int'},
		{name: 'changename_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'customer_lama', type: 'string'},
		{name: 'customer_baru', type: 'string'},
		{name: 'alasan_changename', type: 'string'},
		{name: 'is_approve', type: 'boolean'},
		{name: 'approve_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'approve_by_name', type: 'string'}
    ]
});