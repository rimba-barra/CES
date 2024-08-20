Ext.define('Erems.view.purchaseletter.FormSearch', {
	extend        : 'Erems.library.template.view.FormSearch',
	alias         : 'widget.purchaseletterformsearch',
	requires      : ['Erems.library.template.component.Pricesourcecombobox'],
	initComponent : function () {
		var me = this;

		Ext.applyIf(me, {
			defaults : { xtype : 'textfield' },
			items    : [
				{
					fieldLabel      : 'Unit Number',
					name            : 'unit_unit_number',
					enableKeyEvents : true,
				}, 
				{
					fieldLabel      : 'Purchaseletter Number',
					name            : 'purchaseletter_no',
					enableKeyEvents : true,
				}, 
				{
					xtype           : 'xnamefieldEST',
					fieldLabel      : 'Customer Name',
					name            : 'customer_name',
					enableKeyEvents : true,
				}, 
				{
					fieldLabel      : 'VA BCA',
					name            : 'unit_virtualaccount_bca',
					enableKeyEvents : true,
				}, 
				{
					fieldLabel      : 'VA Mandiri',
					name            : 'unit_virtualaccount_mandiri',
					enableKeyEvents : true,
				}
				,
				{
					xtype     : 'clustercombobox',
					itemId    : 'fs_cluster_id',
					name      : 'cluster_id',
					anchor    : '-15',
					listeners : {
						beforequery : function (record) {
							record.query = new RegExp(record.query, 'i');
							record.forceAll = true;
						}
					}

				},
				{
					xtype          : 'pricesourcecombobox',
					itemId         : 'btnPriceSource',
					fieldLabel     : 'Price Source',
					name           : 'price_source',
					anchor         : '-15',
					forceSelection : true,
					listeners      : {
						beforequery : function (record) {
							record.query = new RegExp(record.query, 'i');
							record.forceAll = true;
						}
					}
				},
				{
					xtype          : 'pricetypecombobox',
					fieldLabel     : 'Price Type',
					name           : 'pricetype_id',
					anchor         : '-15',
					forceSelection : true,
					listeners      : {
						beforequery: function (record) {
							record.query = new RegExp(record.query, 'i');
							record.forceAll = true;
						}
					}
				}, 
				{
					xtype          : 'checkboxfield',
					itemId         : 'btnCheckDraft',
					name           : 'is_draft',
					fieldLabel     : 'SPT Draft',
					checked        : false,
					inputValue     : '1',
					uncheckedValue : '0'
				}
			],
			dockedItems : me.generateDockedItems()
		});

		me.callParent(arguments);
	}
});