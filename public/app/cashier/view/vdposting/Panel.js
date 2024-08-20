Ext.define('Cashier.view.vdposting.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.vdposting.Grid','Cashier.view.vdposting.FormSearch','Cashier.view.vdposting.GridApprove'],
    alias:'widget.vdpostingpanel',
    itemId:'VDPostingPanel',
    gridPanelName:'vdpostinggrid',
    gridPanelName2:'vdpostingapprovegridnew',
    formSearchPanelName:'vdpostingformsearch',
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
                itemId:'panelkasbonapsproveId',
                name:'panel',
                activeTab:0,
                region:'center',
                layout:'fit',
                    items:[{
                        xtype: me.gridPanelName,
                        closable:false,
                        name: 'vdpostinggrid',
                        title:'Data Unposting'
                    },
                    {
                        xtype: me.gridPanelName2,
                        closable:false,
                        name: 'vdpostingapprovegridnew',
                        itemId: 'vdpostingapprovegridnewId',
                        title:'Data Posting',
                        
                        
                    }
                    ]       
            },
            
            ]
        });

        me.callParent(arguments);
    }
});
