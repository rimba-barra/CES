Ext.define('Erems.view.mastergirik.Panel', {
    extend: 'Ext.panel.Panel',
	
    alias: 'widget.MastergirikPanel',	
	itemId: 'MastergirikPanel',
	
    layout: 'border',
    bodyPadding: 2,
	
	initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
				{
                    xtype: 'MastergirikFormSearch',
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
                    xtype: 'MastergirikGrid',
					store: 'Mastergirik',
                    region: 'center'
                }
			]
        });		
        me.callParent(arguments);
    }
});