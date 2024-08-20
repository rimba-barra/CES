Ext.define('Cashier.view.deptprefix.Panel', {
    extend: 'Ext.panel.Panel',
    requires: ['Cashier.view.deptprefix.Grid', 
               'Cashier.view.deptprefix.Griddetail', 
               'Cashier.view.deptprefix.FormSearch'
           ],
    alias: 'widget.deptprefixpanel',
    itemId: 'DeptprefixPanel',
    bodyStyle: 'background-color:#dfe8f5;',
    layout: {
        type: 'border'
    },
    gridPanelName: 'deptprefixgrid',
    gridDetail: 'deptprefixdetailgrid',
    formSearchPanelName: 'deptprefixformsearch',
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
                            id: 'griddeptprefixdetail',                            
                            height: 200,
                        },
                    ]
                },
            ],
        });

        me.callParent(arguments);
    }
});

