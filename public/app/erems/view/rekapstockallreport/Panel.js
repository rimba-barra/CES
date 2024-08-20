Ext.define('Erems.view.rekapstockallreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.rekapstockallreport.FormData'],
    alias: 'widget.rekapstockallreportpanel',
    itemId: 'RekapstockallreportPanel',
    formSearchPanelName: 'rekapstockallreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'rekapstockallreportformdata'
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
         itemId:'rekapstockallreportReportPanel',
         html:'hello',
         region: 'center'
         }
         ]
         });
         
         me.callParent(arguments);
         */
    }
   
});
