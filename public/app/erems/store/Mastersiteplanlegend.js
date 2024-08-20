Ext.define('Erems.store.Mastersiteplanlegend', {
	extend: 'Ext.data.Store',
	alias: 'store.mastersiteplanlegendstore',
	requires: [
		'Erems.model.Mastersiteplanlegend'
	],
	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId: 'MastersiteplanlegendStore',
				model: 'Erems.model.Mastersiteplanlegend',
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