Ext.define('Cashier.view.kartupiutangacc.Panel', {
    extend: 'Cashier.library.template.view.Panel',
    requires: ['Cashier.view.kartupiutangacc.Grid', 'Cashier.view.kartupiutangacc.FormSearch'],
    alias: 'widget.kartupiutangaccpanel',
    itemId: 'KartupiutangaccPanel',
    gridPanelName: 'kartupiutangaccgrid',
    formSearchPanelName: 'kartupiutangaccformsearch',
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
                    collapsed: false,
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

