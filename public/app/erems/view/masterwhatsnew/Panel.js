Ext.define('Erems.view.masterwhatsnew.Panel', {
    extend: 'Ext.panel.Panel',
	
    alias: 'widget.MasterwhatsnewPanel',	
	itemId: 'MasterwhatsnewPanel',
	
    layout: 'border',
    bodyPadding: 2,
	
	initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
				{
                    xtype: 'MasterwhatsnewFormSearch',
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
                    xtype: 'MasterwhatsnewGrid',
					store: 'Masterwhatsnew',
                    region: 'center'
                }
			]
        });		
        me.callParent(arguments);
    }
});