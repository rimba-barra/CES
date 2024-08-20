Ext.define('Erems.view.summarycontrolreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.summarycontrolreport.FormData'],
    alias: 'widget.summarycontrolreport',
    itemId: 'SummarycontrolreportPanel',
    formSearchPanelName: 'summarycontrolreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'summarycontrolreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
