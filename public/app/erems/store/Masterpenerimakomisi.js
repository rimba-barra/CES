Ext.define('Erems.store.Masterpenerimakomisi', {
	extend: 'Ext.data.Store',
	alias: 'store.masterpenerimakomisistore',
	requires: [
		'Erems.model.Masterpenerimakomisi'
	],
	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId: 'MasterpenerimakomisiStore',
				model: 'Erems.model.Masterpenerimakomisi',
				proxy: {
					type: 'ajax',
					actionMethods: {
						read: 'POST',
						create: 'POST',
						update: 'POST',
						destroy: 'POST'
					},
					api: {
						read: 'erems/masterpenerimakomisi/read',
						create: 'erems/masterpenerimakomisi/create',
						update: 'erems/masterpenerimakomisi/update',
						destroy: 'erems/masterpenerimakomisi/delete'
					},
					reader: {
						type: 'json',
						idProperty: 'komisi_penerima_id',
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