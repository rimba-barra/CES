Ext.define('Erems.store.Masterperhitungankomisidetail', {
	extend: 'Ext.data.Store',
	alias: 'store.masterperhitungankomisidetailstore',
	requires: [
		'Erems.model.Masterperhitungankomisidetail'
	],
	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId: 'MasterperhitungankomisidetailStore',
				model: 'Erems.model.Masterperhitungankomisidetail',
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
						idProperty: 'komisi_perhitungan_detail_id',
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