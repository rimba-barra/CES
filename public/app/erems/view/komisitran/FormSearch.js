Ext.define('Erems.view.komisitran.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.komisitranformsearch',
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
           
            items: [
                
                {
                    xtype: 'textfield',
                    name: 'unit_unit_number',
                    fieldLabel: 'Unit Number'
                },
               
               
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
