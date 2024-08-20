Ext.define('Erems.view.keuanganmodelareport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.keuanganmodelareport.FormData'],
    alias: 'widget.keuanganmodelareportpanel',
    itemId: 'KeuanganmodelareportPanel',
    formSearchPanelName: 'keuanganmodelareportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'keuanganmodelareportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
