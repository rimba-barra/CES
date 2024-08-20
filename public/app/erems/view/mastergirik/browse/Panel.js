Ext.define('Erems.view.mastergirik.browse.Panel',{
    extend:'Ext.panel.Panel',
    layout: {
        type: 'border'
    },
    requires:['Erems.view.mastergirik.browse.Grid','Erems.view.mastergirik.browse.FormSearch'],
    alias:'widget.mastergirikbrowsepanel',
    height:300,
    gridPanelName : 'mastergirikbrowsegrid',
    formSearchPanelName:'mastergirikbrowseformsearch',
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