Ext.define('Cashier.view.postingstepsatu.Panel', {
    extend: 'Ext.panel.Panel',
    requires: ['Cashier.view.postingstepsatu.Grid', 
               'Cashier.view.postingstepsatu.Gridposting', 
               'Cashier.view.postingstepsatu.FormSearch'
           ],
    alias: 'widget.postingstepsatupanel',
    itemId: 'PostingstepsatuPanel',
    bodyStyle: 'background-color:#dfe8f5;',
    layout: {
        type: 'border'
    },
    frame: true,
    autoScroll: true,
    gridPanelName: 'postingstepsatugrid',
    gridDetail: 'postingstepsatugridposting',
    formSearchPanelName: 'postingstepsatuformsearch',
    initComponent: function () {
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
                    xtype: 'fieldcontainer',                    
                    align: 'right',
                    region: 'center',
                    bodyBorder: false,
                    defaults: {                        
                        layoutConfig: {
                            layout: 'vbox',
                            align : 'stretch',
                            pack  : 'start',
                        },
                    },
                    items: [
                        {
                            xtype: me.gridPanelName,
                            height: 280,
                        },  
                        {
                            xtype: 'tbspacer',
                            height:0
                        },
                        {
                            xtype: me.gridDetail,
                            id: 'gridpostingstepsatudetail',                            
                            height: 280,
                        },
                    ]
                },
            ],
        });

        me.callParent(arguments);
    }
});

