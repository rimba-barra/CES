Ext.define('Erems.store.Masterimdetail', {
	extend: 'Ext.data.Store',
	alias: 'store.masterimdetailstore',
	requires: [
		'Erems.model.Masterimdetail'
	],
	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId: 'MasterimdetailStore',
				model: 'Erems.model.Masterimdetail',
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
						idProperty: 'internalmemo_detail_id',
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