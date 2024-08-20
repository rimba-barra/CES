Ext.define('Erems.model.Purchaseletterrevisionhistory', {
    extend: 'Ext.data.Model',
    alias: 'model.purchaseletterrevisionhistorymodel',
    idProperty: 'purchaseletterrevision_id',
    fields: [
		{name: 'purchaseletterrevision_id', type: 'int'},		
		{name: 'revisiontype', type: 'string'},
        {name: 'indeks', type: 'int'},
		{name: 'revision_note', type: 'string'},
		{name: 'is_approve', type: 'boolean'},
		{name: 'approve_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'approve_by_name', type: 'string'}
    ]
});