Ext.define('Gl.view.changenumberordatevoucher.Panel', {
    extend: 'Ext.form.Panel', 
    requires: ['Gl.view.changenumberordatevoucher.FormData'],
    alias: 'widget.changenumberordatevoucherpanel',
    itemId: 'ChangenumberordatevoucherPanel',   
    layout: {
        type: 'border',       
    },
    formDataPanelName: 'changenumberordatevoucherformdata',    
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
