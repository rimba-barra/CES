Ext.define('Cashier.store.Masterrangebagihasil', {
	extend: 'Ext.data.Store',
	alias: 'store.masterrangebagihasilstore',
	requires: [
		'Cashier.model.Masterrangebagihasil'
	],
	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId: 'MasterrangebagihasilStore',
				model: 'Cashier.model.Masterrangebagihasil',
				proxy: {
					type: 'ajax',
					actionMethods: {
						read: 'POST',
						create: 'POST',
						update: 'POST',
						destroy: 'POST'
					},
					api: {
						read: 'cashier/masterrangebagihasil/read',
						create: 'cashier/masterrangebagihasil/create',
						update: 'cashier/masterrangebagihasil/update',
						destroy: 'cashier/masterrangebagihasil/delete'
					},
					reader: {
						type: 'json',
						idProperty: 'rangebagihasil_id',
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