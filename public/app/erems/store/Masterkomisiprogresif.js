Ext.define('Erems.store.Masterkomisiprogresif', {
	extend: 'Ext.data.Store',
	alias: 'store.masterkomisiprogresifstore',
	requires: [
		'Erems.model.Masterkomisiprogresif'
	],
	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId: 'MasterkomisiprogresifStore',
				model: 'Erems.model.Masterkomisiprogresif',
				proxy: {
					type: 'ajax',
					actionMethods: {
						read: 'POST',
						create: 'POST',
						update: 'POST',
						destroy: 'POST'
					},
					api: {
						read: 'erems/masterkomisiprogresif/read',
						create: 'erems/masterkomisiprogresif/create',
						update: 'erems/masterkomisiprogresif/update',
						destroy: 'erems/masterkomisiprogresif/delete'
					},
					reader: {
						type: 'json',
						idProperty: 'komisi_progresif_id',
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