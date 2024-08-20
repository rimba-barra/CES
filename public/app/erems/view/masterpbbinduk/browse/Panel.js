Ext.define('Erems.view.masterpbbinduk.browse.Panel',{
    extend:'Ext.panel.Panel',
    layout: {
        type: 'border'
    },
    requires:['Erems.view.masterpbbinduk.browse.Grid','Erems.view.masterpbbinduk.browse.FormSearch'],
    alias:'widget.masterpbbindukbrowsepanel',
    height:300,
    gridPanelName : 'masterpbbindukbrowsegrid',
    formSearchPanelName:'masterpbbindukbrowseformsearch',
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