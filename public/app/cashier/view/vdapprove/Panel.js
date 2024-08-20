Ext.define('Cashier.view.vdapprove.Panel',{
    extend:'Cashier.library.template.view.Panel',
    requires:['Cashier.view.vdapprove.Grid','Cashier.view.vdapprove.FormSearch','Cashier.view.vdapprove.GridApprove'],
    alias:'widget.vdapprovepanel',
    itemId:'VDApprovePanel',
    gridPanelName:'vdapprovegrid',
    gridPanelName2:'vdapprovegridnew',
    formSearchPanelName:'vdapproveformsearch',
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
                itemId:'panelunapproveId',
                name:'panel',
                activeTab:0,
                region:'center',
//                listeners: {
//                        'tabchange': function(tabPanel, tab) {
//                            //console.log(tabPanel);
//                            console.log(tab.xtype);
//                        }
//                        
//                    },
                layout:'fit',
                    items:[{
                        xtype: me.gridPanelName,
                        closable:false,
                        name: 'vdapprovegrid',
                        title:'Data UnApprove'
                    },
                    {
                        xtype: me.gridPanelName2,
                        closable:false,
                        name: 'vdapprovegridnew',
                        itemId: 'vdapprovegridnewId',
                        title:'Data Approved',
                        
                        
                    }
                    ]       
            },
            
            ]
        });

        me.callParent(arguments);
    }
   
    
    
       

    
    
});
