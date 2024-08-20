Ext.define('Erems.store.Mastersiteplanparameter', {
	extend: 'Ext.data.Store',
	alias: 'store.mastersiteplanparameterstore',
	requires: [
		'Erems.model.Mastersiteplanlegenddetail'
	],
	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId: 'MastersiteplanparameterStore',
				model: 'Erems.model.Mastersiteplanlegenddetail',
				proxy: {
					type: 'ajax',
					actionMethods: {
						read: 'POST',
						create: 'POST',
						update: 'POST',
						destroy: 'POST'
					},
					api: {
						read: 'erems/mastersiteplanlegend/read',
						create: 'erems/mastersiteplanlegend/create',
						update: 'erems/mastersiteplanlegend/update',
						destroy: 'erems/mastersiteplanlegend/delete'
					},
					reader: {
						type: 'json',
						idProperty: 'siteplanparameter_id',
						root: 'data'
					},
					extraParams: {
						mode: 'siteplanparameter'
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