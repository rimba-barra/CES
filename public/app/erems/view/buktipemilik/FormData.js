Ext.define('Erems.view.buktipemilik.FormData', {
	extend   : 'Erems.library.template.view.FormData',
	alias    : 'widget.buktipemilikformdata',
	requires : [
		// 'Erems.library.template.component.Clustercombobox',
		// 'Erems.library.template.component.Notariscombobox',
		// 'Erems.view.buktipemilik.Hgbajbgrid',
		// 'Erems.view.buktipemilik.Customerdocumentgrid',
		// 'Erems.view.buktipemilik.BankGridAkad'
	],
	frame       : true,
	autoScroll  : true,
	anchorSize  : 100,
	height      : 600,
	bodyBorder  : true,
	bodyPadding : 10,
	bodyStyle   : 'padding:5px 5px 0',
	defaults    : {
		border : false,
		xtype  : 'panel',
		flex   : 1,
		layout : ''
	},
	initComponent : function () {
		var me = this;

		function dateOneYear() {
			var x = 12;
			var CurrentDate = new Date();
			CurrentDate.setMonth(CurrentDate.getMonth() + x);
			return CurrentDate;
		}

		Ext.applyIf(me, {
			items: [
				{
					xtype  : 'hiddenfield',
					itemId : 'buktipemilik_id',
					name   : 'buktipemilik_id'
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'purchaseletter_id',
					name   : 'purchaseletter_id'
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'unit_id',
					name   : 'unit_id'
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'pbbinduk_id',
					name   : 'pbbinduk_id'
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'temp_buktipemilik_id',
					name   : 'temp_buktipemilik_id'
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'is_hgbajb_detail',
					name   : 'is_hgbajb_detail',
					value  : 'no'
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'is_use',
					name   : 'is_use',
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_plbankkpr_id',
					name   : 'purchaseletter_bankkpr_id'
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_unitstatus_id',
					name   : 'unitstatus_id'
				},
				{
					xtype       : 'panel', 
					bodyPadding : 10, 
					title       : 'UNIT INFORMATION', 
					collapsible : true,
					items       : [
						{
							layout    : 'hbox', 
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype : 'label', flex : 3
								},
								{
									flex        : 2,
									bodyPadding : 10,
									layout      : 'hbox',
									bodyStyle   : 'background-color:#FFFF99;border:0px',
									items       : [
										{
											xtype      : 'textfield',
											fieldLabel : 'State',
											labelWidth : 35,
											name       : 'unit_status',
											readOnly   : true,
											flex       : 1,
											fieldStyle : 'background-color:#FFCC00;background-image: none;'

										}, 
										me.splitter(),
										{
											xtype      : 'textfield',
											fieldLabel : 'Const. Progress',
											name       : 'unit_progress',
											value      : '0%',
											flex       : 1,
											readOnly   : true,
											fieldStyle : 'background-color:#FFCC00;background-image: none;'
										}
									]
								}
							]
						},
						{
							layout    : 'hbox',
							padding   : '10px 0 0 0',
							bodyStyle : 'border:0px',
							width     : '100%',
							items     : [
								{
									xtype  : 'panel', 
									flex   : 8,
									layout : {
										type           : 'vbox',
										defaultMargins : { top : 0, right : 0, bottom : 10, left : 0 }
									},
									bodyStyle : 'border:0px',
									items     : [
										{
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											width     : '100%',
											items     : [
												{
													fieldLabel : 'Kawasan / Cluster',
													xtype      : 'textfield',
													anchor     : '-5',
													name       : 'cluster_code',
													flex       : 5,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}, 
												me.splitter(),
												{
													xtype      : 'clustercombobox',
													store      : '',
													itemId     : 'fd_clustercb',
													fieldLabel : '',
													anchor     : '-5',
													name       : 'unit_cluster_id',
													flex       : 6,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}
											]
										},
										{
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											width     : '100%',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Block name',
													anchor     : '-5',
													name       : 'block_code',
													flex       : 5,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												},
												me.splitter(), 
												{
													xtype      : 'blockcombobox',
													store      : '',
													itemId     : 'fd_blockcb',
													fieldLabel : '',
													anchor     : '-5',
													name       : 'unit_block_id',
													flex       : 6,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}
											]
										},
										{
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											width     : '100%',
											items     : [
												{
													xtype      : 'combobox',
													fieldLabel : 'Kavling / Unit No. ',
													anchor     : '-5',
													name       : 'unit_unit_number',
													flex       : 6,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}, 
												me.splitter(),
												{xtype: 'label', text: '', flex: 2}
											]
										},
										{
											layout    : 'hbox',
											itemId    : 'box_ppndptp',
											bodyStyle : 'border:0px',
											width     : '100%',
											hidden : true,
											items     : [
												{
													xtype      : 'combobox',
													fieldLabel : ' ',
													anchor     : '-5',
													name       : 'text_nonppn',
													value      : 'UNIT PPN DTP',
													flex       : 6,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;border-color:#ff0000 !important;color:#ff0000 !important;text-align:center;'
												}, 
												me.splitter(),
												{xtype: 'label', text: '', flex: 2}
											]
										}
									]
								},
								me.splitter(30),
								{
									xtype  : 'panel', 
									flex   : 7,
									layout : {
										type           : 'vbox',
										defaultMargins : { top : 0, right : 0, bottom : 10, left : 0}
									},
									bodyStyle : 'border:0px',
									items     : [
										{
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											width     : '100%',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'PT Name',
													anchor     : '-5',
													name       : 'unit_pt_name',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}
											]
										},
										{
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											width     : '100%',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Product Category',
													anchor     : '-5',
													name       : 'unit_productcategory',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}
											]
										},
										{
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											width     : '100%',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Type',
													anchor     : '-5',
													name       : 'unit_type_name',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}
											]
										},
										{
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											width     : '100%',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Land Size',
													anchor     : '-5',
													name       : 'unit_land_size',
													flex       : 12,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												},
												{
													xtype  : 'label', 
													text   : 'm2', 
													flex   : 1, 
													margin : '0 0 0 10px'
												},
												me.splitter(30),
												{
													xtype      : 'textfield',
													fieldLabel : 'Long',
													anchor     : '-5',
													name       : 'unit_long',
													flex       : 6,
													readOnly   : true,
													labelWidth : 30,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												},
												{
													xtype  : 'label', 
													text   : 'm', 
													flex   : 1, 
													margin : '0 0 0 10px'
												}
											]
										},
										{
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											width     : '100%',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Building Size',
													anchor     : '-5',
													name       : 'unit_building_size',
													flex       : 12,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												},
												{
													xtype  : 'label', 
													text   : 'm2', 
													flex   : 1, 
													margin : '0 0 0 10px'
												},
												me.splitter(30),
												{
													xtype      : 'textfield',
													fieldLabel : 'Width',
													anchor     : '-5',
													name       : 'unit_width',
													flex       : 6,
													labelWidth : 30,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												},
												{
													xtype  : 'label', 
													text   : 'm', 
													flex   : 1, 
													margin : '0 0 0 10px'
												}
											]
										},
										{
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											width     : '100%',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Kelebihan Tanah',
													anchor     : '-5',
													name       : 'unit_kelebihan',
													flex       : 12,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												},
												{
													xtype  : 'label', 
													text   : 'm2', 
													flex   : 1, 
													margin : '0 0 0 10px'
												},
												me.splitter(30),
												{
													xtype      : 'textfield',
													fieldLabel : 'Floor',
													anchor     : '-5',
													name       : 'unit_floor',
													flex       : 6,
													labelWidth : 30,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												},
												{
													xtype  : 'label', 
													text   : '', 
													flex   : 1, 
													margin : '0 0 0 10px'
												}
											]
										},
										{
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											width     : '100%',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Floor Size',
													anchor     : '-5',
													name       : 'unit_floor_size',
													flex       : 12,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												},
												{
													xtype  : 'label', 
													text   : 'm2', 
													flex   : 1, 
													margin : '0 0 0 10px'
												},
												me.splitter(30),
												{
													xtype      : 'hiddenfield',
													fieldLabel : '',
													anchor     : '-5',
													flex       : 6,
													labelWidth : 30,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												},
												{
													xtype  : 'label', 
													text   : '', 
													flex   : 1, 
													margin : '0 0 0 10px'
												}
											]
										}
									]
								}
							]
						}

					]
				},
				/* PURCHASE LETTER INFORMATION */
				{
					xtype       : 'panel', 
					bodyPadding : 10, 
					title       : 'PURCHASE LETTER INFORMATION', 
					collapsible : true,
					width       : '100%',
					items       : [
						{
							xtype     : 'panel',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype     : 'panel',
									width     : '100%',
									flex      : 3,
									bodyStyle : 'border:0px',
									items     : [
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Purchase Letter No.',
													anchor     : '-5',
													name       : 'purchaseletter_no',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}, 
												me.splitter(20),
												{
													xtype      : 'xdatefield',
													fieldLabel : 'Purchase Letter Date',
													anchor     : '-5',
													name       : 'purchase_date',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;',
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Customer Name',
													anchor     : '-5',
													name       : 'customer_name',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}, 
												me.splitter(20),
												{
													xtype      : 'xphonenumberfieldEST',
													fieldLabel : 'Telephone',
													name       : 'customer_homephone',
													flex       : 1,
													readOnly   : true,
													anchor     : '-5',
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;',
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Salesman',
													anchor     : '-5',
													name       : 'salesman_name',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}, 
												me.splitter(20),
												{
													xtype      : 'xphonenumberfieldEST',
													fieldLabel : 'Mobile Phone',
													name       : 'customer_mobilephone',
													flex       : 1,
													readOnly   : true,
													anchor     : '-5',
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Pendanaan',
													anchor     : '-5',
													name       : 'customer_pendanaan',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}, 
												me.splitter(20),
												{
													xtype      : 'textfield',
													fieldLabel : 'Bank',
													anchor     : '-5',
													name       : 'customer_bank',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Email',
													anchor     : '-5',
													name       : 'customer_email',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}, 
												me.splitter(20),
												{
													xtype      : 'textfield',
													fieldLabel : 'Member',
													anchor     : '-5',
													name       : 'clubcitra_member',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'xdatefield',
													fieldLabel : 'Tanggal Rencana Serahterima',
													anchor     : '-5',
													name       : 'rencana_serahterima_date',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;',
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype  : 'buktipemilikcustomerdocumentgrid',
													width  : '100%',
													itemId : 'MyCustomerDocumentGrid'
												}
											]
										}
									]
								},
							]
						}
					]
				},
				/* COLLECTION INFORMATION */
				{
					xtype       : 'panel', 
					bodyPadding : 10, 
					title       : 'COLLECTION INFORMATION', 
					collapsible : true,
					width       : '100%',
					items       : [
						{
							xtype     : 'panel',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype     : 'panel',
									width     : '100%',
									flex      : 3,
									bodyStyle : 'border:0px',
									items     : [
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Harga Jual',
													anchor     : '-5',
													name       : 'harga_jual',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}, 
												me.splitter(20),
												{
													xtype      : 'xdatefield',
													fieldLabel : 'KPR ACC Date',
													anchor     : '-5',
													name       : 'kpapprove_date',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;',
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Harga Netto',
													anchor     : '-5',
													name       : 'harga_netto',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}, 
												me.splitter(20),
												{
													xtype      : 'textfield',
													fieldLabel : 'Debitur',
													anchor     : '-5',
													name       : 'debitur_name',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;',
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype  : 'label',
													anchor : '-5',
													flex   : 1,
												}, 
												me.splitter(20),
												{
													xtype      : 'xdatefield',
													fieldLabel : 'Akad Date',
													anchor     : '-5',
													name       : 'akad_realisasiondate',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;',
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Pembayaran DP',
													anchor     : '-5',
													name       : 'totalpayment_detail',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}, 
												me.splitter(20),
												{
													xtype      : 'textfield',
													fieldLabel : 'Lama KPR (Tahun)',
													anchor     : '-5',
													name       : 'kpr_installment_time',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Down Payment',
													anchor     : '-5',
													name       : 'uangmuka_value',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												},
												me.splitter(20),
												{
													xtype      : 'textfield',
													fieldLabel : 'Sisa Cicilan / KPR',
													anchor     : '-5',
													name       : 'sisacicilan_value',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'checkbox',
													fieldLabel : 'Status Lunas',
													name       : 'is_lunas',
													flex       : 1,
													readOnly   : true
												},
												me.splitter(20),
												{
													xtype      : 'checkboxfield',
													fieldLabel : 'Tunda Pembayaran Biaya Legalitas',
													name       : 'is_tundapembayaran_legalitas',
													flex       : 1,
													inputValue     : '1',
													uncheckedValue : '0',
												}
											]
										},
										me.splitter(20),
										{
											xtype       : 'fieldset',
											bodyPadding : 10,
											width       : '100%',
											title       : 'Bank KPR',
											items       : [
												{
													padding   : '10px 0 0 0',
													layout    : 'hbox',
													bodyStyle : 'border:0px',
													items     : [
														{
															xtype: 'buktipemilikbankgrid',
															width: '100%',
															itemId: 'MyBankGrid'
														}
													]
												},
											]
										},
										me.splitter(20),
										{
											xtype       : 'fieldset',
											bodyPadding : 10,
											width       : '100%',
											title       : 'Akad Confirmation',
											items       : [
												{
													padding   : '10px 0 0 0',
													layout    : 'hbox',
													bodyStyle : 'border:0px',
													items     : [
														{
															xtype  : 'buktipemilikbankgridakad',
															width  : '100%',
															itemId : 'MyAkadConfirmationGrid'
														}
													]
												},
											]
										}
									]
								},
							]
						}
					]
				},
				/* SPPJB INFORMATION */
				{
					xtype       : 'panel', 
					bodyPadding : 10, 
					title       : 'SPPJB INFORMATION', 
					collapsible : true,
					width       : '100%',
					items       : [
						{
							xtype     : 'panel',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype     : 'panel',
									width     : '100%',
									flex      : 3,
									bodyStyle : 'border:0px',
									items     : [
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'SPPJB No',
													anchor     : '-5',
													name       : 'sppjb_sppjb_no',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}, 
												me.splitter(20),
												{
													xtype      : 'xdatefield',
													fieldLabel : 'SPPJB Date',
													anchor     : '-5',
													name       : 'sppjb_sppjb_date',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;',
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'SPPJB Name',
													anchor     : '-5',
													name       : 'sppjb_sppjb_name',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												},
												me.splitter(20),
												{
													xtype        : 'xdatefield',
													fieldLabel : 'Serah Terima Date',
													anchor     : '-5',
													name       : 'sppjb_serahterima_date',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;',
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'xdatefield',
													fieldLabel : 'Sign Date',
													anchor     : '-5',
													name       : 'sppjb_tandatangan_date',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;',
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											itemId    : 'box_notariil',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'No Akta Notariil',
													anchor     : '-5',
													name       : 'akta_notaril_no',
													flex       : 1,
												},
												me.splitter(20),
												{
													xtype      : 'textfield',
													fieldLabel : 'Nama Notaris',
													anchor     : '-5',
													name       : 'notaris',
													flex       : 1,
												},
											]
										},
										{
											padding   : '10px 0 0 0',
											itemId    : 'box_akta',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'xdatefield',
													fieldLabel : 'Tanggal Akta',
													anchor     : '-5',
													name       : 'tanggal_akta',
													flex       : 1,
												},
												me.splitter(20),
												{
													xtype      : 'xdatefield',
													fieldLabel : 'Tanggal Tanda Tangan',
													anchor     : '-5',
													name       : 'tanggal_tanda_tangan',
													flex       : 1,
												}
											]
										},
									]
								},
							]
						}
					]
				},
				/* AKTA PPJB INFORMATION */
				{
					xtype       : 'panel', 
					bodyPadding : 10, 
					title       : 'AKTA PPJB INFORMATION', 
					collapsible : true,
					width       : '100%',
					items       : [
						{
							xtype     : 'panel',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype     : 'panel',
									width     : '100%',
									flex      : 3,
									bodyStyle : 'border:0px',
									items     : [
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Akta PPJB No',
													anchor     : '-5',
													name       : 'aktappjb_aktappjb_no',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												},
												me.splitter(20),
												{
													xtype      : 'xdatefield',
													fieldLabel : 'Akta PPJB Date',
													anchor     : '-5',
													name       : 'aktappjb_aktappjb_date',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;',
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Akta PPJB Name',
													anchor     : '-5',
													name       : 'aktappjb_aktappjb_name',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												},
												me.splitter(20),
												{
													xtype      : 'xdatefield',
													fieldLabel : 'Serah Terima Date',
													anchor     : '-5',
													name       : 'aktappjb_handover_date',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;',
												}
											]
										},
									]
								},
							]
						}
					]
				},
				/* IMB INFORMATION (IMB INDUK) */
				{
					xtype       : 'panel', 
					bodyPadding : 10, 
					title       : 'IMB INFORMATION (IMB INDUK)', 
					collapsible : true,
					width       : '100%',
					items       : [
						{
							xtype     : 'panel',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype     : 'panel',
									width     : '100%',
									flex      : 3,
									bodyStyle : 'border:0px',
									items     : [
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype            : 'textfield',
													fieldLabel       : 'IMB Number',
													anchor           : '-5',
													name             : 'imb_no',
													flex             : 1,
													maskRe           : /[A-Za-z0-9\s./\-]/,
													enforceMaxLength : true,
													maxLength        : 50
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'xdatefield',
													fieldLabel : 'IMB Date',
													anchor     : '-5',
													name       : 'imb_date',
													flex       : 1,
													value      : new Date(),
													editable   : false,
												},
												me.splitter(20),
												{
													xtype      : 'xdatefield',
													fieldLabel : 'Send to Legal',
													anchor     : '-5',
													name       : 'imb_legal_date',
													flex       : 1,
													value      : new Date(),
													editable   : false,
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'xdatefield',
													fieldLabel : 'Tgl. Reg',
													anchor     : '-5',
													name       : 'reg_date',
													flex       : 1,
													editable   : false,
												},
												me.splitter(20),
												{
													xtype      : 'xdatefield',
													fieldLabel : 'Target IMB',
													anchor     : '-5',
													name       : 'imb_target_date',
													flex       : 1,
													editable   : false,
												}
											]
										},
										{
											padding   : '10px 0 10px 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'xdatefield',
													fieldLabel : 'Tgl. Ijin - BPT',
													anchor     : '-5',
													name       : 'ijin_tobpt_date',
													flex       : 1,
													editable   : false,
												},
												me.splitter(20),
												{
													xtype      : 'xdatefield',
													fieldLabel : 'Tgl. BPT - Ijin',
													anchor     : '-5',
													name       : 'bpt_toijin_date',
													flex       : 1,
													editable   : false,
												}
											]
										},
										{
											padding   : '10px 0 10px 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'xdatefield',
													fieldLabel : 'Tgl. Akta Subrogasi',
													anchor     : '-5',
													name       : 'tanggal_akta_subrogasi',
													flex       : 1,
													readOnly   : true
												},
												me.splitter(20),
												{
													xtype            : 'textfield',
													fieldLabel       : 'No. Akta Subrogasi',
													anchor           : '-5',
													name             : 'no_akta_subrogasi',
													flex             : 1,
													maskRe           : /[A-Za-z0-9\s./\-]/,
													enforceMaxLength : true,
													maxLength        : 50,
													readOnly         : true
												},
											]
										},
										{
											padding   : '10px 0 10px 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'notariscombobox',
													store      : '',
													fieldLabel : 'Notaris',
													anchor     : '-5',
													itemId     : 'fd_hgbajb_notaris_id',
													name       : 'notaris_id',
													flex       : 1,
													listeners  : {
														beforequery : function (record) {
															record.query    = new RegExp(record.query, 'i');
															record.forceAll = true;
														}
													},
													readOnly   : true
												},
												me.splitter(20),
												{
													xtype          : 'checkboxfield',
													fieldLabel     : 'Unit Sudah Dikosongkan',
													name           : 'is_unit_dikosongkan',
													flex           : 1,
													inputValue     : '1',
													uncheckedValue : '0',
													readOnly       : true
												}
											]
										},

										{
											xtype       : 'fieldset',
											bodyPadding : 10,
											width       : '100%',
											title       : 'History Subrogasi',
											items       : [
												{
													padding   : '10px 0 0 0',
													layout    : 'hbox',
													bodyStyle : 'border:0px',
													items     : [
														{
															xtype  : 'buktipemilikgridhistory',
															width  : '100%',
															itemId : 'MyGridHistory'
														}
													]
												},
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'checkboxfield',
													fieldLabel : 'Hold Legal',
													name       : 'is_holdlegal',
													flex       : 1,
													inputValue     : '1',
													uncheckedValue : '0',
													readOnly   : true
												}
											]
										},
										{
											padding   : '5px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype            : 'xnotefieldEST',
													fieldLabel       : 'Notes Hold Legal',
													name             : 'notes_holdlegal',
													flex             : 1,
													readOnly 		 : true
												}
											]
										}
									]
								}
							]
						},
						{
							xtype       : 'fieldset',
							bodyPadding : 10,
							width       : '100%',
							title       : 'Additional Information (Surabaya)',
							items       : [
								{
									padding   : '5px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype      : 'xdatefield',
											fieldLabel : 'Tgl SK Terbit',
											name       : 'sk_terbit_date',
											flex       : 1,
											editable   : false,
										},
										me.splitter(20),
										{
											xtype      : 'textfield',
											fieldLabel : 'Status',
											name       : 'status_sby',
											flex       : 1
										}
									]
								},
								{
									padding   : '5px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									width     : '100%',
									items     : [
										{
											xtype      : 'radiogroup',
											fieldLabel : 'Terbit Untuk',
											name       : 'group_terbit_untuk_sby',
											items      : [
												{
													padding    : '0 0 0 10px',
													xtype      : 'radiofield',
													boxLabel   : 'Order',
													name       : 'terbit_untuk_sby',
													inputValue : 'Order',
													itemId     : 'terbit_untuk_sby_order',
													width : '100%'
												},
												{
													padding    : '0 0 0 10px',
													xtype      : 'radiofield',
													boxLabel   : 'Masal',
													name       : 'terbit_untuk_sby',
													inputValue : 'Masal',
													itemId     : 'terbit_untuk_sby_masal',
													width : '100%'
												}
											]
										}
									]
								},
								{
									padding   : '5px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype      : 'xnotefieldEST',
											fieldLabel : 'Keterangan',
											name       : 'keterangan_sby',
											flex       : 1,
										}
									]
								}
							]
						}
					]
				},
				/* IMB PECAHAN */
				{
					xtype       : 'panel', 
					bodyPadding : 10, 
					title       : 'IMB PECAHAN', 
					collapsible : true,
					width       : '100%',
					items       : [
						{
							xtype     : 'panel',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype     : 'panel',
									width     : '100%',
									flex      : 3,
									bodyStyle : 'border:0px',
									items     : [
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype            : 'textfield',
													fieldLabel       : 'IMB Number',
													anchor           : '-5',
													name             : 'imb_pecahan_no',
													flex             : 1,
													maskRe           : /[A-Za-z0-9\s./\-]/,
													enforceMaxLength : true,
													maxLength        : 50
												},
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'xdatefield',
													fieldLabel : 'IMB Date',
													anchor     : '-5',
													name       : 'imb_pecahan_date',
													flex       : 1,
													editable   : false,
												},
												me.splitter(20),
												{
													xtype      : 'xdatefield',
													fieldLabel : 'Tgl. Reg',
													anchor     : '-5',
													name       : 'reg_pecahan_date',
													flex       : 1,
													editable   : false,
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'xdatefield',
													fieldLabel : 'Tgl. Ijin - BPT',
													anchor     : '-5',
													name       : 'ijin_tobpt_pecahan_date',
													flex       : 1,
													editable   : false,
												},
												me.splitter(20),
												{
													xtype      : 'xdatefield',
													fieldLabel : 'Tgl. BPT - Ijin',
													anchor     : '-5',
													name       : 'bpt_toijin_pecahan_date',
													flex       : 1,
													editable   : false,
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'xdatefield',
													fieldLabel : 'Send to Legal',
													anchor     : '-5',
													name       : 'imb_legal_pecahan_date',
													flex       : 1,
													editable   : false,
												},
												me.splitter(20),
												{
													xtype      : 'xdatefield',
													fieldLabel : 'Send to<br>Customer / Bank',
													anchor     : '-5',
													name       : 'imb_buy_date',
													flex       : 1,
													value      : new Date(),
													editable   : false,
												}
											]
										},
									]
								}
							]
						}
					]
				},
				/* IMB KHUSUS */
				{
					xtype       : 'panel', 
					bodyPadding : 10, 
					title       : 'IMB KHUSUS', 
					collapsible : true,
					width       : '100%',
					items       : [
						{
							xtype     : 'panel',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype     : 'panel',
									width     : '100%',
									flex      : 3,
									bodyStyle : 'border:0px',
									items     : [
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype            : 'textfield',
													fieldLabel       : 'IMB Khusus No',
													anchor           : '-5',
													name             : 'imb_khusus_no',
													flex             : 1,
													maskRe           : /[A-Za-z0-9\s.]/,
													enforceMaxLength : true,
													maxLength        : 30
												},
												me.splitter(20),
												{
													xtype      : 'xdatefield',
													fieldLabel : 'Tgl. Reg',
													anchor     : '-5',
													name       : 'reg_khusus_date',
													flex       : 1,
													editable   : false,
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'xdatefield',
													fieldLabel : 'Tgl. Ijin - BPT',
													anchor     : '-5',
													name       : 'ijin_tobpt_khusus_date',
													flex       : 1,
													editable   : false,
												},
												me.splitter(20),
												{
													xtype      : 'xdatefield',
													fieldLabel : 'Tgl. BPT - Ijin',
													anchor     : '-5',
													name       : 'bpt_toijin_khusus_date',
													flex       : 1,
													editable   : false,
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'xdatefield',
													fieldLabel : 'Send to Legal',
													anchor     : '-5',
													name       : 'imb_legal_khusus_date',
													flex       : 1,
													editable   : false,
												},
												me.splitter(20),
												{
													xtype      : 'xdatefield',
													fieldLabel : 'Send to<br>Customer / Bank',
													anchor     : '-5',
													name       : 'imb_buy_khusus_date',
													flex       : 1,
													value      : new Date(),
													editable   : false,
												}
											]
										},
									]
								}
							]
						}
					]
				},
				/* PBB INDUK INFORMATION */
				{
					xtype       : 'panel', 
					bodyPadding : 10, 
					title       : 'PBB INDUK INFORMATION', 
					collapsible : true,
					width       : '100%',
					items       : [
						{
							xtype     : 'panel',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype     : 'panel',
									width     : '100%',
									flex      : 3,
									bodyStyle : 'border:0px',
									items     : [
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'combobox',
													fieldLabel : 'PBB Induk',
													anchor     : '-5',
													name       : 'pbbinduk_code',
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												},
												me.splitter(),
												{
													xtype   : 'button',
													text    : 'Browse',
													itemId  : 'fd_browse_pbbinduk_btn',
													padding : '2px 5px',
													action  : 'browse_pbbinduk',
													iconCls : 'icon-search',
													style   : 'background-color:#FFC000;'
												},
												me.splitter(45),
												{
													xtype      : 'xgeneralfieldEST',
													fieldLabel : 'Kecamatan',
													anchor     : '-5',
													name       : 'pbbinduk_kecamatan_id',
													flex       : 1,
													readOnly   : true
												}]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'NOP',
													anchor     : '-5',
													name       : 'nop',
													flex       : 1,
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'xdatefield',
													fieldLabel : 'Tgl. Ijin - Pemda',
													anchor     : '-5',
													name       : 'pbb_ijin_topemda_date',
													flex       : 1,
													editable   : false,
												}, 
												me.splitter(20),
												{
													xtype      : 'xdatefield',
													fieldLabel : 'Tgl. Pemda - Ijin',
													anchor     : '-5',
													name       : 'pbb_pemda_toijin_date',
													flex       : 1,
													editable   : false,
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Girik',
													anchor     : '-5',
													name       : 'girik',
													flex       : 1,
													hidden     : true
												}
											]
										},
										{
											xtype      : 'xdatefield',
											fieldLabel : 'Tgl. Terima SSP',
											anchor     : '-5',
											name       : 'ssp_terima_date',
											flex       : 1,
											editable   : false,
										},
										// added by rico 10082023
										{
											xtype       : 'fieldset',
											bodyPadding : 10,
											width       : '100%',
											title       : 'NJOP',
											items       : [
												{
													padding   : '10px 0 0 0',
													layout    : 'hbox',
													bodyStyle : 'border:0px',
													items     : [
														{
															xtype  : 'buktipemilikgridnjop',
															width  : '100%',
															itemId : 'MyGridNjop'
														}
													]
												},
											]
										},
									]
								},
							]
						}
					]
				},
				/* AFTER SALES */
				{
					xtype       : 'panel', 
					bodyPadding : 10, 
					title       : 'AFTER SALES', 
					collapsible : true,
					width       : '100%',
					items       : [
						{
							xtype     : 'panel',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype     : 'panel',
									width     : '100%',
									flex      : 3,
									bodyStyle : 'border:0px',
									items     : [
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'xdatefield',
													fieldLabel : 'Tgl. Serah Terima',
													anchor     : '-5',
													name       : 'aftersales_st_date',
													flex       : 1,
													editable   : false,
												}
											]
										}
									]
								},
							]
						}
					]
				},
				/* SITE PLAN */
				{
					xtype       : 'panel', 
					bodyPadding : 10, 
					title       : 'SITE PLAN', 
					collapsible : true,
					width       : '100%',
					items       : [
						{
							xtype     : 'panel',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype     : 'panel',
									width     : '100%',
									flex      : 3,
									bodyStyle : 'border:0px',
									items     : [
										{
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype     : 'fieldset',
													title     : 'PENGURUSAN',
													flex      : 2,
													layout    : 'vbox',
													bodyStyle : 'border:0px',
													items     : [
														{
															layout    : 'hbox',
															bodyStyle : 'border:0px',
															flex      : 7,
															items     : [
																{
																	xtype      : 'xdatefield',
																	fieldLabel : 'Tgl. Ijin - Pemda',
																	anchor     : '-5',
																	name       : 'pengurusan_ijin_topemda_date',
																	flex       : 1,
																	editable   : false,
																},
															]
														},
														{
															padding   : '10px 0 0 0',
															layout    : 'hbox',
															bodyStyle : 'border:0px',
															flex      : 7,
															items     : [
																{
																	xtype      : 'xdatefield',
																	fieldLabel : 'Tgl. Pemda - Ijin',
																	anchor     : '-5',
																	name       : 'pengurusan_pemda_toijin_date',
																	flex       : 1,
																	editable   : false,
																},
															]
														},
													]
												},
												{
													xtype     : 'fieldset',
													title     : 'PENGUKURAN',
													flex      : 2,
													layout    : 'vbox',
													bodyStyle : 'border:0px',
													items     : [
														{
															layout    : 'hbox',
															bodyStyle : 'border:0px',
															flex      : 7,
															items     : [
																{
																	xtype      : 'xdatefield',
																	fieldLabel : 'Tgl. Ijin - BPN',
																	anchor     : '-5',
																	name       : 'pengukuran_ijin_tobpn_date',
																	flex       : 1,
																	editable   : false,
																},
															]
														},
														{
															padding   : '10px 0 0 0',
															layout    : 'hbox',
															bodyStyle : 'border:0px',
															flex      : 7,
															items     : [
																{
																	xtype      : 'xdatefield',
																	fieldLabel : 'Tgl. BPN - Ijin',
																	anchor     : '-5',
																	name       : 'pengukuran_bpn_toijin_date',
																	flex       : 1,
																	editable   : false,
																},
															]
														},
													]
												}
											]
										}
									]
								},
							]
						}
					]
				},
				/* NOTARIS */
				{
					xtype       : 'panel', 
					bodyPadding : 10, 
					title       : 'NOTARIS', 
					collapsible : true,
					width       : '100%',
					items       : [
						{
							xtype     : 'panel',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype     : 'panel',
									width     : '100%',
									flex      : 3,
									bodyStyle : 'border:0px',
									items     : [
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'notariscombobox',
													store      : '',
													fieldLabel : 'Akta Pinjam Pakai',
													anchor     : '-5',
													itemId     : 'fd_notaris_akta_id',
													name       : 'notaris_akta_id',
													flex       : 1,
													listeners  : {
														beforequery: function (record) {
															record.query = new RegExp(record.query, 'i');
															record.forceAll = true;
														}
													}
												},
												{
													xtype: 'splitter', width: 20,
												},
												{
													xtype      : 'notariscombobox',
													store      : '',
													fieldLabel : 'Order AJB',
													anchor     : '-5',
													itemId     : 'fd_notaris_ajb_id',
													name       : 'notaris_ajb_id',
													flex       : 1,
													listeners  : {
														beforequery: function (record) {
															record.query = new RegExp(record.query, 'i');
															record.forceAll = true;
														}
													}
												},
											]
										}
									]
								},
							]
						}
					]
				},
				/* NOTES */
				{
					xtype       : 'panel', 
					bodyPadding : 10, 
					title       : 'NOTES', 
					collapsible : true,
					width       : '100%',
					items       : [
						{
							xtype     : 'panel',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype     : 'panel',
									width     : '100%',
									flex      : 3,
									bodyStyle : 'border:0px',
									items     : [
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'xnotefieldEST',
													fieldLabel : 'Notes',
													labelWidth : 130,
													anchor     : '-5',
													name       : 'note_bp',
													flex       : 1,
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'xnotefieldEST',
													fieldLabel : 'Notes Akad',
													labelWidth : 130,
													anchor     : '-5',
													name       : 'akad_note_bp',
													flex       : 1,
												}
											]
										}
									]
								},
							]
						}
					]
				},
				/* DETAIL HGB / AJB */
				{
					xtype       : 'panel', 
					bodyPadding : 10, 
					title       : 'DETAIL HGB / AJB', 
					collapsible : true,
					width       : '100%',
					items       : [
						{
							xtype : 'label',
							name  : 'tunggakan_lbl',
							style : 'font-weight:bold;color:red',
							width : '100%',
							text  : ''
						},
						{
							xtype : 'label',
							name  : 'catatan_lbl',
							style : 'font-weight:bold;color:red',
							width : '100%',
							text  : ''
						},
						{
							xtype     : 'panel',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype     : 'panel',
									width     : '100%',
									flex      : 3,
									bodyStyle : 'border:0px',
									items     : [
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype  : 'buktipemilikhgbajbgrid',
													width  : '100%',
													itemId : 'MyHgbAjbGrid'
												}
											]
										},
									]
								},
							]
						}
					]
				},
			],
			dockedItems: me.generateDockedItem()
		});

		me.callParent(arguments);
	},
	splitter : function(w=5){
		var x = { xtype : 'splitter', width : w };
		return x;
	}
});