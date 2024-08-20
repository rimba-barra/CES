Ext.define('Erems.view.reporttunggakanwa.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.reporttunggakanwa.FormData'],
    alias: 'widget.reporttunggakanwapanel',
    itemId: 'ReporttunggakanwaPanel',
    formSearchPanelName: 'reporttunggakanwaformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'reporttunggakanwaformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
