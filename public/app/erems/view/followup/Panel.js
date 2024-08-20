Ext.define('Erems.view.followup.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.followup.Grid','Erems.view.followup.FormSearch','Erems.view.followup.GridSp'],
    alias:'widget.followuppanel',
    itemId:'FollowupPanel',
    gridPanelName:'followupgrid',
    formSearchPanelName:'followupformsearch',
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
                    xtype:'panel',
                    layout:'vbox',
                    region: 'center',
                    items:[
                        
                        {
                             xtype: me.gridPanelName,
                             itemId:'FolupGridID',
                             title:'Purchaseletter Information',
                             flex:1,
                             width:950
                        },
                        {
                            xtype:'followupgridsp',
                            itemId:'FolupGridSpID',
                             height:200,
                              width:950
                        }
                    ]
                    // xtype:'panel',
                     //html:'hello'
                 //   xtype: me.gridPanelName,
                  //  region: 'center'
                }
            ]
        });

        me.callParent(arguments);
    }
});
