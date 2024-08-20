Ext.define('Erems.view.permintaankomisi.browse.Panel',{
    extend:'Ext.panel.Panel',
    layout: {
        type: 'border'
    },
    requires:['Erems.view.permintaankomisi.browse.Grid','Erems.view.permintaankomisi.browse.FormSearch'],
    alias:'widget.permintaankomisibrowsepanel',
    height:300,
    gridPanelName : 'permintaankomisibrowsegrid',
    formSearchPanelName:'permintaankomisibrowseformsearch',
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