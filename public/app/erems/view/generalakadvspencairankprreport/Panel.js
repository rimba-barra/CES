Ext.define('Erems.view.generalakadvspencairankprreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.generalakadvspencairankprreport.FormData'],
    alias: 'widget.generalakadvspencairankprreportpanel',
    itemId: 'GeneralakadvspencairankprreportPanel',
    formSearchPanelName: 'generalakadvspencairankprreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'generalakadvspencairankprreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
