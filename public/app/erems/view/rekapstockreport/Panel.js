Ext.define('Erems.view.rekapstockreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.rekapstockreport.FormData'],
    alias: 'widget.rekapstockreportpanel',
    itemId: 'RekapstockreportPanel',
    formSearchPanelName: 'rekapstockreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'rekapstockreportformdata'
                }
            ]
        });

        me.callParent(arguments);


        /*
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
         title: 'Filter'
         },
         {
         xtype:'panel',
         //html:'hello'
         itemId:'rekapstockreportReportPanel',
         html:'hello',
         region: 'center'
         }
         ]
         });
         
         me.callParent(arguments);
         */
    }
   
});
