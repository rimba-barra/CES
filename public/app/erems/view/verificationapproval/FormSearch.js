Ext.define('Erems.view.verificationapproval.FormSearch', {
	extend        : 'Erems.library.template.view.FormSearch',
	alias         : 'widget.verificationapprovalformsearch',
	initComponent : function () {
		var me = this;
		var cbf = new Erems.template.ComboBoxFields();
		Ext.applyIf(me, {
			defaults : me.generateDefaults(),
			items    : [
				{
					xtype      : 'textfield',
					fieldLabel : 'Unit Number',
					itemId     : 'unit_number',
					name       : 'unit_number',
					anchor     : '-15'
				},
				{
					xtype  : 'clustercombobox',
					itemId : 'fs_cluster_id',
					name   : 'cluster_id',
					anchor : '-15'

				},
				{
					xtype        : 'combobox',
					name         : 'verification_id',
					displayField : cbf.verification.d,
					valueField   : cbf.verification.v,
					fieldLabel   :'Jenis Persetujuan',
					anchor       : '-15'

				},
				{
					xtype      : 'xnamefieldEST',
					fieldLabel : 'Customer Name',
					itemId     : 'customer_name',
					name       : 'customer_name',
					anchor     : '-15'
				},
			],
			dockedItems : me.generateDockedItems()
		});
		me.callParent(arguments);
	}
});