Ext.define('Erems.view.purchaseletter.browse.Panel',{
    extend:'Ext.panel.Panel',
    layout: {
        type: 'border'
    },
    requires:['Erems.view.purchaseletter.browse.Grid','Erems.view.purchaseletter.browse.FormSearch'],
    alias:'widget.purchaseletterbrowsepanel',
    height:300,
    gridPanelName : 'purchaseletterbrowsegrid',
    formSearchPanelName:'purchaseletterbrowseformsearch',
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