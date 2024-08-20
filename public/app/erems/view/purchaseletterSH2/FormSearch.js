Ext.define('Erems.view.purchaseletterSH2.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.purchaseletterSH2formsearch',
    requires: [],
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            items: [
            {
                    fieldLabel:'Unit Number',
                    name:'unit_unit_number'
            },{
                    fieldLabel:'Purchaseletter Number',
                    name:'purchaseletter_no'
            },{
                    fieldLabel:'Customer Name',
                    name:'customer_name'
            },{
                    fieldLabel:'VA BCA',
                    name:'unit_virtualaccount_bca'
            },{
                    fieldLabel:'VA Mandiri',
                    name:'unit_virtualaccount_mandiri'
            }
            //add by hadi 22082019
            ,{
                    xtype: 'checkboxfield',
                    itemId: 'btnCheckDraft',
                    name: 'is_draft',
                    fieldLabel: 'SPT Draft',
                    // hidden:true,
                    checked: false,
                    inputValue: '1',
                    uncheckedValue: '0'
            }
            //endadd
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});