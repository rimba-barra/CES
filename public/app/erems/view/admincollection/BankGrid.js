Ext.define('Erems.view.admincollection.BankGrid', {
	extend: 'Erems.library.template.view.Grid',
	alias: 'widget.admincollectionbankgrid',
	store: 'Bankkpr',
	bindPrefixName: 'Bankkpr',
	newButtonLabel: 'New Bank KPR',
	height: 200,
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			contextMenu: me.generateContextMenu(),
			dockedItems: me.generateDockedItems(),
			viewConfig: {
			},
			// selModel    : { 
			// 	selType       : 'checkboxmodel',
			// 	mode          : 'SINGLE',
			// 	allowDeselect : true               
   //          },
			selModel: Ext.create('Ext.selection.CheckboxModel', {
				mode : 'SINGLE',
				checkOnly: 'true',
        		allowDeselect: true, 
			}),
			columns: [
				{
					xtype: 'rownumberer'
				},
				{
					header    : "Use",
					hideable  : false,
					width     : 50,
					resizable : false,
					align     : 'center',
					renderer  : me.renderRadioBox,
					editor    : {
						xtype : 'radio'
					},
					listeners: {
						click: function (view, rec, item, index, e, eOpt) {
							var itmChkrencana = me.getStore().find('is_rencana_kpr', true);
							// console.log(item, itmChkrencana)

							if(eOpt.get('is_use') == true){
								eOpt.set('is_use', false);
							}
							else{
								if(itmChkrencana > -1 && item != itmChkrencana){
									Ext.Msg.show({
										title   : 'Warning',
										msg     : 'Bank rencana akan otomatis sama dengan bank use.',
										icon    : Ext.Msg.WARNING,
										buttons : '',
									});

									setTimeout(function(){
										Ext.Msg.close();
									}, 1000);
								}

								me.getStore().each(function (recd) {
									if (recd != null) {
										recd.set("is_use", false);
										recd.set("is_rencana_kpr", false);
									}
								});

								var record = me.getStore().getAt(item);
								record.set("is_use", true);
								record.set("is_rencana_kpr", true);
							}
						}
					}
				},
				{
					xtype     : 'booleancolumn',
					itemId    : 'colms_is_use',
					width     : 50,
					resizable : false,
					align     : 'center',
					dataIndex : 'is_use',
					hidden    : true,
					text      : 'Use',
					falseText : ' ',
					trueText  : '&#10003;'
				},
				{
					header    : "Rencana",
					hideable  : false,
					width     : 50,
					resizable : false,
					align     : 'center',
					renderer  : me.renderRadioBox_rencana,
					editor    : {
						xtype : 'radio'
					},
					listeners: {
						click: function (view, rec, item, index, e, eOpt) {
							if(eOpt.get('is_rencana_kpr') == true){
								eOpt.set('is_rencana_kpr', false);
							}
							else{
								var itmChkuse = me.getStore().find('is_use', true),
									indexUpdt = item;

								if(itmChkuse > -1  && itmChkuse != item){
									indexUpdt = itmChkuse;

									Ext.Msg.show({
										title   : 'Warning',
										msg     : 'Bank rencana akan otomatis sama dengan bank use.',
										icon    : Ext.Msg.WARNING,
										buttons : ''
									});

									setTimeout(function(){
										Ext.Msg.close();
									}, 1000);
								}

								setTimeout(function(){
									me.getStore().each(function (recd, i) {
										if (recd != null) {
											recd.set("is_rencana_kpr", false);
										}
									});

									var r = me.getStore().getAt(indexUpdt);
									r.set("is_rencana_kpr", true);
								}, 50);
							}
						},
					}
				},
				{
					xtype: 'booleancolumn',
					itemId: 'colms_is_rencana_kpr',
					width: 50,
					resizable: false,
					align: 'center',
					dataIndex: 'is_rencana_kpr',
					//hideable: false,
					hidden: true,
					text: 'Use',
					falseText: ' ',
					trueText: '&#10003;'
				},
				me.generateActionColumn(),
				{
					xtype: 'gridcolumn',
					itemId: 'colms_bank_id',
					width: 75,
					align: 'right',
					dataIndex: 'bank_id',
					hideable: false,
					text: 'Bank ID'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_bank_name',
					width: 150,
					dataIndex: 'bank_name',
					hideable: false,
					text: 'Bank Name'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_berkasmasuk_date',
					width: 150,
					dataIndex: 'berkasmasuk_date',
					hideable: false,
					text: 'Tgl Masuk Berkas',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_berkasbank_date',
					width: 150,
					dataIndex: 'berkasbank_date',
					hideable: false,
					text: 'Tanggal Di Bank',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_interviewplan_date',
					width: 150,
					dataIndex: 'interviewplan_date',
					hideable: false,
					text: 'Interview Plan Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_interview_date',
					width: 150,
					dataIndex: 'interview_date',
					hideable: false,
					text: 'Interview Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_kpr_interest',
					width: 100,
					dataIndex: 'kpr_interest',
					hideable: false,
					text: 'KPR Interest'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_kpr_acc_date',
					width: 150,
					dataIndex: 'kpr_acc_date',
					hideable: false,
					text: 'ACC KPR Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_kpr_realisation',
					width: 150,
					align: 'right',
					dataIndex: 'kpr_realisation',
					hideable: false,
					text: 'KPR Realisation'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_kpr_tenor',
					width: 100,
					align: 'right',
					dataIndex: 'kpr_tenor',
					hideable: false,
					text: 'KPR Tenor'
				},
				{
					xtype: 'numbercolumn',
					itemId: 'colms_kpr_cicilan',
					width: 150,
					align: 'right',
					dataIndex: 'kpr_cicilan',
					hideable: false,
					text: 'Cicilan'
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_akadplan_date',
					width: 150,
					dataIndex: 'akadplan_date',
					hideable: false,
					text: 'Akad Plan Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
				{
					xtype: 'gridcolumn',
					itemId: 'colms_akad_date',
					width: 150,
					dataIndex: 'akad_date',
					hideable: false,
					text: 'Akad Date',
					renderer: Ext.util.Format.dateRenderer('d-m-Y')
				},
			]
		});

		me.callParent(arguments);
	},

	generateDockedItems: function () {

		var me = this;

		var dockedItems = [
			{
				xtype: 'toolbar',
				dock: 'top',
				height: 28,
				items: [
					{
						xtype: 'button',
						action: 'create',
						hidden: true,
						itemId: 'btnNew',
						margin: '0 0 0 0',
						iconCls: 'icon-new',
						bindAction: me.bindPrefixName + 'Create',
						text: me.newButtonLabel
					},
					{
						xtype: 'button',
						hidden: false,
						itemId: 'btnRemoveCheck',
						margin: '0 0 0 0',
						action: 'removecheck',
						iconCls: 'icon-delete',
						text: 'Clear Is Use Check',
						listeners: {
							click: function () {
								var store = me.getStore();
								store.each(function (recd) {
									recd.set("is_use", false);
								});
							}
						}
					},
                    {
                        text: 'Print',
						iconCls: 'icon-print',
                        menu: {
                            xtype: 'menu',
                            items: [
								{
									xtype: 'button',
									hidden: false,
									itemId: 'btnPrintKuitansi',
									margin: '0 0 0 0',
									action: 'printkuitansi',
									text: 'Kuitansi',
								},
								{
									xtype: 'button',
									disabled: true,
									hidden: false,
									itemId: 'btnPrintSuratLunasDP',
									margin: '0 0 0 0',
									action: 'printsuratlunasdp',
									text: 'Surat Lunas DP',
								},
								{
									xtype: 'button',
									disabled: true,
									hidden: false,
									itemId: 'btnPrintFeeKPR',
									margin: '0 0 0 0',
									action: 'printfeekpr',
									text: 'Fee KPR',
								},
								// added by rico 13022023
								{
									xtype: 'button',
									disabled: true,
									hidden: false,
									itemId: 'btnPrintSuratKuasa',
									margin: '0 2 0 0',
									action: 'printsuratkuasa',
									text: 'Surat Kuasa',
								},
								// added by rico 06042023
								// {
								// 	xtype: 'button',
								// 	disabled: true,
								// 	hidden: false,
								// 	itemId: 'btnPrintCoverNotes',
								// 	margin: '0 0 0 0',
								// 	action: 'printcovernotes',
								// 	iconCls: 'icon-print',
								// 	text: 'Cover Notes',
								// },
								// added by rico 12052023
								{
									xtype: 'button',
									disabled: true,
									hidden: false,
									itemId: 'btnPrintSubsidiKPR',
									margin: '0 0 0 0',
									action: 'printsubsidikpr',
									text: 'Subsidi KPR',
								},
								{
									xtype: 'button',
									disabled: true,
									hidden: false,
									itemId: 'btnPrintBuyBack',
									margin: '0 0 0 0',
									action: 'printbuyback',
									text: 'Buy Back',
								},
								{
									xtype: 'button',
									disabled: true,
									hidden: false,
									itemId: 'btnPrintKonfirmasi',
									margin: '0 0 0 0',
									action: 'printkonfirmasi',
									text: 'Konfirmasi Tunggakan Bank',
								},
                            ],
                        }
                    },
				]
			},
					/*{
					 xtype: 'pagingtoolbar',
					 dock: 'bottom',
					 width: 360,
					 displayInfo: true,
					 store: this.getStore()
					 }*/
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
			items: [
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
	},

	renderRadioBox: function (val, meta, record, rowIndex, colIndex, store) {
		var chk = record.get('is_use') ? 'checked="checked"' : '';
		return '<input type= "radio" name="radiogroup" '+chk+'/>';
	},
	renderRadioBox_rencana : function (val, meta, record, rowIndex, colIndex, store) {
		var chk = record.get('is_rencana_kpr') ? 'checked="checked"' : '';
		return '<input type= "radio" name="radiogroup_rencana_kpr" '+chk+'/>';
	},

});