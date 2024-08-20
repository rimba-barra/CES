Ext.define('Erems.view.schedulebiayalainlain.browsecustomer.Panel',{
    extend:'Ext.panel.Panel',
    layout: {
        type: 'border'
    },
    requires:['Erems.view.schedulebiayalainlain.browsecustomer.Grid','Erems.view.schedulebiayalainlain.browsecustomer.FormSearch'],
    alias:'widget.schedulebiayalainlainbrowsecustomerpanel',
    height:300,
    gridPanelName : 'schedulebiayalainlainbrowsecustomergrid',
    formSearchPanelName:'schedulebiayalainlainbrowsecustomerformsearch',
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