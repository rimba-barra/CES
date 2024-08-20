Ext.define('Erems.view.reportdailyadminestate.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.reportdailyadminestate.FormData'],
    alias: 'widget.reportdailyadminestatepanel',
    itemId: 'ReportdailyadminestatePanel',
    formSearchPanelName: 'reportdailyadminestateformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'reportdailyadminestateformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
