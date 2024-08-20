Ext.define('Erems.store.Masterperhitungankomisi', {
	extend: 'Ext.data.Store',
	alias: 'store.masterperhitungankomisistore',
	requires: [
		'Erems.model.Masterperhitungankomisi'
	],
	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId: 'MasterperhitungankomisiStore',
				model: 'Erems.model.Masterperhitungankomisi',
				proxy: {
					type: 'ajax',
					actionMethods: {
						read: 'POST',
						create: 'POST',
						update: 'POST',
						destroy: 'POST'
					},
					api: {
						read: 'erems/masterperhitungankomisi/read',
						create: 'erems/masterperhitungankomisi/create',
						update: 'erems/masterperhitungankomisi/update',
						destroy: 'erems/masterperhitungankomisi/delete'
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