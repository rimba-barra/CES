Ext.define('Erems.view.historysuratperingatan.Grid', {
	extend         : 'Erems.library.template.view.Grid',
	alias          : 'widget.historysuratperingatangrid',
	store          : 'Historysuratperingatan',
	bindPrefixName : 'Historysuratperingatan',
	newButtonLabel : 'Proses Spr',
	initComponent  : function () {
		var me = this;

		Ext.applyIf(me, {
			contextMenu : me.generateContextMenu(),
			dockedItems : me.generateDockedItems(),
			viewConfig  : {},
			selModel    : Ext.create('Ext.selection.CheckboxModel', {}),
			columns     : [
				{
					xtype     : 'rownumberer',
					width     : 40,
					resizable : true
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_cluster',
					width     : 100,
					dataIndex : 'cluster',
					text      : 'Cluster'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_unit_number',
					width     : 100,
					dataIndex : 'unit_number',
					hideable  : false,
					text      : 'Unit No'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_purchaseletter_no',
					width     : 150,
					dataIndex : 'purchaseletter_no',
					hideable  : false,
					text      : 'Purchaseletter No'
				},
				// added by rico 03082023
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_sppjb_no',
					width     : 150,
					dataIndex : 'sppjb_no',
					hideable  : false,
					text      : 'PPJB No'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_purchase_date',
					width     : 100,
					dataIndex : 'purchase_date',
					hideable  : false,
					text      : 'Purchase Date',
					renderer  : Ext.util.Format.dateRenderer('d-m-Y'),
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_tandatangan_date',
					width     : 100,
					dataIndex : 'tandatangan_date',
					hideable  : false,
					text      : 'PPJB Sign Date',
					renderer  : Ext.util.Format.dateRenderer('d-m-Y'),
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_suratperingatan_date',
					width     : 100,
					dataIndex : 'suratperingatan_date',
					hideable  : false,
					text      : 'SPr Date',
					renderer  : Ext.util.Format.dateRenderer('d-m-Y'),
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_suratperingatan_index',
					width     : 100,
					dataIndex : 'suratperingatan_index',
					hideable  : false,
					text      : 'SPr Ke',
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_suratperingatan_next_date',
					width     : 100,
					dataIndex : 'suratperingatan_next date',
					hideable  : false,
					text      : 'SPr Plan Date',
					renderer  : Ext.util.Format.dateRenderer('d-m-Y'),
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_nama_customer',
					width     : 150,
					dataIndex : 'customer_name',
					hideable  : false,
					text      : 'Nama Customer'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_mobile_phone',
					width     : 150,
					dataIndex : 'customer_mobilephone',
					hideable  : false,
					text      : 'Hand Phone'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_home_phone',
					width     : 150,
					dataIndex : 'customer_homephone',
					hideable  : false,
					text      : 'Home Phone'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_office_phone',
					width     : 150,
					dataIndex : 'customer_officephone',
					hideable  : false,
					text      : 'Office Phone'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_address',
					width     : 150,
					dataIndex : 'customer_address',
					hideable  : false,
					text      : 'Address (Corespondent)'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_KTP_address',
					width     : 150,
					dataIndex : 'customer_ktp_address',
					hideable  : false,
					text      : 'KTP Address'
				},
			]
		});

		me.callParent(arguments);
	},

	generateDockedItems: function () {
		var me = this;

		var dockedItems = [
			{
				xtype  : 'toolbar',
				dock   : 'top',
				height : 28,
				items  : [
					// {
					//     xtype: 'button',
					//     action: 'create',
					//     //                        hidden: true,
					//     itemId: 'btnProsesSpr',
					//     margin: '0 5 0 0',
					//     iconCls: 'icon-new',
					//     disabled: true,
					//     bindAction: me.bindPrefixName + 'Create',
					//     text: me.newButtonLabel
					// },
					{
						xtype    : 'button',
						action   : 'cetak',
						itemId   : 'btnCetak',
						margin   : '0 5 0 0',
						text     : 'Cetak Surat Peringatan',
						disabled : true,
					},
				]
			},
			{
				xtype       : 'pagingtoolbar',
				dock        : 'bottom',
				width       : 360,
				displayInfo : true,
				store       : this.getStore()
			}
		];
		return dockedItems;
	},
});