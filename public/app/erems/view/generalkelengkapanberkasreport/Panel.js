Ext.define('Erems.view.generalkelengkapanberkasreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.generalkelengkapanberkasreport.FormData'],
    alias: 'widget.generalkelengkapanberkasreportpanel',
    itemId: 'GeneralkelengkapanberkasreportPanel',
    formSearchPanelName: 'generalkelengkapanberkasreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'generalkelengkapanberkasreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
