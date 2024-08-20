Ext.define('Erems.view.verificationapproval.browse.Panel',{
	extend              : 'Ext.panel.Panel',
	layout              : { type : 'border' },
	requires            : ['Erems.view.verificationapproval.browse.Grid','Erems.view.verificationapproval.browse.FormSearch'],
	alias               : 'widget.verificationapprovalbrowsepanel',
	height              : 300,
	gridPanelName       : 'verificationapprovalbrowsegrid',
	formSearchPanelName :'verificationapprovalbrowseformsearch',
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