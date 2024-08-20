Ext.define('Erems.view.generalsalesreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.generalsalesreport.FormData'],
    alias: 'widget.generalsalesreportpanel',
    itemId: 'GeneralsalesreportPanel',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'generalsalesreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
