Ext.define('Hrd.view.disckaryawangolongan.Panel', {
        extend: 'Ext.panel.Panel',
        alias: 'widget.disckaryawangolonganpanel',	
        itemId: 'disckaryawangolonganpanel',	
        layout: 'border',
        bodyPadding: 2,	
	initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
		{
                    xtype: 'disckaryawangolonganformsearch',
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
                    xtype: 'disckaryawangolongangrid',
                    store: 'Disckaryawangolongan',
                    region: 'center'
                }
            ]
        });		
        me.callParent(arguments);
    }
});