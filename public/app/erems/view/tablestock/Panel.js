Ext.define('Erems.view.tablestock.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.tablestock.Konten','Erems.view.tablestock.FormSearch'],
    alias:'widget.tablestockpanel',
    itemId:'TablestockPanel',
    KontenName:'tablestockkonten',
//    formSearchPanelName:'tablestockformsearch'
    
    layout: {
        type: 'border'
    },
//    gridPanelName : 'gridpanelname',
    formSearchPanelName:'tablestockformsearch',
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
//                     xtype:'panel',
//                     html:'hello'
                    xtype: me.KontenName,
                    region: 'center'
                }
            ]
        });

        me.callParent(arguments);
    }
});
