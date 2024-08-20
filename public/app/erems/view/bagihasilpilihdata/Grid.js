Ext.define('Erems.view.bagihasilpilihdata.Grid', {
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.bagihasilpilihdatagrid',
	store: 'Bagihasilpilihdata',
	bindPrefixName: 'Bagihasilpilihdata',
	// itemId:'',
	newButtonLabel: 'New LRP',
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			contextMenu: me.generateContextMenu(),
			dockedItems: [
				{
					xtype: 'toolbar',
					dock: 'top',
					height: 28,
					items: [
						{
							xtype: 'button',
							action: 'update',
							disabled: true,
							hidden: true,
							itemId: 'btnEdit',
							margin: '0 5 0 0',
							iconCls: 'icon-edit',
							text: 'Edit',
							bindAction: me.bindPrefixName + 'Update'
						},
						{
							xtype: 'button',
							action: 'delete',
							disabled: true,
							hidden: true,
							itemId: 'btnDelete',
							margin: '0 5 0 0',
							iconCls: 'icon-delete',
							text: 'Unset LRP',
							bindAction: me.bindPrefixName + 'Delete'
						},
						{
							xtype: 'button',
							action: 'viewLookup',
							// hidden: true,
							itemId: 'btnView',
							margin: '0 5 0 0',
							//padding:5,
							iconCls: 'icon-search',
							// bindAction: me.bindPrefixName + 'Read',
							// bindAction: me.bindPrefixName + 'ViewLookup',
							text: 'View',
							disabled: true
						},
						{
							xtype: 'tbspacer',
							flex: 1
						},
						{
							xtype: 'button',
							action: 'action0',
							align: 'right',
							width: 50,
							margin: '0 5 0 0',
							text: '<div style="width:15px;height:15px;background-color:none;border:1px #000 solid;">&nbsp;&nbsp;&nbsp;&nbsp;</span> ALL',
						},
						{
							xtype: 'button',
							action: 'action1',
							align: 'right',
							width: 110,
							margin: '0 5 0 0',
							text: '<div style="width:15px;height:15px;background-color:#FCD03D;border:1px #000 solid;">&nbsp;&nbsp;&nbsp;&nbsp;</span> Sudah Diset',
						},
						{
							xtype: 'button',
							action: 'action2',
							align: 'right',
							width: 120,
							margin: '0 5 0 0',
							text: '<div style="width:15px;height:15px;background-color:#FFFFFF;border:1px #000 solid;">&nbsp;&nbsp;&nbsp;&nbsp;</span> Belum Diset',
						},
					]
				},
				{
					xtype: 'pagingtoolbar',
					dock: 'bottom',
					width: 360,
					displayInfo: true,
					store: this.getStore()
				}
			],
			viewConfig: {
				listeners: {
					refresh: function (view) {
						var color, nodes, node, record, level, flag, cells, j, i;
						var jno, jid;
						// get all grid view nodes
						nodes = view.getNodes();
						for (i = 0; i < nodes.length; i++) {
							node = nodes[i];
							// get node record
							record = view.getRecord(node);
							// get level from record data    
							if (record.get("set_lrp") == "1") {
								level = '#FCD03D';
							} else if (record.get("set_lrp") == "2") {
								level = '#FFFFFF';
							} /*else {
							 level = '#FFFAF0';
							 }*/



							cells = Ext.get(node).query('td');
							// set bacground color to all row td elements
							for (j = 0; j < cells.length; j++) {
								Ext.fly(cells[j]).setStyle('background-color', level);
							}
						}
					},
					itemclick: function(dv, record, item, index, e) {
						var id_lrp = record.get('landrepayment_id');
						if (id_lrp == 0) {
							me.down('[itemId=btnView]').setVisible(false);
						}else{
							me.down('[itemId=btnView]').setVisible(true);
						}
    				}
				}
			},
			selModel: Ext.create('Ext.selection.CheckboxModel', {

			}),
			columns: [
				{
					xtype: 'rownumberer'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_purchaseletter_id',
					width: 50,
					align: 'right',
					hidden: true,
					dataIndex: 'purchaseletter_id',
					text: 'ID'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_pt_name',
					width: 150,
					hideable: false,
					dataIndex: 'pt_name',
					text: 'PT Name'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_cluster',
					width: 100,
					hideable: false,
					dataIndex: 'cluster',
					text: 'Cluster'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_type_name',
					width: 100,
					dataIndex: 'type_name',
					hideable: false,
					text: 'Type'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_block',
					width: 60,
					dataIndex: 'block',
					hideable: false,
					text: 'Block'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_unit_number',
					width: 60,
					dataIndex: 'unit_number',
					hideable: false,
					text: 'Unit'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_purchaseletter_no',
					width: 150,
					dataIndex: 'purchaseletter_no',
					hideable: false,
					text: 'Purchase Letter No.'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_firstpurchase_date',
					width: 120,
					dataIndex: 'firstpurchase_date',
					hideable: false,
					text: 'First Purchase Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_purchase_date',
					width: 120,
					dataIndex: 'purchase_date',
					hideable: false,
					text: 'Purchase Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_customer_name',
					width: 150,
					dataIndex: 'customer_name',
					hideable: false,
					text: 'Customer Name'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_pricetype',
					width: 100,
					hideable: false,
					dataIndex: 'pricetype',
					text: 'Price Type'
				},
				{
                    xtype: 'booleancolumn',
                    itemId: 'colms_is_nonppn',
                    width: 50,
                    resizable: false,
                    align: 'center',
                    dataIndex: 'is_nonppn',
                    text: 'Insentif<br/>Pajak',
                    falseText: ' ',
                    trueText: '&#10003;'
                },
				{
					xtype: 'numbercolumn',
					itemId: 'colms_harga_total_jual',
					width: 150,
					dataIndex: 'harga_total_jual',
					align: 'right',
					hideable: false,
					text: 'Harga Total Jual'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_total_payment',
					width: 150,
					dataIndex: 'total_payment',
					align: 'right',
					hideable: false,
					text: 'Total Bayar'
				}, {
					xtype: 'numbercolumn',
					itemId: 'colms_persen_payment',
					width: 50,
					dataIndex: 'persen_payment',
					hideable: false,
					align: 'right',
					text: '% Pay'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_akad_realisasiondate',
					width: 120,
					dataIndex: 'akad_realisasiondate',
					hideable: false,
					text: 'Tgl. Akad',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_akad_realisasiondate',
					width: 120,
					dataIndex: 'akad_realisasiondate',
					hideable: false,
					text: 'Tgl. Akad',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_sppjb_date',
					width: 120,
					dataIndex: 'sppjb_date',
					hideable: false,
					text: 'Tgl. SPPJB',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_aktappjb_date',
					width: 120,
					dataIndex: 'aktappjb_date',
					hideable: false,
					text: 'Tgl. Akta PPJB',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				/* {
				 xtype: 'booleancolumn',
				 itemId: 'colms_is_prosesbagihasil',
				 width: 100,
				 resizable: false,
				 align: 'center',
				 dataIndex: 'is_prosesbagihasil',
				 text: 'Proses Bagi Hasil',
				 falseText: ' ',
				 trueText: '&#10003;'
				 },
				 {
				 xtype: 'gridcolumn',
				 itemId: 'colms_kelompok_edit',
				 width: 60,
				 align: 'right',
				 dataIndex: 'kelompok_edit',
				 text: 'Kelompok'
				 }, */
				{
					xtype: 'numbercolumn',
					itemId: 'colms_progress_contruction',
					width: 150,
					dataIndex: 'progress_contruction',
					align: 'right',
					hideable: false,
					text: 'Construction Progress (%)'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_range_name',
					width: 100,
					hideable: false,
					dataIndex: 'range_name',
					text: 'Range Name'
				},

				me.generateActionColumn()
			]
		});

		me.callParent(arguments);
	}
});


