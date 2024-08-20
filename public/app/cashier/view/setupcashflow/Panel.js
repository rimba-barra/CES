Ext.define('Cashier.view.setupcashflow.Panel', {
    extend: 'Ext.panel.Panel',
    requires: ['Cashier.view.setupcashflow.Grid',
        'Cashier.view.setupcashflow.Griddetail',
        'Cashier.view.setupcashflow.FormSearch'
    ],
    alias: 'widget.setupcashflowpanel',
    itemId: 'SetupcashflowPanel',
    bodyStyle: 'background-color:#dfe8f5;',
    layout: {
        type: 'border'
    },
    gridPanelName: 'setupcashflowgrid',
    gridDetail: 'setupcashflowgriddetail',
    formSearchPanelName: 'setupcashflowformsearch',
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
                            height: 400,
                        },
                        {
                            xtype: 'tbspacer',
                            height: 20,
                        },
                        {
                            xtype: me.gridDetail,
                            id: 'setupcashflowgriddetail',
                            height: 300,
                        },
                    ]
                },
            ],
        });

        me.callParent(arguments);
    }
});

