Ext.define('Erems.store.Tunggakanipl', {
	extend: 'Ext.data.Store',
	alias: 'store.tunggakaniplstore',
	requires: [
		'Erems.model.Tunggakanipl'
	],
	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId: 'TunggakaniplStore',
				model: 'Erems.model.Tunggakanipl',
				proxy: {
					type: 'ajax',
					actionMethods: {
						read: 'POST',
						create: 'POST',
						update: 'POST',
						destroy: 'POST'
					},
					api: {
						read: 'erems/tunggakanipl/read',
						create: 'erems/tunggakanipl/create',
						update: 'erems/tunggakanipl/update',
						destroy: 'erems/tunggakanipl/delete'
					},
					reader: {
						type: 'json',
						idProperty: 'purchaseletter_id',
						root: 'data'
					},
					writer: {
						type: 'json',
						encode: true,
						root: 'data'
					}
				}
			}, cfg)]);
	}
});