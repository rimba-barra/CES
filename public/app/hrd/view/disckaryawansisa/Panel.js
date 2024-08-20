Ext.define('Hrd.view.disckaryawansisa.Panel', {
        extend: 'Ext.panel.Panel',
        alias: 'widget.disckaryawansisapanel',	
        itemId: 'disckaryawansisapanel',	
        layout: 'border',
        bodyPadding: 2,	
	initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
		{
                    xtype: 'disckaryawansisaformsearch',
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
                    xtype: 'disckaryawansisagrid',
                    store: 'Disckaryawansisa',
                    region: 'center'
                }
            ]
        });		
        me.callParent(arguments);
    }
});