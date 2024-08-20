Ext.define('Erems.view.reportproyeksilrp.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.reportproyeksilrp.FormData'],
    alias: 'widget.reportproyeksilrppanel',
    itemId: 'ReportproyeksilrpPanel',
    formSearchPanelName: 'reportproyeksilrpformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'reportproyeksilrpformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
