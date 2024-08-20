Ext.define('Erems.view.generalsudahsp3kbelumakadreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.generalsudahsp3kbelumakadreport.FormData'],
    alias: 'widget.generalsudahsp3kbelumakadreportpanel',
    itemId: 'Generalsudahsp3kbelumakadreportPanel',
    formSearchPanelName: 'generalsudahsp3kbelumakadreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'generalsudahsp3kbelumakadreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
