Ext.define('Erems.store.Permintaankomisi', {
	extend: 'Ext.data.Store',
	alias: 'store.permintaankomisistore',
	requires: [
		'Erems.model.Permintaankomisi'
	],
	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId: 'PermintaankomisiStore',
				model: 'Erems.model.Permintaankomisi',
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