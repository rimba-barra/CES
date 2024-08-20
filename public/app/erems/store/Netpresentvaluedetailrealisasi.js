Ext.define('Erems.store.Netpresentvaluedetailrealisasi', {
	extend      : 'Ext.data.Store',
	alias       : 'store.netpresentvaluedetailrealisasistore',
	requires    : ['Erems.model.Netpresentvaluedetailrealisasi'],
	constructor : function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
			storeId : 'NetpresentvaluedetailrealisasiStore',
			model   : 'Erems.model.Netpresentvaluedetailrealisasi',
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
					idProperty : 'npv_detail_realisasi_id',
					root       : 'data'
				},
				extraParams : {
					mode : 'detail_realisasi'
				},
				writer: {
					type   : 'json',
					encode : true,
					root   : 'data'
				}
			},
		}, cfg)]);
	}
});