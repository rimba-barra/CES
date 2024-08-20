Ext.define('Erems.view.generalkprbelumberkasreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.generalkprbelumberkasreport.FormData'],
    alias: 'widget.generalkprbelumberkasreportpanel',
    itemId: 'GeneralkprbelumberkasreportPanel',
    formSearchPanelName: 'generalkprbelumberkasreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'generalkprbelumberkasreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
