Ext.define('Erems.view.marketingstock.SelectUnitPanel',{
	extend              :'Ext.panel.Panel',
	layout              : { type : 'border' },
	height              :300,
	gridPanelName       : 'selectunitgrid',
	formSearchPanelName :'selectunitformsearch',
	initComponent       : function() {
		var me = this;

		Ext.applyIf(me, {
			items: [
				{
					xtype       : me.formSearchPanelName,
					region      : 'west',
					split       : true,
					maxWidth    : 500,
					minWidth    : 300,
					width       : 300,
					collapsed   : false,
					collapsible : true,
					iconCls     : 'icon-search',
					title       : 'Search'
				},
				{
					xtype  : me.gridPanelName,
					region : 'center'
				}
			]
		});

		me.callParent(arguments);
	}
});

