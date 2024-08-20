Ext.define('Erems.view.admincollection.Grid', {
	extend         : 'Erems.library.template.view.Grid',
	alias          : 'widget.admincollectiongrid',
	store          : 'Admincollection',
	bindPrefixName : 'Admincollection',
	newButtonLabel : 'New',
	initComponent  : function () {
		var me = this;

		Ext.applyIf(me, {
			contextMenu : me.generateContextMenu(),
			dockedItems : me.generateDockedItems(),
			viewConfig  : {},
			selModel    : Ext.create('Ext.selection.CheckboxModel', {}),
			columns     : [
				{
					xtype : 'rownumberer'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_cluster',
					width     : 100,
					align     : 'right',
					dataIndex : 'cluster',
					text      : 'Cluster'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_block',
					width     : 60,
					dataIndex : 'block',
					hideable  : false,
					text      : 'Block'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_unit_number',
					width     : 60,
					dataIndex : 'unit_number',
					hideable  : false,
					text      : 'Unit'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_customer_name',
					width     : 150,
					dataIndex : 'customer_name',
					hideable  : false,
					text      : 'Customer Name'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_purchaseletter_no',
					width     : 150,
					dataIndex : 'purchaseletter_no',
					hideable  : false,
					text      : 'Purchase Letter No.'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_purchase_date',
					width     : 150,
					dataIndex : 'purchase_date',
					hideable  : false,
					text      : 'Purchase Date',
					renderer  : Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_type_name',
					width     : 150,
					dataIndex : 'type_name',
					hideable  : false,
					text      : 'Type'
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_harga_jual',
					width     : 150,
					dataIndex : 'harga_jual',
					text      : 'Harga Jual'
				},
				{
					xtype     : 'numbercolumn',
					itemId    : 'colms_total_payment',
					width     : 150,
					dataIndex : 'total_payment',
					text      : 'Total Bayar'
				},
				{
					xtype     : 'booleancolumn',
					itemId    : 'colms_is_pay',
					width     : 50,
					resizable : false,
					align     : 'center',
					dataIndex : 'is_pay',
					text      : 'Pays',
					falseText : ' ',
					trueText  : '&#10003;'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_salesman',
					width     : 150,
					dataIndex : 'salesman_name',
					hideable  : false,
					text      : 'Salesman'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_clubname',
					width     : 150,
					dataIndex : 'clubname',
					hideable  : false,
					text      : 'Citra Club Name'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_pricetype',
					width     : 100,
					dataIndex : 'pricetype',
					hideable  : false,
					text      : 'Price Type'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_bank_name',
					width     : 150,
					dataIndex : 'bank_name',
					hideable  : false,
					text      : 'Bank Name'
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_progress',
					width     : 75,
					dataIndex : 'progress',
					hideable  : false,
					text      : 'Progress'
				},
				/*{
					xtype: 'gridcolumn',
					itemId: 'colms_berkas',
					width: 150,
					dataIndex: 'berkas',
					hideable: false,
					text: 'Berkas'
				},*/
				{
					xtype     : 'booleancolumn',
					itemId    : 'colms_is_alreadyakad',
					width     : 50,
					resizable : false,
					align     : 'center',
					dataIndex : 'is_alreadyakad',
					text      : 'Akad',
					falseText : ' ',
					trueText  : '&#10003;'
				},
				/*{
					xtype: 'gridcolumn',
					itemId: 'colms_pengakuan',
					width: 150,
					dataIndex: 'pengakuan',
					hideable: false,
					text: 'Pengakuan'
				},*/
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_uangmukatype',
					width     : 150,
					dataIndex : 'uangmukatype',
					hideable  : false,
					text      : 'Jenis UM'
				},

				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_pengakuan_penjualan_date',
					width     : 150,
					dataIndex : 'pengakuan_penjualan_date',
					hidden    : true,
					text      : 'Tgl. Pengakuan Penjualan',
					renderer  : Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype     : 'gridcolumn',
					width     : 50,
					dataIndex : 'is_recommended_tocancel',
					hideable  : false,
					hidden    : true,
					text      : 'is_recommended_tocancel',
				},
				{
					xtype     : 'gridcolumn',
					width     : 50,
					dataIndex : 'recommended_tocancel_id',
					hideable  : false,
					hidden    : true,
					text      : 'recommended_tocancel_id',
				},
				{
					xtype     : 'gridcolumn',
					itemId    : 'colms_kpr_date_adjust',
					width     : 150,
					dataIndex : 'kpr_date_adjust',
					hidden    : true,
					text      : 'KPR Date',
					renderer  : Ext.util.Format.dateRenderer('d-m-Y')
				},

				me.generateActionColumn()
			]
		});

		me.callParent(arguments);
	},
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
					if (record.get("recommended_tocancel_id") == "1") {
						level = '#FCD03D';
					} else if (record.get("recommended_tocancel_id") == "2") {
						level = '#F1C9BA';
					} else {
						level = '#FFFAF0';
					}



					cells = Ext.get(node).query('td');
					// set bacground color to all row td elements
					for (j = 0; j < cells.length; j++) {
						Ext.fly(cells[j]).setStyle('background-color', level);
					}
				}
			}
		}
	},

	generateDockedItems: function () {
		var me = this;

		var dockedItems = [
			{
				xtype      : 'toolbar',
				dock       : 'top',
				layout     : 'column',
				autoHeight : true,
				items      : [
					{
						xtype      : 'buttongroup',
						style      : 'background:none;border:none;float:left;',
						layout     : 'column',
						autoHeight : true,
						width      : '70%',
						items      : [
							{
								xtype      : 'button',
								action     : 'pencairan',
								disabled   : true,
								hidden     : true,
								itemId     : 'btnPencairan',
								margin     : '0 5 0 0',
								bindAction : me.bindPrefixName + 'pencairanCreate',
								iconCls    : 'icon-new',
								text       : 'Pencairan',
								ctxMenu    : true,
							},
							{
								xtype    : 'button',
								action   : 'full_kpr_payment',
								disabled : true,
								itemId   : 'btnFullKPRPayment',
								margin   : '0 5 0 0',
								iconCls  : 'icon-new',
								text     : 'Progress Escrow',
								hidden   : true,
								ctxMenu  : true,
							},
							{
								xtype      : 'button',
								action     : 'create',
								hidden     : true,
								itemId     : 'btnNew',
								margin     : '0 5 0 0',
								iconCls    : 'icon-new',
								bindAction : me.bindPrefixName + 'Create',
								text       : me.newButtonLabel
							},
							{
								xtype      : 'button',
								action     : 'update',
								disabled   : true,
								hidden     : true,
								itemId     : 'btnEdit',
								margin     : '0 5 0 0',
								iconCls    : 'icon-edit',
								text       : 'Edit',
								bindAction : me.bindPrefixName + 'Update',
								ctxMenu    : true,
							},
							{
								xtype      : 'button',
								action     : 'destroy',
								disabled   : true,
								hidden     : true,
								itemId     : 'btnDelete',
								bindAction : me.bindPrefixName + 'Delete',
								iconCls    : 'icon-delete',
								text       : 'Delete Selected',
								ctxMenu    : true,

							},
							{
								xtype      : 'button',
								action     : 'print',
								hidden     : true,
								itemId     : 'btnPrint',
								margin     : '0 5 0 0',
								bindAction : me.bindPrefixName + 'Print',
								iconCls    : 'icon-print',
								text       : 'Print / Save',
								ctxMenu    : true,
							},
							{
								xtype    : 'button',
								action   : 'pengakuan_penjualan',
								disabled : true,
								hidden   : true,
								itemId   : 'btnPengakuanPenjualan',
								margin   : '0 5 0 0',
								text     : 'Pengakuan Penjualan',
								ctxMenu  : true,
							},
							{
								xtype    : 'button',
								action   : 'full_payment',
								disabled : true,
								itemId   : 'btnFullPayment',
								margin   : '0 5 0 0',
								text     : 'KPR Payment',
								ctxMenu  : true,
							},
							{
								xtype    : 'button',
								action   : 'full_kpr_payment',
								disabled : true,
								itemId   : 'btnFullKPRPayment',
								margin   : '0 5 0 0',
								text     : 'Progress Escrow',
								ctxMenu  : true,
							},
							{
								xtype    : 'button',
								action   : 'collector',
								disabled : true,
								itemId   : 'btnCollector',
								margin   : '0 5 0 0',
								text     : 'Collector',
								ctxMenu  : true,
							},
							//added by anas 31052021
							{
								xtype    : 'button',
								action   : 'add_open',
								disabled : true,
								itemId   : 'btnOpen',
								margin   : '0 5 0 0',
								text     : 'Open Hari VA',
								ctxMenu  : true,
							},
							{
								xtype    : 'button',
								action   : 'simulation_payment',
								disabled : true,
								itemId   : 'btnSimulationPayment',
								margin   : '0 5 0 0',
								text     : 'Simulasi Payment',
								ctxMenu  : true,
							},
							{
								xtype    : 'button',
								action   : 'adjustkprdate',
								disabled : true,
								itemId   : 'btnAdjustkprdate',
								margin   : '0 5 0 0',
								text     : 'Adjust KPR Date',
								ctxMenu  : true,
							},
						]
					},
					{
						xtype : 'tbspacer',
						flex  : 1
					},
					{
						xtype      : 'buttongroup',
						style      : 'background:none;border:none;float:right;',
						layout     : 'column',
						autoHeight : true,
						items      : [
							{
								xtype  : 'button',
								action : 'action0',
								align  : 'right',
								width  : 50,
								margin : '0 5 0 0',
								text   : '<div style="width:15px;height:15px;background-color:#FFFAF0;border:1px #000 solid;">&nbsp;&nbsp;&nbsp;&nbsp;</span> ALL',
							},
							{
								xtype  : 'button',
								action : 'action1',
								align  : 'right',
								width  : 110,
								margin : '0 5 0 0',
								text   : '<div style="width:15px;height:15px;background-color:#FCD03D;border:1px #000 solid;">&nbsp;&nbsp;&nbsp;&nbsp;</span> Batal By Legal',
							},
							{
								xtype  : 'button',
								action : 'action2',
								align  : 'right',
								width  : 120,
								margin : '0 5 0 0',
								text   : '<div style="width:15px;height:15px;background-color:#F1C9BA;border:1px #000 solid;">&nbsp;&nbsp;&nbsp;&nbsp;</span> Batal By Collection',
							},
        				]
					}

				]
			},
			{
				xtype: 'pagingtoolbar',
				dock: 'bottom',
				width: 360,
				displayInfo: true,
				store: this.getStore()
			}
		];
		return dockedItems;
	},
	generateActionColumn: function () {
		var me = this;
		var ac = {
			xtype: 'actioncolumn',
			hidden: true,
			itemId: 'actioncolumn',
			width: 50,
			resizable: false,
			align: 'right',
			hideable: false,
			renderer: function (value, metadata, record) {
				if (record.get('pricetype') == 'KPR') {
					this.items[0].disabled = false;
				} else {
					this.items[0].disabled = true;
				}
			},
			items: [
				{
					text: 'Pencairan',
					iconCls: 'icon-new',
					bindAction: me.bindPrefixName + 'pencairanCreate',
					altText: 'Pencairan',
					tooltip: 'Pencairan'
				},
				{
					text: 'Edit',
					iconCls: 'icon-edit',
					bindAction: me.bindPrefixName + 'Update',
					altText: 'Edit',
					tooltip: 'Edit'
				},
				{
					text: 'Delete',
					iconCls: 'icon-delete',
					bindAction: me.bindPrefixName + 'Delete',
					altText: 'Delete',
					tooltip: 'Delete'
				}
			]
		};
		return ac;
	}

});