Ext.define('Cashier.view.journalsalesbooking.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.journalsalesbooking.Grid','Cashier.view.journalsalesbooking.FormSearch','Cashier.view.journalsalesbooking.GridPosting'],
    alias:'widget.journalsalesbookingpanel',
    itemId:'JournalsalesbookingPanel',
    gridPanelName:'journalsalesbookinggrid',
    gridPanelName2:'journalsalesbookinggridnew',
    formSearchPanelName:'journalsalesbookingformsearch',
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
                xtype:'tabpanel',
                itemId:'panelkasbonId',
                name:'panel',
                activeTab:0,
                region:'center',
                layout:'fit',
                    items:[{
                                xtype: me.gridPanelName,
                                closable:false,
                                name: 'journalsalesbookinggrid',
                                title:'Data Unbook'
                            },
                            {
                                xtype: me.gridPanelName2,
                                closable:false,
                                name: 'journalsalesbookinggridnew',
                                title:'Data Booked'
                            }
                        ]       
                    },
            
            ]
        });

        me.callParent(arguments);
    }
});
