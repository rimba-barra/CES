Ext.define('Erems.view.mastercustomer.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    alias: 'widget.mastercustomerformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'fsms_code',
                    name: 'code',
                    fieldLabel: 'Code',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },
                {
                    xtype      : 'xnamefieldEST',
                    itemId     : 'fsms_name',
                    name       : 'name',
                    fieldLabel : 'Customer Name',
                },
                {
                    xtype: 'datefield',
                    fieldLabel: 'Birthdate',
                    name: 'birthdate'
                }
                //added by anas 15062021
                ,{
                    xtype: 'textfield',
                    itemId: 'fsms_ktp',
                    name: 'ktp_number',
                    fieldLabel: 'No KTP',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                }
                //end added by anas
                ,{
                    xtype : 'textfield',
                    itemId: 'fsms_npwp',
                    name: 'NPWP',
                    fieldLabel: 'NPWP',
                    enforceMaxLength: true,
                    maskRe: /[0-9-.]/,
                    maxLength: 50
                }

            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
