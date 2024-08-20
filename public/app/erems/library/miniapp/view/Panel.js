Ext.define('Erems.library.miniapp.view.Panel', {
    extend: 'Ext.panel.Panel',
    alias: 'widget.miniappviewpanel',
    requires:['Erems.library.miniapp.view.Grid','Erems.library.miniapp.view.FormSearch'],
    itemId: 'MiniAppViewPanel',
    height:300,
    layout: {
        type: 'border'
    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
               
                {xtype:'miniappviewgrid', region: 'center'},
                {xtype:'miniappviewformsearch',region: 'west',
                    split: true,
                    maxWidth: 500,
                    minWidth: 300,
                    width: 300,
                    collapsed: true,
                    collapsible: true,
                    iconCls: 'icon-search',
                    title: 'Search'}
            ]
        });

        me.callParent(arguments);
    }

});