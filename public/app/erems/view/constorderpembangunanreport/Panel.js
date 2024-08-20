Ext.define('Erems.view.constorderpembangunanreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.constorderpembangunanreport.FormData'],
    alias: 'widget.constorderpembangunanreportpanel',
    itemId: 'ConstorderpembangunanreportPanel',
    formSearchPanelName: 'constorderpembangunanreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'constorderpembangunanreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
