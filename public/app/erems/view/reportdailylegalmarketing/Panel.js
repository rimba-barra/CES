Ext.define('Erems.view.reportdailylegalmarketing.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.reportdailylegalmarketing.FormData'],
    alias: 'widget.reportdailylegalmarketingpanel',
    itemId: 'ReportdailylegalmarketingPanel',
    formSearchPanelName: 'reportdailylegalmarketingformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'reportdailylegalmarketingformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
