Ext.define('Erems.model.Masterimdetail', {
	extend: 'Ext.data.Model',
	alias: 'model.masterimdetailmodel',

	idProperty: 'internalmemo_detail_id',

	fields: [
		{name: 'internalmemo_detail_id', type: 'int'},
		{name: 'internalmemo_id', type: 'int'},
		{name: 'group_id', type: 'int'},
		{name: 'group_name', type: 'string'},
		{name: 'reward_id', type: 'int'},
		{name: 'reward', type: 'string'},
		{name: 'amount', type: 'float'},
		{name: 'notes', type: 'string'},
		{name: 'deleted', type: 'int'},
	]
});