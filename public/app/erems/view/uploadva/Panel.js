Ext.define('Erems.view.uploadva.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.uploadva.FormData'],
    alias: 'widget.uploadvapanel',
    itemId: 'UploadvaPanel',
    formSearchPanelName: 'Uploadvaformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'uploadvaformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
