Ext.define('Erems.view.statuspembayaranreport.Panel', {
    extend              : 'Erems.library.template.view.Panel',
    requires            : ['Erems.view.statuspembayaranreport.FormData'],
    alias               : 'widget.statuspembayaranreportpanel',
    itemId              : 'StatuspembayaranreportPanel',
    formSearchPanelName : 'statuspembayaranreportformsearch',
    layout              : 'vbox',
    initComponent       : function() {
        var me = this;
        Ext.applyIf(me, {
            items : [
                {
                    xtype: 'statuspembayaranreportformdata',
                }
            ]
        });

        me.callParent(arguments);
    }
});