Ext.define('Cashier.view.kasbondeptapprove.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.kasbondeptapprove.Grid','Cashier.view.kasbondeptapprove.FormSearch','Cashier.view.kasbondeptapprove.GridApprove'],
    alias:'widget.kasbondeptapprovepanel',
    itemId:'KasbondeptApprovePanel',
    gridPanelName:'kasbondeptapprovegrid',
    gridPanelName2:'kasbondeptapprovegridnew',
    formSearchPanelName:'kasbondeptapproveformsearch',
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
                itemId:'panelkasbonapproveId',
                name:'panel',
                activeTab:0,
                region:'center',
                layout:'fit',
                    items:[{
                        xtype: me.gridPanelName,
                        closable:false,
                        name: 'kasbondeptapprovegrid',
                        title:'Data UnApprove'
                    },
                    {
                        xtype: me.gridPanelName2,
                        closable:false,
                        name: 'kasbondeptapprovegridnew',
                        itemId: 'kasbondeptapprovegridnewId',
                        title:'Data Approve',
                        
                        
                    }
                    ]       
            },
            
            ]
        });

        me.callParent(arguments);
    }
});
