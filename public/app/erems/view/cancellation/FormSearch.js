Ext.define('Erems.view.cancellation.FormSearch', {
	extend: 'Erems.library.template.view.FormSearch',
	alias: 'widget.cancellationformsearch',
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			defaults: me.generateDefaults(),
			items: [
				{
					xtype: 'textfield',
					fieldLabel: 'Unit Number',
					itemId: 'unit_number',
					name: 'unit_number',
					anchor: '-15',
					enableKeyEvents: true
				},
				{
					xtype: 'clustercombobox',
					itemId: 'fs_cluster_id',
					name: 'cluster_id',
					anchor: '-15',
					forceSelection: true,
					listeners: {
						beforequery: function (record) {
							record.query = new RegExp(record.query, 'i');
							record.forceAll = true;
						}
					}

				},
				{
					xtype: 'blockcombobox',
					itemId: 'fs_block_id',
					name: 'block_id',
					anchor: '-15',
					forceSelection: true,
					listeners: {
						beforequery: function (record) {
							record.query = new RegExp(record.query, 'i');
							record.forceAll = true;
						}
					}

				},
				// {
				// xtype: 'panel',
				// height: 48,
				// bodyStyle:'background:none;border:0;',
				// anchor:'-15',
				// layout: {
				// type: 'column'
				// },
				// items: [
				// {
				// xtype: 'numberfield',
				// minValue: 0,
				// itemId: 'kavling_number_start',
				// name: 'kavling_number_start',
				// fieldLabel: 'Kavling Number',
				// labelSeparator:'',
				// width: 100,
				// labelAlign: 'top',
				// },
				// {
				// xtype: 'label',
				// margin: '23px 5px 0 5px',
				// styleHtmlContent: false,
				// width: 10,
				// text:'to'
				// },
				// {
				// xtype: 'numberfield',
				// minValue: 0,
				// itemId: 'kavling_number_end',
				// name: 'kavling_number_end',
				// fieldLabel: '&nbsp;',
				// labelSeparator:'',
				// width: 100,
				// labelAlign: 'top',
				// },
				// ]
				// },

				/*{
				 xtype: 'customercombobox',
				 itemId:'fs_customer',
				 name: 'customer_id',
				 anchor:'-15'
				 },*/
				{
					xtype           : 'xnamefieldEST',
					itemId          : 'customer_name',
					name            : 'customer_name',
					fieldLabel      : 'Customer name',
					anchor          : '-15',
					enableKeyEvents : true
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
							itemId: 'cancellation_startdate',
							name: 'cancellation_startdate',
							fieldLabel: 'Cancellation date',
							labelSeparator: '',
							width: 100,
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
							itemId: 'cancellation_enddate',
							name: 'cancellation_enddate',
							fieldLabel: '&nbsp;',
							labelSeparator: '',
							width: 100,
							labelAlign: 'top',
							editable: false,
							format: 'd-m-Y',
							altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
							submitFormat: 'Y-m-d H:i:s.u'
						},
					]
				}
			],
			dockedItems: me.generateDockedItems()
		});

		me.callParent(arguments);
	}
});