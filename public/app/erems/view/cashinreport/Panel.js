Ext.define('Erems.view.cashinreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.cashinreport.FormData'],
    alias: 'widget.cashinreportpanel',
    itemId: 'CashinreportPanel',
    formSearchPanelName: 'cashinreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'cashinreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
