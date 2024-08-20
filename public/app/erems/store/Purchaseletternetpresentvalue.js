Ext.define('Erems.store.Purchaseletternetpresentvalue', {
	extend: 'Ext.data.Store',
	alias: 'store.purchaseletternetpresentvaluestore',
	requires: [
		'Erems.model.Purchaseletter'
	],
	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId: 'PurchaseletternetpresentvalueStore',
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
						read    : 'erems/netpresentvalue/read',
						create  : 'erems/netpresentvalue/create',
						update  : 'erems/netpresentvalue/update',
						destroy : 'erems/netpresentvalue/delete'
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