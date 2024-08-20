Ext.define('Erems.view.collbelumberkasreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.collbelumberkasreport.FormData'],
    alias: 'widget.collbelumberkasreportpanel',
    itemId: 'CollbelumberkasreportPanel',
    formSearchPanelName: 'collbelumberkasreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'collbelumberkasreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
