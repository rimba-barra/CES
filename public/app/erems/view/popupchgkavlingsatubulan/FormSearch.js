Ext.define('Erems.view.popupchgkavlingsatubulan.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.popupchgkavlingsatubulanformsearch',
    initComponent: function () {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            
            items: [
                {
                    xtype: 'textfield',
                    name: 'purchaseletter_no',
                    fieldLabel: 'Purchaseletter No',
                    enforceMaxLength: true,
                    enableKeyEvents: true
                },
                {
                    xtype: 'textfield',
                    name: 'unit_number',
                    fieldLabel: 'Unit Number',
                    enforceMaxLength: true,
                    enableKeyEvents: true
                },
                {
                    xtype           : 'xnamefieldEST',
                    name            : 'customer_name',
                    fieldLabel      : 'Customer Name',
                    enableKeyEvents : true
                },
                {
                    xtype: 'textfield',
                    name: 'x_hari',
                    value:30,
                    fieldLabel: 'Jumlah Hari ke belakang',
                    enableKeyEvents: true
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
