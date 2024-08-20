Ext.define('Masterdata.view.documentnumbering.Panel', {
    extend: 'Ext.panel.Panel',
	
    alias: 'widget.DocumentnumberingPanel',	
	itemId: 'DocumentnumberingPanel',
	
    requires: [
        'Masterdata.view.documentnumbering.FormSearch',
        'Masterdata.view.documentnumbering.Grid'
    ],	
	
    layout: 'border',
    bodyPadding: 2,
	
	initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
				{
                    xtype: 'DocumentnumberingFormSearch',
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
                    xtype: 'DocumentnumberingGrid',
					store: 'Documentnumbering',
                    region: 'center'
                }
			]
        });		
        me.callParent(arguments);
    }
});