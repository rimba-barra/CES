Ext.define('Erems.view.masterpekerjaankonsumen.Panel', {
    extend: 'Ext.panel.Panel',
	
    alias: 'widget.MasterpekerjaankonsumenPanel',	
	itemId: 'MasterpekerjaankonsumenPanel',
	
    layout: 'border',
    bodyPadding: 2,
	
	initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
				{
                    xtype: 'MasterpekerjaankonsumenFormSearch',
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
                    xtype: 'MasterpekerjaankonsumenGrid',
					store: 'Masterpekerjaankonsumen',
                    region: 'center'
                }
			]
        });		
        me.callParent(arguments);
    }
});