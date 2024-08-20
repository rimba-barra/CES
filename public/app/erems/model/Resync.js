Ext.define('Erems.model.Resync', {
	extend: 'Ext.data.Model',
	alias: 'model.resyncmodel',

	idProperty: 'api_vabca_logs_id',

	fields: [
		{
			name: 'api_vabca_logs_id',
			type: 'int'
		},
		{
			name: 'project_id',
			type: 'string'
		},
		{
			name: 'nomor_va',
			type: 'string'
		},
		{
			name: 'payment_date',
			type: 'string'
		},
		{
			name: 'amount',
			type: 'string'
		},
		{
			name: 'is_resync',
			type: 'string'
		},
		{
			name: 'status',
			type: 'string'
		},
		{
			name: 'module',
			type: 'string'
		},
		{
			name: 'access_time',
			type: 'string'
		},
		{
			name: 'ip',
			type: 'string'
		},
		{
			name: 'method',
			type: 'string'
		},
		{
			name: 'url',
			type: 'string'
		},
		{
			name: 'response',
			type: 'string'
		},
		{
			name: 'query',
			type: 'string'
		},
		{
			name: 'params',
			type: 'string'
		},
		{
			name: 'user_agent',
			type: 'string'
		},
		{
			name: 'resync_name',
			type: 'string'
		},
	]
});