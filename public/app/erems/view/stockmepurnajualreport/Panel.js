Ext.define('Erems.view.stockmepurnajualreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.stockmepurnajualreport.FormData'],
    alias: 'widget.stockmepurnajualreportpanel',
    itemId: 'StockmepurnajualreportPanel',
    formSearchPanelName: 'stockmepurnajualreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'stockmepurnajualreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
