Ext.define('Erems.view.pakreditreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.pakreditreport.FormData'],
    alias: 'widget.pakreditreportpanel',
    itemId: 'PakreditreportPanel',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'pakreditreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
