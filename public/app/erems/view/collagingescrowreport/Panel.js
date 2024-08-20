Ext.define('Erems.view.collagingescrowreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.collagingescrowreport.FormData'],
    alias: 'widget.collagingescrowreportpanel',
    itemId: 'CollagingescrowreportPanel',
    formSearchPanelName: 'collagingescrowreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'collagingescrowreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
