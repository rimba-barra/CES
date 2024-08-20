Ext.define('Erems.view.penjualanpersalesreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.penjualanpersalesreport.FormData'],
    alias: 'widget.penjualanpersalesreportpanel',
    itemId: 'LastpricereportPanel',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'penjualanpersalesreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
