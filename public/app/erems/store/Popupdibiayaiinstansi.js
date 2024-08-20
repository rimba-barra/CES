Ext.define('Erems.store.Popupdibiayaiinstansi', {
	extend      : 'Ext.data.Store',
	alias       : 'store.popupdibiayaiinstansistore',
	requires    : [ 'Erems.model.Popupmaster' ],
	constructor : function(cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
			storeId : 'PopupdibiayaiinstansiStore',
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
					read    : 'erems/popupmaster/read'
				},
				reader : {
					type       : 'json',
					idProperty : 'purchaseletter_id',
					root       : 'data'
				},
				extraParams : {
					popup_type : 'dibiayaiinstansi'
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