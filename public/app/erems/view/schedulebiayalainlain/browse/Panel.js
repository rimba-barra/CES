Ext.define('Erems.view.schedulebiayalainlain.browse.Panel',{
    extend:'Ext.panel.Panel',
    layout: {
        type: 'border'
    },
    requires:['Erems.view.schedulebiayalainlain.browse.Grid','Erems.view.schedulebiayalainlain.browse.FormSearch'],
    alias:'widget.schedulebiayalainlainbrowsepanel',
    height:300,
    gridPanelName : 'schedulebiayalainlainbrowsegrid',
    formSearchPanelName:'schedulebiayalainlainbrowseformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: me.formSearchPanelName,
                    region: 'west',
                    split: true,
                    maxWidth: 300,
                    minWidth: 200,
                    width: 200,
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