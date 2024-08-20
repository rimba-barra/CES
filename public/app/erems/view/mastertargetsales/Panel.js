Ext.define('Erems.view.mastertargetsales.Panel', {
    extend: 'Ext.panel.Panel',
	
    alias: 'widget.MastertargetsalesPanel',	
	itemId: 'MastertargetsalesPanel',
	
    layout: 'border',
    bodyPadding: 2,
	
	initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
				{
                    xtype: 'MastertargetsalesFormSearch',
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
                    xtype: 'MastertargetsalesGrid',
					store: 'Mastertargetsales',
                    region: 'center'
                }
			]
        });		
        me.callParent(arguments);
    }
});