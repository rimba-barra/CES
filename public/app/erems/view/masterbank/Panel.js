Ext.define('Erems.view.masterbank.Panel', {
    extend: 'Ext.panel.Panel',
	
    alias: 'widget.MasterbankPanel',	
	itemId: 'MasterbankPanel',
	
    layout: 'border',
    bodyPadding: 2,
	
	initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
				{
                    xtype: 'MasterbankFormSearch',
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
                    xtype: 'MasterbankGrid',
					store: 'Masterbank',
                    region: 'center'
                }
			]
        });		
        me.callParent(arguments);
    }
});