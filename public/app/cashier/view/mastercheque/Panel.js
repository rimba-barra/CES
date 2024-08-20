Ext.define('Cashier.view.mastercheque.Panel',{
    extend:'Cashier.library.template.view.Panel',
    width:'500',
    requires:['Cashier.view.mastercheque.Grid','Cashier.view.mastercheque.MasterchequeoutGrid','Cashier.view.mastercheque.FormSearch'],
    alias:'widget.masterchequepanel',
    itemId:'MastercoaconfigPanel',
    gridPanelName:'masterchequegrid',
    gridPanelName2:'masterchequeoutgrid',
     features: [{ftype:'grouping'}],
    formSearchPanelName:'masterchequeformsearch',
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
                            name: 'masterchequegrid',
                            title:'Cheque In '
                        },
                        {
                            xtype: me.gridPanelName2,
                            closable:false,
                            name: 'masterchequeoutgrid',
                            itemId: 'masterchequeoutgridId',
                            title:'Cheque Out',
                            
                            
                        },
                    ]       
            },
            
            ]
        });

        me.callParent(arguments);
    }
});
