Ext.define('Erems.view.piutangjtreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.piutangjtreport.FormData'],
    alias: 'widget.piutangjtreportpanel',
    itemId: 'PiutangjtreportPanel',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'piutangjtreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
