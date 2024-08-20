Ext.define('Erems.view.collsh1crreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.collsh1crreport.FormData'],
    alias: 'widget.collsh1crreportpanel',
    itemId: 'DetailcontrolreportPanel',
    formSearchPanelName: 'collsh1crreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'collsh1crreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
