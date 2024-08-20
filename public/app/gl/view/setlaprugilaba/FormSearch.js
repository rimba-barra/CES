Ext.define('Gl.view.setlaprugilaba.FormSearch',{
    extend:'Gl.library.template.view.FormSearch',
    alias:'widget.setlaprugilabaformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },           
                {
                    xtype: 'textfield',
                    itemId: 'fsms_report_level',
                    name: 'report_level',
                    fieldLabel: 'Template Level',
                    enforceMaxLength: true,
                    maxLength: 50,
                    enableKeyEvents : true
                }
             
                
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
