Ext.define('Cashier.view.masterrangebagihasil.FormSearch', {
	extend       : 'Cashier.library.template.view.FormSearch',
	alias        : 'widget.masterrangebagihasilformsearch',
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			defaults: me.generateDefaults(),
			items   : [
                {
                    xtype: 'hiddenfield',
                    name : 'hideparam',
                    value: 'default'
                },
				{
					xtype           : 'textfield',
					itemId          : 'fsms_code',
					name            : 'code',
					fieldLabel      : 'Kode',
					enforceMaxLength: true,
					maskRe          : /[^\`"\']/,
					maxLength       : 50
				},
				{
					xtype           : 'textfield',
					itemId          : 'fsms_name',
					name            : 'name',
					fieldLabel      : 'Nama',
					enforceMaxLength: true,
					maskRe          : /[^\`"\']/,
					maxLength       : 50
				},
			],
			dockedItems: me.generateDockedItems()
		});

		me.callParent(arguments);
	}
});
