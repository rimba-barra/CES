Ext.define('Erems.view.aftersalesperbaikanreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.aftersalesperbaikanreport.FormData'],
    alias: 'widget.aftersalesperbaikanreportpanel',
    itemId: 'AftersalesperbaikanreportPanel',
    formSearchPanelName: 'aftersalesperbaikanreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'aftersalesperbaikanreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
