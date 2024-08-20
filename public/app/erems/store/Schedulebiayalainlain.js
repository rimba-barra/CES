Ext.define('Erems.store.Schedulebiayalainlain', {
	extend      : 'Ext.data.Store',
	alias       : 'store.schedulebiayalainlainstore',
	requires    : ['Erems.model.Schedulebiayalainlain'],
	constructor : function(cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
			storeId : 'SchedulebiayalainlainStore',
			model   : 'Erems.model.Schedulebiayalainlain',
			proxy   : {
				type          : 'ajax',
				actionMethods : {
					read    : 'POST',
					create  : 'POST',
					update  : 'POST',
					destroy : 'POST'
				},
				api : {
					read    : 'erems/schedulebiayalainlain/read',
					create  : 'erems/schedulebiayalainlain/create',
					update  : 'erems/schedulebiayalainlain/update',
					destroy : 'erems/schedulebiayalainlain/delete'
				},
				reader : {
					type       : 'json',
					idProperty : 'biayalainlain_id',
					root       : 'data'
				},
				writer : {
					type   : 'json',
					encode : true,
					root   : 'data'
				},
			}
		}, cfg)]);
	}
});