Ext.define('Erems.view.popupchgnamesatubulan.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.popupchgnamesatubulanformsearch',
    initComponent: function () {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {

            items: [
                {
                    xtype: 'textfield',
                    name: 'purchaseletter_purchaseletter_no',
                    fieldLabel: 'Purchaseletter No',
                    enforceMaxLength: true,
                    maskRe: /[^\`"\']/,
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
                    xtype:'textfield',
                    fieldLabel: 'Jumlah Hari Ke belakang',
                    name: 'x_hari',
                    value: '30',
                    enableKeyEvents: true
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
