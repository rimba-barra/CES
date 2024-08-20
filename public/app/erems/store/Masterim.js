Ext.define('Erems.store.Masterim', {
	extend: 'Ext.data.Store',
	alias: 'store.masterimstore',
	requires: [
		'Erems.model.Masterim'
	],
	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId: 'MasterimStore',
				model: 'Erems.model.Masterim',
				proxy: {
					type: 'ajax',
					actionMethods: {
						read: 'POST',
						create: 'POST',
						update: 'POST',
						destroy: 'POST'
					},
					api: {
						read: 'erems/masterim/read',
						create: 'erems/masterim/create',
						update: 'erems/masterim/update',
						destroy: 'erems/masterim/delete'
					},
					reader: {
						type: 'json',
						idProperty: 'internalmemo_id',
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