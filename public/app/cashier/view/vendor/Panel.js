Ext.define('Cashier.view.vendor.Panel', {
    extend: 'Ext.panel.Panel',
    requires: ['Cashier.view.vendor.Grid', 'Cashier.view.vendor.GridNoteview', 'Cashier.view.vendor.FormSearch'],
    alias: 'widget.vendorpanel',
    itemId: 'VendorPanel',
    bodyStyle: 'background-color:#dfe8f5;',
    layout: {
        type: 'border'
    },
    gridPanelName: 'vendorgrid',
    gridDetail: 'vendornoteviewgrid',
    formSearchPanelName: 'vendorformsearch',
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
                            height:40
                        },
                        {
                            xtype: 'tabpanel',
                            itemId: 'tabadditionalinformationview',
                            name: 'panel',
                            activeTab: 0,
                            layout: 'hbox',
                            flex: 1,
                            id: 'tabadditionalinformationview',
                            items: [
                                {
                                    xtype: 'vendorbankviewgrid',
                                    title: 'Bank Information',
                                    itemId: 'fd_vendorbankviewgrid',
                                    name: 'vendorbankviewgrid',
                                    width: '98%',
                                    height: 200
                                },
                                {
                                    xtype: 'vendoremailviewgrid',
                                    title: 'Email',
                                    itemId: 'fd_vendoremailviewgrid',
                                    name: 'vendoremailviewgrid',
                                    width: '98%',
                                    height: 200
                                },
                                {
                                    xtype: me.gridDetail,
                                    title: 'Vendor/Partner Notes',
                                    id: 'griddetailnote',    
                                    itemId: 'fd_griddetailnote',
                                    width: '98%',                        
                                    height: 200,
                                }
                            ]
                        },
                        // {
                        //     xtype: me.gridDetail,
                        //     id: 'griddetailnote',                            
                        //     height: 200,
                        // },
                    ]
                },
            ],
        });

        me.callParent(arguments);
    }
});

