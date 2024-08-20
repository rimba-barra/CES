Ext.define('Erems.view.installmentpayment.FormSearch', {
	extend: 'Erems.library.template.view.FormSearch',
	alias: 'widget.installmentpaymentformsearch',
	requires: ['Erems.template.ComboBoxFields'],
	initComponent: function () {
		var me = this;

		var cbf = new Erems.template.ComboBoxFields();

		Ext.applyIf(me, {
			defaults: {
				xtype: 'combobox',
				labelWidth: 75,
				width: '100%'
			},
			items: [
				{
					xtype: 'textfield',
					name: 'unit_number',
					fieldLabel: 'Unit Number',
					enableKeyEvents: true,
				},
				{
					name: 'cluster_id',
					displayField: cbf.cluster.d,
					valueField: cbf.cluster.v,
					fieldLabel: 'Cluster'
				},
				{
					name: 'block_id',
					displayField: cbf.block.d,
					valueField: cbf.block.v,
					fieldLabel: 'Block'
				},
				{
					xtype           : 'xnamefieldEST',
					name            : 'customer_name',
					fieldLabel      : 'Customer Name',
					enableKeyEvents : true,
				},
				{
					name: 'paymentmethod_id',
					displayField: cbf.paymentmethod.d,
					valueField: cbf.paymentmethod.v,
					fieldLabel: 'Payment Method'
				},
				{
					xtype: 'textfield',
					name: 'receipt_no',
					fieldLabel: 'Receipt Number',
					enableKeyEvents: true,
				},
				{
					xtype: 'textfield',
					hidden: true,
					name: 'virtualaccount_bca',
					fieldLabel: 'VA BCA',
					enableKeyEvents: true,
				},
				{
					xtype: 'textfield',
					hidden: true,
					name: 'virtualaccount_mandiri',
					fieldLabel: 'VA Mandiri',
					enableKeyEvents: true,
				},
				//add by fatkur 22092020
				{
					xtype: 'checkboxfield',
					itemId: 'btnCheckDraft',
					name: 'is_draft',
					fieldLabel: 'SPT Draft',
					hidden: true,
					checked: false,
					inputValue: '1',
					uncheckedValue: '0'
				},
				//endadd
				{
					xtype: 'panel',
					height: 48,
					bodyStyle: 'background:none;border:0;',
					anchor: '-15',
					layout: {
						type: 'column'
					},
					items: [
						{
							xtype: 'datefield',
							itemId: 'payment_startdate',
							name: 'payment_startdate',
							fieldLabel: 'Payment Date',
							labelSeparator: '',
							width: 90,
							labelAlign: 'top',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u'
						},
						{
							xtype: 'label',
							margin: '30px 5px 0 5px',
							styleHtmlContent: false,
							width: 10,
							text: 'to'
						},
						{
							xtype: 'datefield',
							itemId: 'payment_enddate',
							name: 'payment_enddate',
							fieldLabel: '&nbsp;',
							labelSeparator: '',
							width: 90,
							labelAlign: 'top',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u'
						},
						{
							xtype: 'checkboxfield',
							margin: '30px 5px 0 5px',
							itemId: 'cbf_payment_date',
							name: 'cbf_payment_date',
							fieldLabel: '',
							checked: true,
							inputValue: '1',
							uncheckedValue: '0'
						},
						{
							xtype: 'label',
							margin: '30px 5px 0 5px',
							styleHtmlContent: false,
							width: 10,
							text: 'All'
						},
					]
				},
				{
					xtype: 'panel',
					height: 48,
					bodyStyle: 'background:none;border:0;',
					anchor: '-15',
					layout: {
						type: 'column'
					},
					items: [
						{
							xtype: 'datefield',
							itemId: 'cair_startdate',
							name: 'cair_startdate',
							fieldLabel: 'Cair Date',
							labelSeparator: '',
							width: 90,
							labelAlign: 'top',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u'
						},
						{
							xtype: 'label',
							margin: '23px 5px 0 5px',
							styleHtmlContent: false,
							width: 10,
							text: 'to'
						},
						{
							xtype: 'datefield',
							itemId: 'cair_enddate',
							name: 'cair_enddate',
							fieldLabel: '&nbsp;',
							labelSeparator: '',
							width: 90,
							labelAlign: 'top',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u'
						},
						{
							xtype: 'checkboxfield',
							margin: '30px 5px 0 5px',
							itemId: 'cbf_cair_date',
							name: 'cbf_cair_date',
							fieldLabel: '',
							checked: true,
							inputValue: '1',
							uncheckedValue: '0'
						},
						{
							xtype: 'label',
							margin: '30px 5px 0 5px',
							styleHtmlContent: false,
							width: 10,
							text: 'All'
						},
					]
				}
			],
			dockedItems: me.generateDockedItems()
		});

		me.callParent(arguments);
	}
});