Ext.define('Erems.view.verificationapproval.browse.FormSearch', {
	extend   : 'Erems.library.template.view.FormSearch',
	alias    : 'widget.verificationapprovalbrowseformsearch',
	requires : [
		'Erems.library.template.component.Blockcombobox',
		'Erems.library.template.component.Clustercombobox',
	],
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			defaults: me.generateDefaults(),
			items: [
				{
					xtype            : 'textfield',
					itemId           : 'fs_unit_number',
					name             : 'unit_id',
					fieldLabel       : 'Unit Number',
					enforceMaxLength : true,
					maskRe           : /[^\`\"\']/,
					anchor           : '-100'
				},
				{
					xtype      : 'xnamefieldEST',
					itemId     : 'fs_customer_name',
					name       : 'customer_name',
					fieldLabel : 'Customer Name',
					anchor     : '-100'
				},
			],
			dockedItems: me.generateDockedItems()
		});

		me.callParent(arguments);
	}
});