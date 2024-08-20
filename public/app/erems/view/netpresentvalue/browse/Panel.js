Ext.define('Erems.view.netpresentvalue.browse.Panel',{
	extend              : 'Ext.panel.Panel',
	layout              : { type : 'border' },
	requires            : ['Erems.view.netpresentvalue.browse.Grid','Erems.view.netpresentvalue.browse.FormSearch'],
	alias               : 'widget.netpresentvaluebrowsepanel',
	height              : 300,
	gridPanelName       : 'netpresentvaluebrowsegrid',
	formSearchPanelName :'netpresentvaluebrowseformsearch',
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
					collapsed   : true,
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