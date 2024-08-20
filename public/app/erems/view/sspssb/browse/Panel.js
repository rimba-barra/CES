Ext.define('Erems.view.sspssb.browse.Panel',{
    extend:'Ext.panel.Panel',
    layout: {
        type: 'border'
    },
    requires:['Erems.view.sspssb.browse.Grid','Erems.view.sspssb.browse.FormSearch'],
    alias:'widget.sspssbbrowsepanel',
    height:300,
    gridPanelName : 'sspssbbrowsegrid',
    formSearchPanelName:'sspssbbrowseformsearch',
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