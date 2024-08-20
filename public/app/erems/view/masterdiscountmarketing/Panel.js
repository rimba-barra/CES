Ext.define('Erems.view.masterdiscountmarketing.Panel', {
    extend: 'Ext.panel.Panel',
	
    alias: 'widget.MasterdiscountmarketingPanel',	
	itemId: 'MasterdiscountmarketingPanel',
	
    layout: 'border',
    bodyPadding: 2,
	
	initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
				{
                    xtype: 'MasterdiscountmarketingFormSearch',
                    maxWidth: 500,
                    minWidth: 300,
                    width: 300,
                    collapsed: true,
                    collapsible: true,
                    iconCls: 'icon-search',
                    title: 'Search',
                    region: 'west',
                    split: true
                },
				{
                    xtype: 'MasterdiscountmarketingGrid',
					store: 'Masterdiscountmarketing',
                    region: 'center'
                }
			]
        });		
        me.callParent(arguments);
    }
});