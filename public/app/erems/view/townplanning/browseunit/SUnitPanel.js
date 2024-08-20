Ext.define('Erems.view.townplanning.browseunit.SUnitPanel',{
    extend:'Ext.panel.Panel',
    layout: {
        type: 'border'
    },
    alias:'widget.sunitpanel',
    height:300,
    gridPanelName : 'sunitgrid',
    formSearchPanelName:'sunitformsearch',
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
                    
            
                    xtype: me.gridPanelName,
                    region: 'center'
                }
            ]
        });

        me.callParent(arguments);
    }
});