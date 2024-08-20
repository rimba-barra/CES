Ext.define('Erems.model.Profitsharingprosesdate', {
    extend: 'Ext.data.Model',
    alias: 'model.profitsharingprosesdatemodel',

    idProperty: 'profitsharing_id',

    fields: [
        {name: 'profitsharing_id', type: 'int'},
		{name: 'doc_no', type: 'string'},
		{name: 'process_date', type: 'date', dateFormat: 'Y-m-d H:i:s.u'},
		{name: 'total_rs', type: 'decimal'}
    ]
});