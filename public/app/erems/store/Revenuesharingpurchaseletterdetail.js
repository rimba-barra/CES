Ext.define('Erems.store.Revenuesharingpurchaseletterdetail', {
	extend: 'Ext.data.Store',
	alias: 'store.revenuesharingpurchaseletterdetailstore',
	requires: [
		'Erems.model.Revenuesharingpurchaseletterdetail'
	],
	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId: 'RevenuesharingpurchaseletterdetailStore',
				model: 'Erems.model.Revenuesharingpurchaseletterdetail',
				proxy: {
					type: 'ajax',
					actionMethods: {
						read: 'POST',
						create: 'POST',
						update: 'POST',
						destroy: 'POST'
					},
					api: {
						read: 'erems/revenuesharing/read',
						create: 'erems/revenuesharing/create',
						update: 'erems/revenuesharing/update',
						destroy: 'erems/revenuesharing/delete'
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
