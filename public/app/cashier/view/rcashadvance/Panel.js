Ext.define('Cashier.view.rcashadvance.Panel', {
    extend: 'Ext.panel.Panel',
    requires: ['Cashier.view.rcashadvance.Grid', 
               'Cashier.view.rcashadvance.Gridrev', 
               'Cashier.view.rcashadvance.FormSearch'
           ],
    alias: 'widget.rcashadvancepanel',
    itemId: 'RcashadvancePanel',
    bodyStyle: 'background-color:#dfe8f5;',
    layout: {
        type: 'border'
    },
    gridPanelName: 'rcashadvancegrid',
    gridDetail: 'rcashadvancegridrev',
    formSearchPanelName: 'rcashadvanceformsearch',
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
                            height: 200,
                        },  
                        {
                            xtype: 'tbspacer',
                            height:0
                        },
                        {
                            xtype: me.gridDetail,
                            id: 'gridrcashadvancedetail',                            
                            height: 300,
                        },
                    ]
                },
            ],
        });

        me.callParent(arguments);
    }
});

