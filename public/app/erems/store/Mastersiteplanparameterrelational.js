Ext.define('Erems.store.Mastersiteplanparameterrelational', {
	extend: 'Ext.data.Store',
	alias: 'store.mastersiteplanparameterrelationalstore',
	requires: [
		'Erems.model.Mastersiteplanlegenddetail'
	],
	constructor: function (cfg) {
		var me = this;
		cfg = cfg || {};
		me.callParent([Ext.apply({
				storeId: 'MastersiteplanparameterrelationalStore',
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
						idProperty: 'relational_id',
						root: 'data'
					},
					extraParams: {
						mode: 'tableRelational'
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