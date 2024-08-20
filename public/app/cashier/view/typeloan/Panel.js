Ext.define('Cashier.view.typeloan.Panel', {
    extend: 'Ext.panel.Panel',
    requires: ['Cashier.view.typeloan.Grid', 'Cashier.view.typeloan.Griddetail', 'Cashier.view.typeloan.FormSearch'],
    alias: 'widget.typeloanpanel',
    itemId: 'TypeloanPanel',
    bodyStyle: 'background-color:#dfe8f5;',
    layout: {
        type: 'border'
    },
    gridPanelName: 'typeloangrid',
    gridDetail: 'typeloandetailgrid',
    formSearchPanelName: 'typeloanformsearch',
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
                            height: 300,
                        },
                         {
                            xtype: 'tbspacer',
                            height:40,
                        },
                        {
                            xtype: me.gridDetail,
                            id: 'gridtypeloandetail',                            
                            height: 200,
                            hidden:false,
                        },
                    ]
                },
            ],
        });

        me.callParent(arguments);
    }
});

