Ext.define('Erems.store.Purchaseletterverificationapproval', {
	extend: 'Ext.data.Store',
	alias: 'store.purchaseletterverificationapprovalstore',
	requires: [
		'Erems.model.Purchaseletter'
	],
	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId: 'PurchaseletterverificationapprovalStore',
				model: 'Erems.model.Purchaseletter',
				proxy: {
					timeout       : 60000 * 5,
					type          : 'ajax',
					actionMethods : {
						read    : 'POST',
						create  : 'POST',
						update  : 'POST',
						destroy : 'POST'
					},
					api: {
						read    : 'erems/verificationapproval/read',
						create  : 'erems/verificationapproval/create',
						update  : 'erems/verificationapproval/update',
						destroy : 'erems/verificationapproval/delete'
					},
					reader: {
						type       : 'json',
						idProperty : 'purchaseletter_id',
						root       : 'data'
					},
					extraParams: {
						mode : 'purchaseletterlist'
					},
					writer: {
						type   : 'json',
						encode : true,
						root   : 'data'
					}
				}
			}, cfg)]);
	}
});