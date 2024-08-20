Ext.define('Masterdata.view.sistemdocumentnumbering.Panel', {
    extend: 'Ext.panel.Panel',
	
    alias: 'widget.SistemdocumentnumberingPanel',	
	itemId: 'SistemdocumentnumberingPanel',
	
    requires: [
        'Masterdata.view.sistemdocumentnumbering.FormSearch',
        'Masterdata.view.sistemdocumentnumbering.Grid'
    ],	
	
    layout: 'border',
    bodyPadding: 2,
	
	initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
				{
                    xtype: 'SistemdocumentnumberingFormSearch',
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
                    xtype: 'SistemdocumentnumberingGrid',
					store: 'Sistemdocumentnumbering',
                    region: 'center'
                }
			]
        });		
        me.callParent(arguments);
    }
});