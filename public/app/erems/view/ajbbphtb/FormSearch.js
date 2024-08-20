Ext.define('Erems.view.ajbbphtb.FormSearch', {
	extend: 'Erems.library.template.view.FormSearch',
	alias: 'widget.ajbbphtbformsearch',
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
					anchor: '-15'
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
				/*{
				 xtype: 'unitcombobox',
				 itemId: 'fs_unit_id',
				 name: 'unit_id',
				 anchor:'-15'
				 
				 },*/
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

				// {
				// 	xtype: 'customercombobox',
				// 	itemId:'fs_customer',
				// 	name: 'customer_id',
				// 	anchor:'-15'
				// },
				{
					xtype: 'textfield',
					itemId: 'fs_customer',
					name: 'customer_id',
					fieldLabel: 'Customer Name',
					anchor: '-15'
				},
				{
					xtype: 'textfield',
					itemId: 'ajbbphtb_no',
					name: 'ajbbphtb_no',
					fieldLabel: 'Nomor Surat',
					anchor: '-15'
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
							itemId: 'ajbbphtb_startdate',
							name: 'ajbbphtb_startdate',
							fieldLabel: 'Tanggal Surat',
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
							itemId: 'ajbbphtb_enddate',
							name: 'ajbbphtb_enddate',
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