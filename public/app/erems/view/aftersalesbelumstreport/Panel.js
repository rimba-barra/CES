Ext.define('Erems.view.aftersalesbelumstreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.aftersalesbelumstreport.FormData'],
    alias: 'widget.aftersalesbelumstreportpanel',
    itemId: 'AftersalesbelumstreportPanel',
    formSearchPanelName: 'aftersalesbelumstreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'aftersalesbelumstreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
