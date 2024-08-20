Ext.define('Cashier.view.rcash.Panel', {
    extend: 'Ext.panel.Panel',
    requires: ['Cashier.view.rcash.Grid',
        'Cashier.view.rcash.Gridrev',
        'Cashier.view.rcash.FormSearch'
    ],
    alias: 'widget.rcashpanel',
    itemId: 'RcashPanel',
    bodyStyle: 'background-color:#dfe8f5;',
    layout: {
        type: 'border'
    },
    gridPanelName: 'rcashgrid',
    gridDetail: 'rcashgridrev',
    formSearchPanelName: 'rcashformsearch',
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
                            align: 'stretch',
                            pack: 'start',
                        },
                    },
                    items: [
                        {
                            xtype: me.gridPanelName,
                            height: 250,
                        },
                        {
                            xtype: 'tbspacer',
                            height: 0
                        },
                        {
                            xtype: me.gridDetail,
                            id: 'gridrcashdetail',
                            height: 250,
                        },
                    ]
                },
            ],
        });

        me.callParent(arguments);
    }
});

