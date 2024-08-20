Ext.define('Erems.view.aftersalespengawasreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.aftersalespengawasreport.FormData'],
    alias: 'widget.aftersalespengawasreportpanel',
    itemId: 'AftersalespengawasreportPanel',
    formSearchPanelName: 'aftersalespengawasreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'aftersalespengawasreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
