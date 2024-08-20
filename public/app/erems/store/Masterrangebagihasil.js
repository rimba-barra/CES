Ext.define('Erems.store.Masterrangebagihasil', {
	extend: 'Ext.data.Store',
	alias: 'store.masterrangebagihasilstore',
	requires: [
		'Erems.model.Masterrangebagihasil'
	],
	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId: 'MasterrangebagihasilStore',
				model: 'Erems.model.Masterrangebagihasil',
				proxy: {
					type: 'ajax',
					actionMethods: {
						read: 'POST',
						create: 'POST',
						update: 'POST',
						destroy: 'POST'
					},
					api: {
						read: 'erems/masterrangebagihasil/read',
						create: 'erems/masterrangebagihasil/create',
						update: 'erems/masterrangebagihasil/update',
						destroy: 'erems/masterrangebagihasil/delete'
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