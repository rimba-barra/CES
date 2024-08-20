Ext.define('Erems.store.Masterrangebagihasildetail', {
	extend: 'Ext.data.Store',
	alias: 'store.masterrangebagihasildetailstore',
	requires: [
		'Erems.model.Masterrangebagihasildetail'
	],
	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId: 'MasterrangebagihasildetailStore',
				model: 'Erems.model.Masterrangebagihasildetail',
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
						idProperty: 'komisi_pencairan_detail_id',
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