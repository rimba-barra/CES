Ext.define('Erems.view.pphpayment.Panel', {
    extend: 'Ext.panel.Panel',
	
    alias: 'widget.PphpaymentPanel',	
	itemId: 'PphpaymentPanel',
	
    layout: 'border',
    bodyPadding: 2,
	
	initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
				{
                    xtype: 'PphpaymentFormSearch',
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
                    xtype: 'PphpaymentGrid',
					store: 'Pphpayment',
                    region: 'center'
                }
			]
        });		
        me.callParent(arguments);
    }
});