Ext.define('Erems.view.masterhgbinduk.browse.Panel',{
    extend:'Ext.panel.Panel',
    layout: {
        type: 'border'
    },
    requires:['Erems.view.masterhgbinduk.browse.Grid','Erems.view.masterhgbinduk.browse.FormSearch'],
    alias:'widget.masterhgbindukbrowsepanel',
    height:300,
    gridPanelName : 'masterhgbindukbrowsegrid',
    formSearchPanelName:'masterhgbindukbrowseformsearch',
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