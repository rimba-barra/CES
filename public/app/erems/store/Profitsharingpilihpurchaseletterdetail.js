Ext.define('Erems.store.Profitsharingpilihpurchaseletterdetail', {
	extend: 'Ext.data.Store',
	alias: 'store.profitsharingpilihpurchaseletterdetailstore',
	requires: [
		'Erems.model.Profitsharingpilihpurchaseletterdetail'
	],
	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId: 'ProfitsharingpilihpurchaseletterdetailStore',
				model: 'Erems.model.Profitsharingpilihpurchaseletterdetail',
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
						idProperty: 'purchaseletter_id',
						root: 'data'
					},
					extraParams: {
						mode: 'purchaseletter_detail'
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
