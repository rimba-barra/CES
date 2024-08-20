Ext.define('Erems.view.siteplan.Panel',{
    extend:'Erems.library.template.view.Panel',
    requires:['Erems.view.siteplan.Konten','Erems.view.siteplan.FormSearch'],
    alias:'widget.siteplanpanel',
    itemId:'SiteplanPanel',
    KontenName:'siteplankonten',
//    formSearchPanelName:'siteplanformsearch'
    
    layout: {
        type: 'border'
    },
//    gridPanelName : 'gridpanelname',
    formSearchPanelName:'siteplanformsearch',
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
