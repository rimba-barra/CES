Ext.define('Cashier.view.kasbondeptposting.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.kasbondeptposting.Grid','Cashier.view.kasbondeptposting.FormSearch','Cashier.view.kasbondeptposting.GridPosting'],
    alias:'widget.kasbondeptpostingpanel',
    itemId:'KasbondeptPostingPanel',
    gridPanelName:'kasbondeptpostinggrid',
    gridPanelName2:'kasbondeptpostinggridnew',
    formSearchPanelName:'kasbondeptpostingformsearch',
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
                                name: 'kasbondeptpostinggrid',
                                title:'Data Unpaid'
                            },
                            {
                                xtype: me.gridPanelName2,
                                closable:false,
                                name: 'kasbondeptpostinggridnew',
                                itemId: 'kasbondeptpostinggridnewId',
                                title:'Data Paid' 
                            }
                        ]       
                    },
            
            ]
        });

        me.callParent(arguments);
    }
});
