Ext.define('Cashier.view.pemutihan.Panel',{
    extend:'Cashier.library.template.view.Panel',
    width:'500',
    requires:['Cashier.view.pemutihan.PemutihanGrid','Cashier.view.pemutihan.PemutihanpaidGrid','Cashier.view.pemutihan.FormSearch'],
    alias:'widget.pemutihanpanel',
    itemId:'PemutihanPanel',
    gridPanelName:'pemutihangrid',
    gridPanelName2:'pemutihanpaidgrid',
     features: [{ftype:'grouping'}],
    formSearchPanelName:'pemutihanformsearch',
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
                    items:[
                        {
                        xtype: me.gridPanelName,
                        closable:false,
                        name: 'pemutihangrid',
                        title:'Unpaid '
                    },
                    {
                        xtype: me.gridPanelName2,
                        closable:false,
                        name: 'pemutihanpaidgrid',
                        itemId: 'pemutihanpaidgridId',
                        title:'Paid',
                        
                        
                    }
                    ]       
            },
            
            ]
        });

        me.callParent(arguments);
    }
});
