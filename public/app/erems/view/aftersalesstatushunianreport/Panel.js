Ext.define('Erems.view.aftersalesstatushunianreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.aftersalesstatushunianreport.FormData'],
    alias: 'widget.aftersalesstatushunianreportpanel',
    itemId: 'AftersalesstatushunianreportPanel',
    formSearchPanelName: 'aftersalesstatushunianreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'aftersalesstatushunianreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
