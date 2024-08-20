Ext.define('Erems.view.masterlrpsharingparameter.Panel', {
	extend: 'Erems.library.template.view.Panel',
	requires: ['Erems.view.masterlrpsharingparameter.Grid', 'Erems.view.masterlrpsharingparameter.FormSearch'],
	alias: 'widget.masterlrpsharingparameterpanel',
	itemId: 'MasterlrpsharingparameterPanel',
	gridPanelName: 'masterlrpsharingparametergrid',
//    formSearchPanelName:''
//    formSearchPanelName:'masterlrpsharingparameterformsearch'
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			items: [
				{
					// xtype:'panel',
					//html:'hello'
					xtype: me.gridPanelName,
					region: 'center'
				}
			]
		});

		me.callParent(arguments);
	}
});
