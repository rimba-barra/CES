Ext.define('Erems.store.Revenuesharingprint', {
	extend: 'Ext.data.Store',
	alias: 'store.revenuesharingprintstore',
	requires: [
		'Erems.model.Revenuesharingprint'
	],
	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId: 'RevenuesharingprintStore',
				model: 'Erems.model.Revenuesharingprint',
				proxy: {
					type: 'ajax',
					actionMethods: {
						read: 'POST',
						create: 'POST',
						update: 'POST',
						destroy: 'POST'
					},
					api: {
						read: 'erems/revenuesharingprint/read',
						create: 'erems/revenuesharingprint/create',
						update: 'erems/revenuesharingprint/update',
						destroy: 'erems/revenuesharingprint/delete'
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