Ext.define('Erems.library.box.view.Panel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.templateviewpanel',

    requires: [],

    itemId: 'TemplateViewPanel',
    layout: {
        type: 'border'
    },
    gridPanelName : 'gridpanelname',
    formSearchPanelName:'formsearchpanelname',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    
                    xtype: me.formSearchPanelName,
                    region: 'west',
                    split: true,
                    maxWidth: 500,
                    minWidth: 300,
                    width: 300,
                    collapsed: true,
                    collapsible: true,
                    iconCls: 'icon-search',
                    title: 'Search'
                },
                {
                    // xtype:'panel',
                     //html:'hello'
                    xtype: me.gridPanelName,
                    region: 'center'
                }
            ]
        });

        me.callParent(arguments);
    }

});