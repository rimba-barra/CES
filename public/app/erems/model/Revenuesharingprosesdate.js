Ext.define('Erems.model.Revenuesharingprosesdate', {
    extend: 'Ext.data.Model',
    alias: 'model.revenuesharingprosesdatemodel',

    idProperty: 'revenuesharing_id',

    fields: [
        {name: 'revenuesharing_id', type: 'int'},
		{name: 'doc_no', type: 'string'},
		{name: 'process_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'total_rs', type: 'decimal'}
    ]
});