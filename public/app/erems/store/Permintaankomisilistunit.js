Ext.define('Erems.store.Permintaankomisilistunit', {
	extend: 'Ext.data.Store',
	alias: 'store.permintaankomisilistunitstore',
	requires: [
		'Erems.model.Permintaankomisidetail'
	],
	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId: 'PermintaankomisilistunitStore',
				model: 'Erems.model.Permintaankomisidetail',
				proxy: {
					type: 'ajax',
					actionMethods: {
						read: 'POST',
						create: 'POST',
						update: 'POST',
						destroy: 'POST'
					},
					api: {
						read: 'erems/permintaankomisi/read',
						create: 'erems/permintaankomisi/create',
						update: 'erems/permintaankomisi/update',
						destroy: 'erems/permintaankomisi/delete'
					},
					reader: {
						type: 'json',
						idProperty: 'purchaseletter_id',
						root: 'data'
					},
					extraParams: {
						mode_read: 'listUnit'
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