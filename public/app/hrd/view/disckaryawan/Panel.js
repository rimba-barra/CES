Ext.define('Hrd.view.disckaryawan.Panel', {
        extend: 'Ext.panel.Panel',
        alias: 'widget.disckaryawanpanel',	
        itemId: 'disckaryawanpanel',	
        layout: 'border',
        bodyPadding: 2,	
	initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
		{
                    xtype: 'disckaryawanformsearch',
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
                    xtype: 'disckaryawangrid',
                    store: 'Disckaryawan',
                    region: 'center'
                }
            ]
        });		
        me.callParent(arguments);
    }
});