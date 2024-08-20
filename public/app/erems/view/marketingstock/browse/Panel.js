Ext.define('Erems.view.marketingstock.browse.Panel',{
    extend:'Ext.panel.Panel',
    layout: {
        type: 'border'
    },
    requires:['Erems.view.marketingstock.browse.Grid','Erems.view.marketingstock.browse.FormSearch'],
    alias:'widget.marketingstockbrowsepanel',
    height:300,
    gridPanelName : 'marketingstockbrowsegrid',
    formSearchPanelName:'marketingstockbrowseformsearch',
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