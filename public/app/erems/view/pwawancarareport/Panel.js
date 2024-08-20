Ext.define('Erems.view.pwawancarareport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.pwawancarareport.FormData'],
    alias: 'widget.pwawancarareportpanel',
    itemId: 'PwawancarareportPanel',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'pwawancarareportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
