Ext.define('Erems.store.Revenuesharing', {
	extend: 'Ext.data.Store',
	alias: 'store.revenuesharingstore',
	requires: [
		'Erems.model.Revenuesharing'
	],
	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId: 'RevenuesharingStore',
				model: 'Erems.model.Revenuesharing',
				proxy: {
					type: 'ajax',
					actionMethods: {
						read: 'POST',
						create: 'POST',
						update: 'POST',
						destroy: 'POST'
					},
					api: {
						read: 'erems/revenuesharing/read',
						create: 'erems/revenuesharing/create',
						update: 'erems/revenuesharing/update',
						destroy: 'erems/revenuesharing/delete'
					},
					reader: {
						type: 'json',
						idProperty: 'komisi_pencairan_id',
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