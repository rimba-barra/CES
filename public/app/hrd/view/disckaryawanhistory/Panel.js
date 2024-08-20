Ext.define('Hrd.view.disckaryawanhistory.Panel', {
        extend: 'Ext.panel.Panel',
        alias: 'widget.disckaryawanhistorypanel',	
        itemId: 'disckaryawanhistorypanel',	
        layout: 'border',
        bodyPadding: 2,	
	initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
		{
                    xtype: 'disckaryawanhistoryformsearch',
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
                    xtype: 'disckaryawanhistorygrid',
                    store: 'Disckaryawanhistory',
                    region: 'center'
                }
            ]
        });		
        me.callParent(arguments);
    }
});