Ext.define('Cashier.view.masterpenandatangan.FormSearch',{
    extend:'Cashier.library.template.view.FormSearch',
    alias:'widget.masterpenandatanganformsearch',
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
                    fieldLabel: 'Inisial',
                    itemId: 'inisial',
                    name: 'inisial',
                    anchor:'-15'
                },
                {
                    xtype: 'textfield',
                    itemId: 'name',
                    name: 'name',
                    fieldLabel: 'Name',
                    anchor:'-15'
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});