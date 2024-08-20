Ext.define('Erems.store.Masterpencairankomisidetail', {
	extend: 'Ext.data.Store',
	alias: 'store.masterpencairankomisidetailstore',
	requires: [
		'Erems.model.Masterpencairankomisidetail'
	],
	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId: 'MasterpencairankomisidetailStore',
				model: 'Erems.model.Masterpencairankomisidetail',
				proxy: {
					type: 'ajax',
					actionMethods: {
						read: 'POST',
						create: 'POST',
						update: 'POST',
						destroy: 'POST'
					},
					api: {
						read: 'erems/masterpencairankomisi/read',
						create: 'erems/masterpencairankomisi/create',
						update: 'erems/masterpencairankomisi/update',
						destroy: 'erems/masterpencairankomisi/delete'
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