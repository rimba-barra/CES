Ext.define('Erems.view.stpembayaranreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.stpembayaranreport.FormData'],
    alias: 'widget.stpembayaranreportpanel',
    itemId: 'StpembayaranreportPanel',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'stpembayaranreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
