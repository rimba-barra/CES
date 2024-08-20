Ext.define('Erems.view.legalkonfirmasiakadreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.legalkonfirmasiakadreport.FormData'],
    alias: 'widget.legalkonfirmasiakadreportpanel',
    itemId: 'LegalkonfirmasiakadreportPanel',
    formSearchPanelName: 'legalkonfirmasiakadreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'legalkonfirmasiakadreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
