Ext.define('Erems.store.Mastersiteplanlegenddetail', {
	extend: 'Ext.data.Store',
	alias: 'store.mastersiteplanlegenddetailstore',
	requires: [
		'Erems.model.Mastersiteplanlegenddetail'
	],
	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId: 'MastersiteplanlegenddetailStore',
				model: 'Erems.model.Mastersiteplanlegenddetail',
				proxy: {
					type: 'ajax',
					actionMethods: {
						read: 'POST',
						create: 'POST',
						update: 'POST',
						destroy: 'POST'
					},
					api: {
						read: 'erems/mastersiteplanlegend/read',
						create: 'erems/mastersiteplanlegend/create',
						update: 'erems/mastersiteplanlegend/update',
						destroy: 'erems/mastersiteplanlegend/delete'
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