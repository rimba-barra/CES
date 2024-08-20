Ext.define('Cashier.view.tloan.Panel', {
    extend: 'Ext.panel.Panel',
    requires: ['Cashier.view.tloan.Grid', 'Cashier.view.tloan.FormSearch'],
    alias: 'widget.tloanpanel',
    itemId: 'TloanPanel',
    bodyStyle: 'background-color:#dfe8f5;',
    layout: {
        type: 'vbox', // Arrange child items vertically
        align: 'stretch', // Each takes up full width
        padding: 2
    },
    gridPanelName: 'tloangrid',
    formSearchPanelName: 'tloanformsearch',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'fieldcontainer',
                    align: 'right',
                    region: 'center',
                    bodyBorder: false,
                    border: false,
                     defaults: {                        
                        layoutConfig: {
                            layout: 'hbox',
                            align : 'stretch',
                            pack  : 'start',
                        },
                    },
                    items: [
                        {
                            xtype: 'fieldcontainer',
                            layout: 'vbox',
                            border: false,
                            items: [
                                {
                                    xtype: me.formSearchPanelName,
                                    region: 'nort',
                                    split: true,                                   
                                    collapsed: true,
                                    collapsible: true,
                                    iconCls: 'icon-search',
                                    title: 'Search'
                                },
                                {
                                    xtype: me.gridPanelName,
                                    region: 'center',                                   
                                    height: 500,
                                },
                            ]
                        },                       
                    ]
                },
            ],
        });

        me.callParent(arguments);
    }
});

