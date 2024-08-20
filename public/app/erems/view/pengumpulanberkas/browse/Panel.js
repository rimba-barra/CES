Ext.define('Erems.view.pengumpulanberkas.browse.Panel',{
    extend:'Ext.panel.Panel',
    layout: {
        type: 'border'
    },
    requires:['Erems.view.pengumpulanberkas.browse.Grid','Erems.view.pengumpulanberkas.browse.FormSearch'],
    alias:'widget.pengumpulanberkasbrowsepanel',
    height:300,
    gridPanelName : 'pengumpulanberkasbrowsegrid',
    formSearchPanelName:'pengumpulanberkasbrowseformsearch',
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