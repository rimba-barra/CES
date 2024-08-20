Ext.define('Erems.store.Netpresentvaluedetailstandard', {
	extend      : 'Ext.data.Store',
	alias       : 'store.netpresentvaluedetailstandardstore',
	requires    : ['Erems.model.Netpresentvaluedetailstandard'],
	constructor : function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
			storeId : 'NetpresentvaluedetailstandardStore',
			model   : 'Erems.model.Netpresentvaluedetailstandard',
			proxy   : {
				type          : 'ajax',
				actionMethods : {
					read    : 'POST',
					create  : 'POST',
					update  : 'POST',
					destroy : 'POST'
				},
				api : {
					read    : 'erems/netpresentvalue/read',
					create  : 'erems/netpresentvalue/create',
					update  : 'erems/netpresentvalue/update',
					destroy : 'erems/netpresentvalue/delete'
				},
				reader : {
					type       : 'json',
					idProperty : 'npv_detail_standard_id',
					root       : 'data'
				},
				extraParams : {
					mode : 'detail_standard'
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