Ext.define('Cashier.view.masterpenandatanganrange.FormSearch',{
    extend:'Cashier.library.template.view.FormSearch',
    alias:'widget.masterpenandatanganrangeformsearch',
    requires: [
        'Cashier.library.template.component.Ptbyusercombobox',
        'Cashier.library.template.view.MoneyField'
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
//                {
//                    xtype: 'textfield',
//                    fieldLabel: 'Inisial',
//                    itemId: 'penandatangan_inisial',
//                    name: 'penandatangan_inisial',
//                    anchor:'-15'
//                },
//                {
//                    xtype: 'textfield',
//                    itemId: 'penandatangan_name',
//                    name: 'penandatangan_name',
//                    fieldLabel: 'Name',
//                    anchor:'-15'
//                },{
//                    xtype: 'xmoneyfield',
//                    itemId: 'range_fromamount',
//                    name: 'range_fromamount',
//                    fieldLabel: 'Min Amount',
//                    anchor:'-15'
//                },{
//                    xtype: 'xmoneyfield',
//                    itemId: 'range_untilamount',
//                    name: 'range_untilamount',
//                    fieldLabel: 'Max Amount',
//                    anchor:'-15'
//                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});