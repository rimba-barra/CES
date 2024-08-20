Ext.define('Erems.store.Purchaseletterpermintaankomisi', {
	extend: 'Ext.data.Store',
	alias: 'store.purchaseletterpermintaankomisistore',
	requires: [
		'Erems.model.Purchaseletter'
	],
	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId: 'PurchaseletterpermintaankomisiStore',
				model: 'Erems.model.Purchaseletter',
				proxy: {
					timeout: 60000 * 5,
					type: 'ajax',
					actionMethods: {
						read: 'POST',
						create: 'POST',
						update: 'POST',
						destroy: 'POST'
					},
					api: {
						read: 'erems/permintaankomisi/read',
						create: 'erems/permintaankomisir/create',
						update: 'erems/permintaankomisi/update',
						destroy: 'erems/permintaankomisi/delete'
					},
					reader: {
						type: 'json',
						idProperty: 'purchaseletter_id',
						root: 'data'
					},
					extraParams: {
						mode_read: 'purchaseletterlist'
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