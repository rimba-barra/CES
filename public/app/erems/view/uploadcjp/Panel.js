Ext.define('Erems.view.uploadcjp.Panel', {
    extend: 'Ext.form.Panel',
    requires: ['Erems.view.uploadcjp.FormData'],
    alias: 'widget.uploadcjppanel',
    itemId: 'UploadcjpreportPanel',
    layout: {
        type: 'border',
    },
    formDataPanelName: 'uploadcjpformdata',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: me.formDataPanelName,
                    region: 'center',
                }
            ]
        });
        me.callParent(arguments);
    }

});
