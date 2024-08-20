Ext.define('Erems.store.Masterpencairankomisi', {
	extend: 'Ext.data.Store',
	alias: 'store.masterpencairankomisistore',
	requires: [
		'Erems.model.Masterpencairankomisi'
	],
	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId: 'MasterpencairankomisiStore',
				model: 'Erems.model.Masterpencairankomisi',
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