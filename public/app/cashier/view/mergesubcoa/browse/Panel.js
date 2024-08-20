Ext.define('Cashier.view.mergesubcoa.browse.Panel',{
    extend:'Ext.panel.Panel',
    layout: {
        type: 'border'
    },
    requires:['Cashier.view.mergesubcoa.browse.Grid','Cashier.view.mergesubcoa.browse.FormSearch'],
    alias:'widget.mergesubcoabrowsepanel',
    height:300,
    gridPanelName : 'mergesubcoabrowsegrid',
    formSearchPanelName:'mergesubcoabrowseformsearch',
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