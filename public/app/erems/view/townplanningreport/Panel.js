Ext.define('Erems.view.townplanningreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.townplanningreport.FormData'],
    alias: 'widget.townplanningreportpanel',
    itemId: 'TownplanningreportPanel',
    formSearchPanelName: 'townplanningreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'townplanningreportformdata'
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
         itemId:'townplanningreportReportPanel',
         html:'hello',
         region: 'center'
         }
         ]
         });
         
         me.callParent(arguments);
         */
    }
   
});
