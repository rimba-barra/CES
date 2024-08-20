Ext.define('Erems.view.opportunitycustomerreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.opportunitycustomerreport.FormData'],
    alias: 'widget.opportunitycustomerreportpanel',
    itemId: 'OpportunitycustomerreportPanel',
    formSearchPanelName: 'opportunitycustomerreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'opportunitycustomerreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
