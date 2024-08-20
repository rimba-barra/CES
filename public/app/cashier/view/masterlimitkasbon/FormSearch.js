Ext.define('Cashier.view.masterlimitkasbon.FormSearch',{
    extend:'Cashier.library.template.view.FormSearch',
    alias:'widget.masterlimitkasbonformsearch',
    requires: [
        'Cashier.library.template.component.Ptbyusercombobox',
         'Cashier.library.template.combobox.Usercombobox',
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
                    xtype: 'usercombobox',
                    itemId: 'f_user_id',
                    name: 'user_id',
                    anchor:'-15'

                },
                {
                    xtype: 'textfield',
                    itemId: 'limit_cashbon',
                    name: 'limit_cashbon',
                    fieldLabel: 'Limit',
                    anchor:'-15'
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});