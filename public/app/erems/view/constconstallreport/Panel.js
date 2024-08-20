Ext.define('Erems.view.constconstallreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.constconstallreport.FormData'],
    alias: 'widget.constconstallreportpanel',
    itemId: 'ConstconstallreportPanel',
    formSearchPanelName: 'constconstallreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'constconstallreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
