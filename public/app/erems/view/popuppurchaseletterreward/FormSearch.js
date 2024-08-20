Ext.define('Erems.view.popuppurchaseletterreward.FormSearch', {
    extend        : 'Erems.library.template.view.FormSearch',
    alias         : 'widget.popuppurchaseletterrewardformsearch',
    initComponent : function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    fieldLabel: 'Unit Number',
                    name: 'unit_number',
                    enableKeyEvents: true
                }, 
                {
                    xtype: 'textfield',
                    fieldLabel: 'Purchaseletter Number',
                    name: 'purchaseletter_no',
                    enableKeyEvents: true
                }, 
                {
                    xtype           : 'xnamefieldEST',
                    fieldLabel      : 'Customer Name',
                    name            : 'customer_name',
                    enableKeyEvents : true
                }, 
                {
                    xtype: 'textfield',
                    fieldLabel: 'VA BCA',
                    name: 'unit_virtualaccount_bca',
                    enableKeyEvents: true
                }, 
                {
                    xtype: 'textfield',
                    fieldLabel: 'VA Mandiri',
                    name: 'unit_virtualaccount_mandiri',
                    enableKeyEvents: true
                }, 
                {
                    xtype: 'checkboxfield',
                    itemId: 'btnCheckDraft',
                    name: 'is_draft',
                    fieldLabel: 'SPT Draft',
                    hidden: true,
                    checked: false,
                    inputValue: '1',
                    uncheckedValue: '0'
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});