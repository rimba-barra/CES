Ext.define('Erems.view.proseswhatsapp.FormSearch', {
	extend: 'Erems.library.template.view.FormSearch',
	requires: [],
	alias: 'widget.proseswhatsappformsearch',
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			defaults: me.generateDefaults(),
			items: [

				{
					xtype: 'textfield',
					name: 'unit_number',
					fieldLabel: 'Unit Number'
				},
				{
					xtype      : 'xnamefieldEST',
					name       : 'customer_name',
					fieldLabel : 'Customer Name'
				},
				{
					xtype: 'dfdatefield',
					name: 'process_date',
					fieldLabel: 'Process Date',
					format: 'd-m-Y',
					altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
					submitFormat: 'Y-m-d H:i:s.u',
					editable: false
				},
				{
					xtype: 'combobox',
					name: 'whatsappcategory_id',
					displayField: 'whatsappcategory',
					valueField: 'whatsappcategory_id',
					fieldLabel: 'Category',
					typeAhead: true,
					queryMode: 'local',
					lastQuery: '',
					forceSelection: true,
					listeners: {
						beforequery: function (record) {
							record.query = new RegExp(record.query, 'i');
							record.forceAll = true;
						}
					}
				},
				{
					xtype: 'combobox',
					name: 'wastatus',
					displayField: 'wastatus',
					valueField: 'wastatus_id',
					fieldLabel: 'Status',
					itemId: 'wastatus_id',
					queryMode: 'local',
					store: [['999', 'ALL'], ['0', 'BELUM PROSES / FAILED'], ['1', 'DELIVERED']],
					typeAhead: true,
					queryMode: 'local',
					lastQuery: '',
					forceSelection: true,
					listeners: {
						beforequery: function (record) {
							record.query = new RegExp(record.query, 'i');
							record.forceAll = true;
						},
//						render: function () {
//							Ext.ComponentQuery.query('#wastatus_id')[0].setValue('0');
//						}
					}
				}

			],
			dockedItems: me.generateDockedItems()
		});

		me.callParent(arguments);
	}
});
