Ext.define('Erems.store.Jenisbiayapurchaseletter', {
	extend      : 'Ext.data.Store',
	alias       : 'store.jenisbiayapurchaseletter',
	requires    : ['Erems.model.Jenisbiayapurchaseletter'],
	constructor : function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
			storeId : 'JenisbiayapurchaseletterStore',
			model: 'Erems.model.Jenisbiayapurchaseletter',
		}, cfg)]);
	}
});