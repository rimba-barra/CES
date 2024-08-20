Ext.define('Erems.store.Informasitagihandetailschedule', {
	extend      : 'Ext.data.Store',
	alias       : 'store.informasitagihandetailschedulestore',
	requires    : ['Erems.model.Informasitagihandetailschedule'],
	constructor : function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId : 'InformasitagihandetailscheduleStore',
				model   : 'Erems.model.Informasitagihandetailschedule',
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
						idProperty : 'tagihan_detail_schedule_id',
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