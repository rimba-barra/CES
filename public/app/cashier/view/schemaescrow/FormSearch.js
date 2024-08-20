Ext.define('Cashier.view.schemaescrow.FormSearch',{
    extend:'Cashier.library.template.view.FormSearch',
    alias:'widget.schemaescrowformsearch',
    requires: [
        'Cashier.library.template.component.Ptbyusercombobox',
    ],
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
                    xtype: 'ptbyusercombobox',
                    itemId: 'fs_pt_id',
                    name: 'projectpt_id',
                    anchor:'-15'

                },
                {
                    xtype: 'textfield',
                    itemId: 'unit_number',
                    name: 'unit_number',
                    fieldLabel: 'Unit Number',
                    anchor:'-15'
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});