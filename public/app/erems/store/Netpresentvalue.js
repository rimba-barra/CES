Ext.define('Erems.store.Netpresentvalue', {
	extend      : 'Ext.data.Store',
	alias       : 'store.netpresentvaluestore',
	requires    : ['Erems.model.Netpresentvalue'],
	constructor : function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId : 'NetpresentvalueStore',
				model   : 'Erems.model.Netpresentvalue',
				proxy   : {
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
						idProperty : 'npv_id',
						root       : 'data'
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