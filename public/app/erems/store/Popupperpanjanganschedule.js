Ext.define('Erems.store.Popupperpanjanganschedule', {
	extend      : 'Ext.data.Store',
	alias       : 'store.popupperpanjanganschedulestore',
	requires    : [ 'Erems.model.Popupmaster' ],
	constructor : function(cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
			storeId : 'PopupperpanjanganscheduleStore',
			model   : 'Erems.model.Popupmaster',
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
					idProperty : 'purchaseletter_id',
					root       : 'data'
				},
				extraParams : {
					popup_type : 'perpanjanganschedule'
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