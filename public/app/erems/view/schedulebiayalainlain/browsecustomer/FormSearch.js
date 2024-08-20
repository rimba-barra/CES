Ext.define('Erems.view.schedulebiayalainlain.browsecustomer.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.schedulebiayalainlainbrowsecustomerformsearch',
	requires: [
	],
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
                    xtype: 'textfield',
                    name: 'address',
                    fieldLabel: 'Address',
                    enforceMaxLength: true,
                    maskRe: /[^\`"\']/,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_ktp',
                    name: 'KTP_number',
                    fieldLabel: 'No KTP',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                }
				
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});