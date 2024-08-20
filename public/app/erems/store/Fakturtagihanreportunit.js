Ext.define('Erems.store.Fakturtagihanreportunit', {
	extend: 'Ext.data.Store',
	alias: 'store.fakturtagihanreportunitstore',
	requires: [
		'Erems.model.Fakturtagihanreportunit'
	],
	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
			storeId: 'Fakturtagihanreportunitstore',
			model: 'Erems.model.Fakturtagihanreportunit',
			proxy: {
				type: 'ajax',
				actionMethods: {
					read: 'POST',
					create: 'POST',
					update: 'POST',
					destroy: 'POST'
				},
				api: {
					read: 'erems/fakturtagihanreport/read',
					create: 'erems/fakturtagihanreport/create',
					update: 'erems/fakturtagihanreport/update',
					destroy: 'erems/fakturtagihanreport/delete'
				},
				reader: {
					type: 'json',
					root: 'data'
				},
				extraParams: {
					mode_read: 'listUnit'
				},
				writer: {
					type: 'json',
					encode: true,
					root: 'data'
				}
			}
		}, cfg)]);
	}
});