Ext.define('Erems.view.townplanninglegal.browse.Panel',{
    extend:'Ext.panel.Panel',
    layout: {
        type: 'border'
    },
    requires:['Erems.view.townplanninglegal.browse.Grid','Erems.view.townplanninglegal.browse.FormSearch'],
    alias:'widget.townplanninglegalbrowsepanel',
    itemId:'TownplanningBrowsePanel',
    height:300,
    gridPanelName : 'townplanninglegalbrowsegrid',
    formSearchPanelName:'townplanninglegalbrowseformsearch',
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