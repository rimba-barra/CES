Ext.define('Erems.view.lastpricereport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.lastpricereport.FormData'],
    alias: 'widget.lastpricereportpanel',
    itemId: 'LastpricereportPanel',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'lastpricereportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
