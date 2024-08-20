Ext.define('Erems.store.Popupkomisi', {
	extend      : 'Ext.data.Store',
	alias       : 'store.popupkomisi',
	requires    : [ 'Erems.model.Popupkomisi' ],
	constructor : function(cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
			storeId : 'Popupkomisi',
			model   : 'Erems.model.Popupkomisi',
			proxy   : {
				type          : 'ajax',
				actionMethods : {
					read    : 'POST',
					create  : 'POST',
					update  : 'POST',
					destroy : 'POST'
				},
				api : {
					read    : 'erems/popupmaster/read',
					create  : 'erems/popupmaster/create',
					update  : 'erems/popupmaster/update',
					destroy : 'erems/popupmaster/delete'
				},
				reader : {
					type       : 'json',
					idProperty : 'komisi_klaim_id',
					root       : 'data'
				},
				extraParams : {
					popup_type : 'popupkomisi'
				},
				writer : {
					type   : 'json',
					encode : true,
					root   : 'data'
				}
			}
		}, cfg)]);
	}
});