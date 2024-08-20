Ext.define('Erems.view.masterupline.Panel', {
    extend: 'Ext.panel.Panel',
	
    alias: 'widget.MasteruplinePanel',	
	itemId: 'MasteruplinePanel',
	
    layout: 'border',
    bodyPadding: 2,
	
	initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
				{
                    xtype: 'MasteruplineFormSearch',
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
                    xtype: 'MasteruplineGrid',
					store: 'Masterupline',
                    region: 'center'
                }
			]
        });		
        me.callParent(arguments);
    }
});