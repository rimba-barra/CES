Ext.define('Erems.view.masterbankkpr.browse.Panel',{
    extend:'Ext.panel.Panel',
    layout: {
        type: 'border'
    },
    requires:['Erems.view.masterbankkpr.browse.Grid','Erems.view.masterbankkpr.browse.FormSearch'],
    alias:'widget.masterbankkprbrowsepanel',
    height:300,
    gridPanelName : 'masterbankkprbrowsegrid',
    formSearchPanelName:'masterbankkprbrowseformsearch',
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