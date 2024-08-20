Ext.define('Erems.view.eremsstock.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.eremsstock.Konten','Erems.view.eremsstock.FormSearch'],
    alias:'widget.eremsstockpanel',
    itemId:'EremsstockPanel',
    KontenName:'eremsstockkonten',
//    formSearchPanelName:'eremsstockformsearch'
    layout: {
        type: 'border'
    },
//    gridPanelName : 'gridpanelname',
    formSearchPanelName:'eremsstockformsearch',
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
                    region: 'center',
                }
            ]
        });

        me.callParent(arguments);
    }
});
