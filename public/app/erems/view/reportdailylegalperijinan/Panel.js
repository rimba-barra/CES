Ext.define('Erems.view.reportdailylegalperijinan.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.reportdailylegalperijinan.FormData'],
    alias: 'widget.reportdailylegalperijinanpanel',
    itemId: 'ReportdailylegalperijinanPanel',
    formSearchPanelName: 'reportdailylegalperijinanformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'reportdailylegalperijinanformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
