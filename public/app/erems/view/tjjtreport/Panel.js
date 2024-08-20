Ext.define('Erems.view.tjjtreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.tjjtreport.FormData'],
    alias: 'widget.tjjtreportpanel',
    itemId: 'TjjtreportPanel',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'tjjtreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
