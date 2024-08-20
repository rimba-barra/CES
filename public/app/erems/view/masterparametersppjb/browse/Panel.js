Ext.define('Erems.view.masterparametersppjb.browse.Panel',{
    extend:'Ext.panel.Panel',
    layout: {
        type: 'border'
    },
    requires:['Erems.view.masterparametersppjb.browse.Grid','Erems.view.masterparametersppjb.browse.FormSearch'],
    alias:'widget.masterparametersppjbbrowsepanel',
    height:300,
    gridPanelName : 'masterparametersppjbbrowsegrid',
    formSearchPanelName:'masterparametersppjbbrowseformsearch',
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