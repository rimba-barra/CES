Ext.define('Erems.store.Informasitagihan', {
	extend      : 'Ext.data.Store',
	alias       : 'store.informasitagihanstore',
	requires    : ['Erems.model.Informasitagihan'],
	constructor : function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId : 'InformasitagihanStore',
				model   : 'Erems.model.Informasitagihan',
				proxy   : {
					type          : 'ajax',
					actionMethods : {
						read    : 'POST',
						create  : 'POST',
						update  : 'POST',
						destroy : 'POST'
					},
					api: {
						read    : 'erems/informasitagihan/read',
						create  : 'erems/informasitagihan/create',
						update  : 'erems/informasitagihan/update',
						destroy : 'erems/informasitagihan/delete'
					},
					reader: {
						type       : 'json',
						idProperty : 'tagihan_id',
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