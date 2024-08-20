Ext.define('Erems.view.prediksikomisireport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.prediksikomisireport.FormData'],
    alias: 'widget.prediksikomisireportpanel',
    itemId: 'PrediksikomisireportPanel',
    formSearchPanelName: 'prediksikomisireportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'prediksikomisireportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
