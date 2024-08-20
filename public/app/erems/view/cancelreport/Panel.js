Ext.define('Erems.view.cancelreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.cancelreport.FormData'],
    alias: 'widget.cancelreportpanel',
    itemId: 'CancelreportPanel',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [{
                    xtype: 'cancelreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
