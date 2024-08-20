Ext.define('Erems.store.Masterdistchannel', {
	extend: 'Ext.data.Store',
	alias: 'store.masterdistchannelstore',
	requires: [
		'Erems.model.Masterdistchannel'
	],
	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId: 'MasterdistchannelStore',
				model: 'Erems.model.Masterdistchannel',
				proxy: {
					type: 'ajax',
					actionMethods: {
						read: 'POST',
						create: 'POST',
						update: 'POST',
						destroy: 'POST'
					},
					api: {
						read: 'erems/masterdistchannel/read',
						create: 'erems/masterdistchannel/create',
						update: 'erems/masterdistchannel/update',
						destroy: 'erems/masterdistchannel/delete'
					},
					reader: {
						type: 'json',
						idProperty: 'komisi_distributionchannel_id',
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