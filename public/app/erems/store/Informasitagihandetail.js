Ext.define('Erems.store.Informasitagihandetail', {
	extend      : 'Ext.data.Store',
	alias       : 'store.informasitagihandetailstore',
	requires    : ['Erems.model.Informasitagihandetail'],
	constructor : function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId : 'InformasitagihandetailStore',
				model   : 'Erems.model.Informasitagihandetail',
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
						idProperty : 'tagihan_detail_id',
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