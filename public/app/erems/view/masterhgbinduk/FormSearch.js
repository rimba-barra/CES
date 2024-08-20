Ext.define('Erems.view.masterhgbinduk.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.masterhgbindukformsearch',
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
                    xtype: 'textfield',
                    itemId: 'fsms_hgbinduk',
                    name: 'hgbinduk',
                    fieldLabel: 'HGB Induk No',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },
				{
					xtype: 'checkboxfield',
					fieldLabel: 'Show HPL Induk (Surabaya)',
					name: 'is_hpl',
					checked: false,
					inputValue: '1',
					uncheckedValue: '0',
					margin: '0 5px 0 0',
					width: 20
				},
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
