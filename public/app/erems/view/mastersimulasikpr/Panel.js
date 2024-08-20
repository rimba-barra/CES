Ext.define('Erems.view.mastersimulasikpr.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.mastersimulasikpr.FormData'],
    alias: 'widget.mastersimulasikprpanel',
    itemId: 'MastersimulasikprPanel',
    formSearchPanelName: 'mastersimulasikprformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'mastersimulasikprformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
