Ext.define('Erems.store.Profitsharingpilihdetail', {
	extend: 'Ext.data.Store',
	alias: 'store.profitsharingpilihdetailstore',
	requires: [
		'Erems.model.Profitsharingpilihdetail'
	],
	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId: 'ProfitsharingpilihdetailStore',
				model: 'Erems.model.Profitsharingpilihdetail',
				proxy: {
					type: 'ajax',
					actionMethods: {
						read: 'POST',
						create: 'POST',
						update: 'POST',
						destroy: 'POST'
					},
					api: {
						read: 'erems/profitsharingpilih/read',
						create: 'erems/profitsharingpilih/create',
						update: 'erems/profitsharingpilih/update',
						destroy: 'erems/profitsharingpilih/delete'
					},
					reader: {
						type: 'json',
						idProperty: 'profitsharing_id',
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
