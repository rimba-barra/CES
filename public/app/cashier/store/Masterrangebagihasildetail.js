Ext.define('Cashier.store.Masterrangebagihasildetail', {
	extend: 'Ext.data.Store',
	alias: 'store.masterrangebagihasildetailstore',
	requires: [
		'Cashier.model.Masterrangebagihasildetail'
	],
	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId: 'MasterrangebagihasildetailStore',
				model: 'Cashier.model.Masterrangebagihasildetail',
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
						idProperty: 'rangebagihasil_detail_id',
						root: 'data'
					},
					extraParams: {
						mode: 'detail'
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