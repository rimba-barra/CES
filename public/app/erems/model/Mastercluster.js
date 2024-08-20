Ext.define('Erems.model.Mastercluster', {
	extend: 'Ext.data.Model',
	alias: 'model.masterclustermodel',

	idProperty: 'cluster_id',

	fields: [
		{
			name: 'cluster_id',
			type: 'int'
		},
		{
			name: 'code',
			type: 'string'
		},
		{
			name: 'img_siteplant',
			type: 'string'
		}, {
			name: 'img_legendlayer',
			type: 'string'
		}, {
			name: 'siteplan_svg',
			type: 'string'
		}, {
			name: 'cluster',
			type: 'string'
		},
		{
			name: 'description',
			type: 'string'
		},
		{
			name: 'active',
			type: 'int'
		},
		{
			name: 'detail'
		},
		{
			name: 'edit_image_flag',
			type: 'int'
		},
		{
			name: 'Addby',
			type: 'string'
		},
		{
			name: 'Modiby',
			type: 'string'
		}, {
			name: 'Addon',
			type: 'string'
		},
		{
			name: 'Modion',
			type: 'string'
		},
		{
			name: 'modi_user_name'
		},
		{
			name: 'user_name'
		}
	]
});