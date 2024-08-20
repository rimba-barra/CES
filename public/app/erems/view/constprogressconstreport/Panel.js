Ext.define('Erems.view.constprogressconstreport.Panel', {
    extend: 'Erems.library.template.view.Panel',
    requires: ['Erems.view.constprogressconstreport.FormData'],
    alias: 'widget.constprogressconstreportpanel',
    itemId: 'ConstprogressconstreportPanel',
    formSearchPanelName: 'constprogressconstreportformsearch',
    layout: 'vbox',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'constprogressconstreportformdata'
                }
            ]
        });

        me.callParent(arguments);
    }
   
});
