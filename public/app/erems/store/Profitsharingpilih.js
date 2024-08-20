Ext.define('Erems.store.Profitsharingpilih', {
	extend: 'Ext.data.Store',
	alias: 'store.profitsharingpilihstore',
	requires: [
		'Erems.model.Profitsharingpilih'
	],
	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId: 'ProfitsharingpilihStore',
				model: 'Erems.model.Profitsharingpilih',
				proxy: {
					type: 'ajax',
					actionMethods: {
						read: 'POST',
						create: 'POST',
						update: 'POST',
						destroy: 'POST'
					},
					api: {
						read: 'erems/profitsharingpilih/read',
						create: 'erems/profitsharingpilih/create',
						update: 'erems/profitsharingpilih/update',
						destroy: 'erems/profitsharingpilih/delete'
					},
					reader: {
						type: 'json',
						idProperty: 'komisi_pencairan_id',
						root: 'data'
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