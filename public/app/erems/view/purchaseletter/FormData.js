Ext.define('Erems.view.purchaseletter.FormData', {
	extend   : 'Erems.library.template.view.FormData',
	requires : [
		'Erems.library.template.view.combobox.Cluster2',
		'Erems.library.template.view.combobox.Block',
		'Erems.library.template.view.combobox.Kprstatus',
		'Erems.library.template.component.Pricetypecombobox',
		'Erems.view.purchaseletter.Schedulegrid',
		'Erems.library.template.view.combobox.Mediapromotion',
		'Erems.library.template.view.combobox.Saleslocation',
		'Erems.library.template.view.combobox.Bank',
		'Erems.library.template.view.combobox.Citraclub',
		'Erems.library.template.view.combobox.Salesman',
		'Erems.library.template.view.combobox.Collector',
		'Erems.library.template.view.FdUnitInformation',
		'Erems.library.template.view.combobox.Billingrules',
		'Erems.view.purchaseletter.CGrid',
		'Erems.view.purchaseletter.JBGrid',
		'Erems.library.template.component.Pricesourcecombobox',
		'Erems.library.template.component.Pricelistcombobox',
		'Erems.library.template.component.Pricelistdetailkoefisiencombobox',
	],
	alias       : 'widget.purchaseletterformdata',
	frame       : true,
	autoScroll  : true,
	anchorSize  : 100,
	height      : 600,
	bodyBorder  : true,
	bodyPadding : 10,
	editedRow   : -1,
	bodyStyle   : 'padding:5px 5px 0',
	defaults    : {
		border : false,
		xtype  : 'panel',
		flex   : 1,
		layout : ''
	},
	initComponent : function () {
		var me = this;

		Ext.applyIf(me, {
			items: [
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_id',
					name   : 'side_id'
				},
				{
					xtype : 'hiddenfield',
					name  : 'unit_unit_id'
				},
				{
					xtype : 'hiddenfield',
					name  : 'purchaseletter_id'
				},
				{
					xtype : 'hiddenfield',
					name  : 'customer_id'
				},
				{
					xtype : 'hiddenfield',
					name  : 'is_ppn'
				},
				{
					xtype       : 'panel',
					bodyPadding : 10,
					items       : [
						{
							padding   : '10px 0 0 0',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype      : 'textfield',
									fieldLabel : 'PT',
									name       : 'pt_name',
									flex       : 1,
									readOnly   : true,
									// fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
								}
							]
						}
					]
				},
				{
					xtype       : 'panel',
					bodyPadding : 10,
					items       : [
						{
							padding   : '0 0 0 0',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype      : 'textfield',
									fieldLabel : 'Nomor SP',
									name       : 'purchaseletter_no',
									flex       : 1,
								},
								{
									xtype : 'splitter', width : 20
								},
								{
									xtype        : 'datefield',
									fieldLabel   : 'Tanggal SP',
									name         : 'purchase_date',
									value        : new Date(),
									format       : 'd-m-Y',
									submitFormat : 'Y-m-d H:i:s.u',
									flex         : 1,
									editable     : false
								}
							]
						}
					]
				},
				{
					xtype       : 'panel',
					bodyPadding : 10,
					items       : [
						{
							padding   : '0 0 0 0',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype        : 'textfield',
									labelWidth   : 120,
									fieldLabel   : 'First Purchase Date',
									name         : 'firstpurchase_date',
									format       : 'd-m-Y',
									submitFormat : 'Y-m-d H:i:s.u',
									width        : 350,
									editable     : false
								}
							]
						}
					]
				},
				{
					xtype       : 'panel',
					bodyPadding : 10,
					items       : [
						{
							padding   : '0 0 0 0',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype      : 'textfield',
									fieldLabel : 'Virtual Account BCA',
									name       : 'unit_virtualaccount_bca',
									flex       : 1,
									readOnly   : true
								},
								{
									xtype : 'splitter', width : 20
								},
								{
									xtype      : 'textfield',
									fieldLabel : 'Virtual Account Mandiri',
									name       : 'unit_virtualaccount_mandiri',
									flex       : 1,
									readOnly   : true
								}
							]
						}
					]
				},
				me.unitInformation(),
				me.customerInformation(),
				me.salesInformation(),
				{
					xtype       : 'panel',
					bodyPadding : 10,
					title       : 'OTHER INFORMATION',
					id          : 'PLCONotherInformationID',
					collapsible : true,
					collapsed   : true,
					width       : '100%'
				},
				{
					xtype       : 'panel',
					bodyPadding : 10,
					title       : 'STATUS INFORMATION',
					id          : 'PLCONstatusInformationID',
					collapsible : true,
					collapsed   : true,
					width       : '100%'
				},
				me.priceInformation(),
				me.billingInformation()
			],
			dockedItems: me.generateDockedItem()
		});

		me.callParent(arguments);
	},
	generateDockedItem: function () {
		var x = [
			{
				xtype  : 'toolbar',
				dock   : 'bottom',
				ui     : 'footer',
				layout : {
					padding : 6,
					type    : 'hbox'
				},
				items : [
					{
						xtype    : 'button',
						action   : 'save',
						itemId   : 'btnSave',
						disabled : true,
						padding  : 5,
						width    : 75,
						iconCls  : 'icon-save',
						text     : 'Save'
					},
					{
						xtype   : 'button',
						action  : 'cancel',
						itemId  : 'btnCancel',
						padding : 5,
						width   : 75,
						iconCls : 'icon-cancel',
						text    : 'Cancel',
						handler : function () {
							this.up('window').close();
						}
					},
					{
						xtype   : 'button',
						action  : 'authorize',
						itemId  : 'btnAuthorize',
						hidden  : true,
						padding : 5,
						width   : 100,
						iconCls : 'icon-save',
						text    : 'Authorize'
					},
					{
						xtype    : 'button',
						action   : 'printout',
						itemId   : 'btnPrintout',
						disabled : true,
						padding  : 5,
						width    : 100,
						iconCls  : 'icon-print',
						text     : 'Printout'
					},
					{
						xtype   : 'button',
						action  : 'printsch',
						itemId  : 'btnPrintPaySch',
						padding : 5,
						width   : 130,
						iconCls : 'icon-print',
						text    : 'Payment Scheme'
					},
					{
						xtype   : 'button',
						action  : 'setaci',
						itemId  : 'btnAci',
						align   : 'center',
						padding : 5,
						width   : 100,
						text    : '&#10003; ACI',
						name    : 'apiaci'
					},
					{
						xtype    : 'button',
						action   : 'flashprint',
						disabled : true,
						hidden   : true,
						padding  : 5,
						width    : 100,
						iconCls  : 'icon-flash',
						text     : 'Flash print'
					},
					{
						xtype   : 'button',
						action  : 'printoutspt',
						itemId  : 'btnPrintoutspt',
						hidden  : true,
						padding : 5,
						width   : 100,
						iconCls : 'icon-print',
						text    : 'Printout SPT'
					},
					{
						xtype    : 'button',
						action   : 'saveDraft',
						itemId   : 'btnSaveDraft',
						disabled : true,
						hidden   : true,
						padding  : 5,
						width    : 100,
						iconCls  : 'icon-save',
						text     : 'Save Draft'
					}
				]
			}
		];
		return x;
	},
	unitInformation : function(){
		return	{
			xtype       : 'panel',
			bodyPadding : 10,
			title       : 'UNIT INFORMATION',
			collapsible : true,
			items       : [
				{
					xtype    : 'container',
					layout   : 'hbox',
					defaults : { flex : 1 },
					items : [
						{
							xtype : 'label',
							text  : ''
						},
						{
							xtype     : 'panel',
							layout    : 'hbox',
							bodyStyle : 'background-color:#FFFF99;border:0px;padding:10px 20px',
							defaults  : {
								xtype      : 'textfield',
								margin     : '0 10px 0 0',
								// fieldStyle : 'background:none;background-color:#F2F2F2;',
								labelWidth : 45,
								readOnly   : true
							},
							items : [
								{
									name       : 'unitstatus_status',
									fieldLabel : 'Status',
									flex       : 1,
									fieldStyle : 'background-color:#FFCC00;background-image: none;'
								},
								{
									name       : 'unit_progress',
									fieldLabel : 'Progress',
									flex       : 1,
									fieldStyle : 'background-color:#FFCC00;background-image: none;'
								},
								{
									xtype   : 'label',
									text    : '%',
									width   : 20,
									padding : '5px 0 0 0'
								}
							]
						}
					]
				},
				{
					xtype    : 'container',
					layout   : 'hbox',
					margin   : '10px 0 0 0',
					defaults : {
						xtype  : 'container',
						layout : 'vbox',
						flex   : 1,
						width  : '100%'
					},
					items : [
						{
							margin   : '0 20px 0 0',
							defaults : {
								xtype  : 'container',
								layout : 'hbox',
								width  : '100%',
								margin : '0 0 10px 0'
							},
							items : [
								{
									defaults : {
										xtype : 'textfield',
										width : '100%'
									},
									items : [
										{
											name       : 'cluster_code',
											fieldLabel : 'Kawasan / Cluster',
											flex       : 1,
											readOnly   : true,
											margin     : '0 5px 0 0'
										},
										{
											name       : 'cluster_cluster',
											fieldLabel : '',
											readOnly   : true,
											flex       : 1
										}
									]
								},
								{
									defaults : {
										xtype : 'textfield',
										width : '100%'
									},
									items : [
										{
											name       : 'block_code',
											fieldLabel : 'Block',
											flex       : 1,
											readOnly   : true,
											margin     : '0 5px 0 0'
										},
										{
											name       : 'block_block',
											fieldLabel : '',
											readOnly   : true,
											flex       : 1
										}
									]
								},
								{
									items : [
										{
											xtype      : 'textfield',
											width      : '100%',
											name       : 'unit_unit_number',
											fieldLabel : 'Unit Number',
											margin     : '0 5px 0 0',
											readOnly   : true,
											flex       : 2
										},
										{
											xtype  : 'button',
											text   : 'Browse Unit',
											action : 'browse_unit',
											flex   : 1
										},
										{
											xtype : 'label',
											text  : '',
											width : 50
										}
									]
								}
							]
						},
						{
							margin   : '0 20px 0 0',
							defaults : {
								xtype : 'container',
								width : '100%'
							},
							items : [
								{
									layout   : 'vbox',
									defaults : {
										xtype : 'textfield',
										width : '100%'
									},
									items : [
										{
											name       : 'productcategory_productcategory',
											fieldLabel : 'Product Category',
											readOnly   : true,
											margin     : '0 0 10px 0'
										},
										{
											name       : 'type_name',
											readOnly   : true,
											fieldLabel : 'Type',
										}
									]
								},
								{
									xtype    : 'container',
									layout   : 'vbox',
									defaults : {
										xtype  : 'container',
										layout : 'hbox',
										width  : '100%',
										margin : '0 0 10px 0'
									},
									items : [
										{
											defaults : {
												margin : '0 10px 0 0'
											},
											items : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Land Size',
													name       : 'unit_land_size',
													readOnly   : true,
													flex       : 3
												},
												{
													xtype : 'label',
													text  : 'm2',
													width : 30
												},
												{
													xtype      : 'textfield',
													name       : 'unit_floor_size',
													fieldLabel : 'Floor Size',
													labelWidth : 55,
													readOnly   : true,
													flex       : 2
												},
												{
													xtype  : 'label',
													text   : 'm2',
													width  : 20,
													margin : '0 0 0 0'
												}
											]
										},
										{
											defaults : {
												margin : '0 10px 0 0'
											},
											items : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Building Size',
													name       : 'unit_building_size',
													readOnly   : true,
													flex       : 3
												},
												{
													xtype : 'label',
													text  : 'm2',
													width : 30
												},
												{
													xtype      : 'textfield',
													name       : 'unit_long',
													fieldLabel : 'Long',
													labelWidth : 55,
													readOnly   : true,
													flex       : 2
												},
												{
													xtype  : 'label',
													text   : 'm',
													width  : 20,
													margin : '0 0 0 0'
												}
											]
										},
										{
											defaults : {
												margin : '0 10px 0 0'
											},
											items : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Kelebihan Tanah',
													name       : 'unit_kelebihan',
													readOnly   : true,
													flex       : 3
												},
												{
													xtype : 'label',
													text  : 'm2',
													width : 30
												},
												{
													xtype      : 'textfield',
													fieldLabel : 'Width',
													name       : 'unit_width',
													readOnly   : true,
													labelWidth : 55,
													flex       : 2
												},
												{
													xtype  : 'label',
													text   : 'm',
													width  : 20,
													margin : '0 0 0 0'
												}
											]
										},
										//added by anas 18102021
										{
											defaults : {
												margin : '0 10px 0 0'
											},
											items : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Electricity',
													name       : 'unit_electricity',
													readOnly   : true,
													flex       : 3
												},
												{
													xtype : 'label',
													text  : 'watt',
													width : 30
												},
												{
													xtype      : 'textfield',
													fieldLabel : 'Floor',
													name       : 'unit_floor',
													readOnly   : true,
													labelWidth : 55,
													flex       : 2
												},
												{
													xtype : 'label',
													text  : '',
													width : 20,
													margin : '0 0 0 0'
												}
											]
										},
										//end added by anas
									]
								}
							]
						}
					]
				}
			]
		};
	},
	customerInformation : function(){
		return {
			xtype       : 'panel',
			bodyPadding : 10,
			title       : 'CUSTOMER INFORMATION',
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
											xtype : 'hiddenfield',
											name  : 'customer_customer_id'
										},
										{
											xtype      : 'textfield',
											fieldLabel : 'Customer ID',
											anchor     : '-5',
											name       : 'customer_code',
											flex       : 3,
											readOnly   : true,
										},
										{
											xtype : 'splitter', width: 5,
										},
										{
											xtype   : 'button',
											text    : 'Browse Customer',
											width   : 120,
											padding : '2px 5px',
											itemId  : 'fd_browse_customer_btn',
											action  : 'browse_customer',
											iconCls : 'icon-search',
											style   : 'background-color:#FFC000;'
										},
										{
											xtype : 'label', flex: 5
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
										}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype      : 'xaddressfieldEST',
											fieldLabel : 'Alamat Koresponden',
											anchor     : '-5',
											name       : 'customer_address',
											flex       : 1,
											readOnly   : true,
											rows       : 6,
										}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype        : 'combobox',
											fieldLabel   : 'City',
											anchor       : '-5',
											name         : 'city_city_name',
											displayField : 'city_name',
											valueField   : 'city_id',
											queryMode    : 'local',
											flex         : 1,
											readOnly     : true,
											editable     : false
										},
										{
											xtype : 'splitter', width: 20,
										},
										{
											xtype      : 'textfield',
											fieldLabel : 'Zip Code',
											anchor     : '-5',
											name       : 'customer_zipcode',
											flex       : 1,
											readOnly   : true,
										}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype      : 'xphonenumberfieldEST',
											fieldLabel : 'Home phone',
											anchor     : '-5',
											name       : 'customer_home_phone',
											flex       : 1,
											readOnly   : true,
										},
										{
											xtype : 'splitter', width: 20,
										},
										{
											xtype      : 'xphonenumberfieldEST',
											fieldLabel : 'Mobile phone',
											anchor     : '-5',
											name       : 'customer_mobile_phone',
											flex       : 1,
											readOnly   : true,
										}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype      : 'xphonenumberfieldEST',
											fieldLabel : 'Office phone',
											anchor     : '-5',
											name       : 'customer_office_phone',
											flex       : 1,
											readOnly   : true,
										},
										{
											xtype : 'splitter', width: 20,
										},
										{
											xtype      : 'xphonenumberfieldEST',
											fieldLabel : 'FAX',
											anchor     : '-5',
											name       : 'customer_fax',
											flex       : 1,
											readOnly   : true,
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
											fieldLabel : 'KTP Number',
											anchor     : '-5',
											name       : 'customer_KTP_number',
											flex       : 1,
											readOnly   : true,
										}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype      : 'xaddressfieldEST',
											fieldLabel : 'KTP Address',
											anchor     : '-5',
											name       : 'customer_KTP_address',
											flex       : 1,
											readOnly   : true,
											rows       : 6,
										}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype      : 'maskfield',
											mask       : '##.###.###.#-###.###',
											fieldLabel : 'NPWP Number',
											anchor     : '-5',
											name       : 'customer_NPWP',
											flex       : 1,
											readOnly   : true,
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
											fieldLabel : 'NPWP Name',
											anchor     : '-5',
											name       : 'customer_NPWP_name',
											flex       : 1,
											readOnly   : true,
										}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype      : 'xaddressfieldEST',
											fieldLabel : 'NPWP Address',
											anchor     : '-5',
											name       : 'customer_NPWP_address',
											flex       : 1,
											readOnly   : true,
											rows       : 6,
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
											fieldLabel : 'Email Address',
											anchor     : '-5',
											name       : 'customer_email',
											flex       : 1,
											readOnly   : true,
										}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype      : 'xmoneyfieldEST',
											fieldLabel : 'Porsi Kepemilikan',
											anchor     : '-5',
											name       : 'porsi_kepemilikan_customer',
											flex       : 1.25,
											readOnly   : true,
											value      : 100.00,
											fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
										},
										{
											xtype : 'splitter', width : 5,
										},
										{
											xtype   : 'label',
											text    : '%',
											flex    : 3,
											padding : '5px 0 0 0'
										},
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									itemId    : 'kuasa_name_ID',
									items     : [
										{
											xtype      : 'textfield',
											fieldLabel : 'Nama Kuasa',
											anchor     : '-5',
											name       : 'kuasa_name',
											flex       : 1,
										}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									itemId    : 'kuasa_npwp_ID',
									items     : [
										{
											xtype      : 'maskfield',
											mask       : '##.###.###.#-###.###',
											fieldLabel : 'NPWP Kuasa',
											anchor     : '-5',
											name       : 'kuasa_npwp',
											flex       : 1,
										}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									itemId    : 'kuasa_nik_ID',
									items     : [
										{
											xtype      : 'textfield',
											fieldLabel : 'NIK KTP Kuasa',
											anchor     : '-5',
											name       : 'kuasa_nik',
											flex       : 1,
										}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									itemId    : 'kuasa_alamat_ID',
									items     : [
										{
											xtype      : 'xnotefieldEST',
											fieldLabel : 'Alamat Kuasa',
											name       : 'kuasa_alamat',
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
											xtype        : 'datefield',
											fieldLabel   : 'Tanggal Surat<br>Kepemilikan Bersama',
											anchor       : '-5',
											name         : 'tanggal_surat_kepemilikan_bersama',
											format       : 'd-m-Y',
											submitFormat : 'Y-m-d H:i:s.u',
											flex         : 1,
											readOnly     : true,
										}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype          : 'checkboxfield',
											fieldLabel     : '',
											name           : 'is_more_customer',
											boxLabel       : 'Add More Customer',
											inputValue     : '1',
											uncheckedValue : '0',
										}
									]
								},
							]
						},
						{
							xtype     : 'panel',
							flex      : 1,
							width     : '100%',
							padding   : '10px 0 0 10px',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype     : 'panel',
									height    : 200,
									bodyStyle : 'background:none',
									itemId    : 'photo_image',
									html      : '',
									width     : 160
								},
								{
									xtype   : 'button',
									text    : 'Create New Customer',
									flex    : 1,
									padding : 5,
									margin  : '5px 0',
									action  : 'create_new_customer',
									iconCls : 'icon-add'
								}
							]
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					width     : '100%',
					items     : [
						{
							xtype  : 'morecustomergrid',
							width  : '100%',
							itemId : 'CGrid',
							hidden : true,
						}
					]
				},
			]
		};
	},
	salesInformation : function(){
		return {
			xtype       : 'panel',
			bodyPadding : 10,
			title       : 'SALES INFORMATION',
			collapsible : true,
			width       : '100%',
			itemId      : 'salesInformationID',
			items       : [
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							xtype       : 'fieldset',
							title       : 'Salesgroup',
							columnWidth : 0.5,
							autoHeight  : true,
							anchor      : '-5',
							flex        : 1,
							layout      : 'column',
							itemId      : 'salesgroup_item',
							items       : [],
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							xtype           : 'textfield',
							fieldLabel      : 'Salesman',
							anchor          : '-5',
							name            : 'salesman_employee_nik',
							flex            : 2,
							enableKeyEvents : true,
							readOnly        : true,
						},
						{
							xtype : 'splitter', width : 5,
						},
						{
							xtype      : 'cbsalesman',
							fieldLabel : '',
							anchor     : '-5',
							name       : 'salesman_employee_id',
							flex       : 2,
							editable   : false
						},
						{
							xtype : 'label',
							flex  : 3
						},
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							xtype      : 'textfield',
							fieldLabel : 'Member name',
							name       : 'clubcitra_member',
							flex       : 1,
							maskRe     : /[A-Za-z\s.]/
						},
						{
							xtype : 'label', width : 100
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							xtype           : 'textfield',
							fieldLabel      : 'Club Citra Group',
							anchor          : '-5',
							name            : 'citraclub_code',
							flex            : 2,
							enableKeyEvents : true,
							readOnly        : true,
						},
						{
							xtype : 'splitter', width : 5,
						},
						{
							xtype      : 'cbcitraclub',
							fieldLabel : '',
							anchor     : '-5',
							name       : 'citraclub_citraclub_id',
							itemId     : 'citraclub_cb',
							flex       : 2
						},
						{
							xtype : 'label',
							flex  : 3
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							xtype           : 'textfield',
							fieldLabel      : 'Code KC',
							anchor          : '-5',
							width           : 205,
							name            : 'upline_employee_name',
							enableKeyEvents : true,
							readOnly        : true,
						},
						{
							xtype : 'splitter', width : 5,
						},
						{
							xtype        : 'combobox',
							queryMode    : 'local',
							fieldLabel   : '',
							width        : 205,
							anchor       : '-5',
							margin       : '0 20px 0px 0px',
							name         : 'upline_upline_id',
							valueField   : 'employee_id',
							displayField : 'employee_name',
							editable     : false
						},
						{
							xtype          : 'checkboxfield',
							fieldLabel     : '',
							name           : 'is_cac_referall',
							boxLabel       : 'Referall',
							inputValue     : '1',
							uncheckedValue : '0',
							width          : 80
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							xtype           : 'textfield',
							fieldLabel      : 'Member',
							anchor          : '-5',
							width           : 205,
							name            : 'cac_cac_code',
							enableKeyEvents : true,
							readOnly        : true,
						},
						{
							xtype : 'splitter', width : 5,
						},
						{
							xtype        : 'combobox',
							queryMode    : 'local',
							fieldLabel   : '',
							width        : 205,
							anchor       : '-5',
							margin       : '0 20px 0px 0px',
							valueField   : 'cac_id',
							displayField : 'cac_name',
							name         : 'cac_cac_id',
							listeners    : {
								beforequery: function (record) {
									record.query = new RegExp(record.query, 'i');
									record.forceAll = true;
								},
							}
						},
						{
							xtype          : 'checkboxfield',
							fieldLabel     : '',
							name           : 'is_upline_referall',
							boxLabel       : 'Referall',
							inputValue     : '1',
							uncheckedValue : '0',
							width          : 80
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							xtype           : 'textfield',
							fieldLabel      : 'Sales Location',
							anchor          : '-5',
							name            : 'saleslocation_code',
							flex            : 2,
							enableKeyEvents : true,
							readOnly        : true,
						},
						{
							xtype : 'splitter', width : 5,
						},
						{
							xtype      : 'cbsaleslocation',
							fieldLabel : '',
							anchor     : '-5',
							itemId     : 'saleslocation_cb',
							name       : 'saleslocation_saleslocation_id',
							flex       : 2
						},
						{
							xtype : 'label',
							flex  : 3
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							xtype           : 'textfield',
							fieldLabel      : 'Media Promotion',
							anchor          : '-5',
							name            : 'mediapromotion_code',
							flex            : 2,
							enableKeyEvents : true,
							readOnly        : true,
						},
						{
							xtype : 'splitter', width : 5,
						},
						{
							xtype      : 'cbmediapromotion',
							fieldLabel : '',
							anchor     : '-5',
							itemId     : 'mediapromotion_cb',
							name       : 'mediapromotion_mediapromotion_id',
							flex       : 2
						},
						{
							xtype : 'label',
							flex  : 3
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							xtype        : 'combobox',
							fieldLabel   : 'Purpose buy',
							anchor       : '-5',
							name         : 'purposebuy_purposebuy_id',
							queryMode    : 'local',
							displayField : 'purposebuy',
							valueField   : 'purposebuy_id',
							flex         : 4,
							editable     : false
						},
						{
							xtype : 'label',
							flex  : 3
						}
					]
				}

			]
		};
	},
	priceInformation : function(){
		return {
			xtype       : 'panel',
			bodyPadding : 10,
			title       : 'PRICE INFORMATION',
			collapsible : true,
			itemId      : 'priceInformationBoxId',
			width       : '100%',
			items       : [
	            {
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
	                    {
							xtype    : 'pricesourcecombobox',
							editable : false,
							hidden   : true,
							itemId   : 'pricesourcecombobox',
	                    }
	                ]
	            },
	            {
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							xtype  : 'pricelistcombobox',
							hidden : true,
	                    }
					]
				},
				{
					padding   : '10px 0 0 0',
					margin    : '0 0 10px 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							xtype      : 'pricetypecombobox',
							queryMode  : 'local',
							fieldLabel : 'Price Type',
							name       : 'pricetype_pricetype_id',
							disabled   : true,
							width      : 230,
							editable   : false
						},
						{ xtype : 'splitter', width : 10 },
						{
							xtype      : 'cbkprstatus',
							fieldLabel : '',
							name       : 'kprstatus_id',
							value      : 2,
							hidden     : true,
							width      : 110,
						},
						{
							xtype       : 'numberfield',
							fieldLabel  : 'KPP',
							hideTrigger : true,
							labelWidth  : 30,
							margin      : '0 0 0 20px',
							width       : 60,
							hidden      : true,
							name        : 'kpp',
							value       : 1,
							maxValue    : 20,
							minValue    : 1

						},
						{ xtype : 'splitter', width : 10 },
						{
							xtype  : 'pricelistdetailkoefisiencombobox',
							hidden : true,
	                    },
						{
							xtype      : 'hiddenfield',
							name       : 'pricelistdetail_id',
						},
						{ xtype : 'label', flex : 1 }
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 7,
							items     : [
								{ xtype : 'label', text: 'Harga Tanah /m2', flex : 3 },
								{ // Edit by Erwin.St 14072021
									xtype        : 'xmoneyfieldEST',
									fieldLabel   : '',
									name         : 'price_tanahpermeter',
									value        : 0.00,
									flex         : 2,
									decPrecision : 4
								},
								{ xtype: 'label', text: '/m2', width: 50, padding: '0 0 0 10px' }
							]
						},
						{ // Edit by Erwin.St 14072021
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_tanah',
							value      : 0.00,
							flex       : 3,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					cls       : 'kelebihantanahBox',
					items     : [
						{
							layout: 'hbox',
							bodyStyle: 'border:0px',
							flex: 7,
							items: [
								{ xtype: 'label', text: 'Harga Kelebihan Tanah /m2', flex: 3 },
								{ // Edit by Erwin.St 14072021
									xtype        : 'xmoneyfieldEST',
									fieldLabel   : '',
									name         : 'price_kelebihantanah',
									value        : 0.00,
									flex         : 2,
									decPrecision : 4
								},
								{ xtype: 'label', text: '/m2', width: 50, padding: '0 0 0 10px' }
							]
						},
						{ // Edit by Erwin.St 14072021
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_kelebihantanah',
							value      : 0.00,
							flex       : 3,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 7,
							items     : [
								{ xtype : 'label', itemId : 'text_harga_bangunan', text: 'Harga Bangunan', flex : 3 },
								{ // Edit by Erwin.St 14072021
									xtype           : 'xmoneyfieldEST',
									fieldLabel      : '',
									name            : 'price_bangunanpermeter',
									value           : 0.00,
									flex            : 2,
									hidden          : true,
								},
								{ xtype: 'label', itemId : 'text_permeter_harga_bangunan', text: '/m2', width: 50, padding: '0 0 0 10px', hidden : true }
							]
						},
						{ // Edit by Erwin.St 14072021
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_bangunan',
							value      : 0.00,
							flex       : 3,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					itemId    : 'boxSubsididp',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 7,
							items     : [
								{ xtype: 'label', text: 'Subsidi DP', flex: 1 },
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_subsidi_dp',
							flex       : 3,
							value      : 0.00,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					itemId    : 'boxInterior',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 7,
							items     : [
								{ xtype: 'label', text: 'Harga Interior', flex: 1 },
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_interior',
							flex       : 3,
							value      : 0.00,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 2,
							items     : [
							]
						},
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 1,
							items     : [
								{
									xtype   : 'label',
									text    : '',
									width   : '100%',
									height  : 2,
									padding : '8px 0 0 0',
									border  : '0 0 2 0',
									style   : {
										borderColor : 'black',
										borderStyle : 'solid',
									},
									flex   : 1,
									margin : '0 0'
								},
								{ xtype: 'label', text: '+', width: 20, padding: '0 0 0 10px' }
							]
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 7,
							items     : [
								{ xtype: 'label', text: 'Harga Jual Dasar', flex: 1 },
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_jualdasar',
							flex       : 3,
							readOnly   : true,
							value      : 0.00,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 7,
							items     : [
								{ xtype: 'label', text: 'Discount harga dasar', flex: 6 },
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : '',
									name       : 'price_persen_dischargadasar',
									flex       : 1,
									readOnly   : true,
									value      : 0.00,
								},
								{ xtype: 'label', text: '%', width: 50, padding: '0 0 0 10px' }
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_dischargadasar',
							flex       : 3,
							readOnly   : true,
							value      : 0.00,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 7,
							items     : [
								{ xtype: 'label', text: 'Discount harga tanah', flex: 6 },
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : '',
									name       : 'price_persen_dischargatanah',
									flex       : 1,
									readOnly   : true,
									value      : 0.00,
								},
								{ xtype: 'label', text: '%', width: 50, padding: '0 0 0 10px' }
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_dischargatanah',
							flex       : 3,
							readOnly   : true,
							value      : 0.00,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 7,
							items     : [
								{ xtype: 'label', text: 'Discount harga bangunan', flex: 6 },
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : '',
									name       : 'price_persen_dischargabangunan',
									flex       : 1,
									readOnly   : true,
									value      : 0.00,
								},
								{ xtype: 'label', text: '%', width: 50, padding: '0 0 0 10px' }
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_dischargabangunan',
							flex       : 3,
							readOnly   : true,
							value      : 0.00,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 2,
							items     : [
							]
						},
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 1,
							items     : [
								{
									xtype   : 'label',
									text    : '',
									width   : '100%',
									height  : 2,
									padding : '8px 0 0 0',
									border  : '0 0 2 0',
									style   : {
										borderColor : 'black',
										borderStyle : 'solid',
									},
									flex   : 1,
									margin : '0 0'
								},
								{ xtype: 'label', text: '-', width: 20, padding: '0 0 0 10px' }
							]
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 7,
							items     : [
								{ xtype: 'label', text: 'Harga Netto', flex: 1 },
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_neto',
							flex       : 3,
							readOnly   : true,
							value      : 0.00,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 7,
							items     : [
								{ xtype: 'label', text: 'PPN Tanah', flex: 6 },
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : '',
									name       : 'price_persen_ppntanah',
									flex       : 1,
									value      : 0.00,
								},
								{ xtype: 'label', text: '%', width: 50, padding: '0 0 0 10px' }
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_ppntanah',
							flex       : 3,
							value      : 0.00,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 7,
							items     : [
								{ xtype: 'label', text: 'PPN Bangunan', flex: 6 },
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : '',
									name       : 'price_persen_ppnbangunan',
									flex       : 1,
									value      : 0.00,
								},
								{ xtype: 'label', text: '%', width: 50, padding: '0 0 0 10px' }
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_ppnbangunan',
							flex       : 3,
							value      : 0.00,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					itemId    : 'boxPpnsubsididp',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 7,
							items     : [
								{ xtype: 'label', text: 'PPN Subsidi DP', flex: 6 },
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : '',
									name       : 'price_persen_ppnsubsidi_dp',
									flex       : 1,
									value      : 0.00,
								},
								{ xtype: 'label', text: '%', width: 50, padding: '0 0 0 10px' }
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_ppnsubsidi_dp',
							flex       : 3,
							value      : 0.00,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					itemId    : 'boxPpninterior',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 7,
							items     : [
								{ xtype: 'label', text: 'PPN Interior', flex: 6 },
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : '',
									name       : 'price_persen_ppninterior',
									flex       : 1,
									value      : 0.00,
								},
								{ xtype: 'label', text: '%', width: 50, padding: '0 0 0 10px' }
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_ppninterior',
							flex       : 3,
							value      : 0.00,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 7,
							items     : [
								{ xtype: 'label', text: 'PPNBM', flex: 6 },
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : '',
									name       : 'price_persen_ppnbm',
									flex       : 1,
									value      : 0.00,
								},
								{ xtype: 'label', text: '%', width: 50, padding: '0 0 0 10px' }
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_ppnbm',
							flex       : 3,
							value      : 0.00,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 7,
							items     : [
								{ xtype: 'label', text: 'PPH22', flex: 6 },
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : '',
									name       : 'price_persen_pph22',
									flex       : 1,
									value      : 0.00,
								},
								{ xtype: 'label', text: '%', width: 50, padding: '0 0 0 10px' }
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_pph22',
							flex       : 3,
							value      : 0.00,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 7,
							items     : [
								{ xtype: 'label', text: 'Biaya balik nama', itemId: 'labelbbn', flex: 1 },
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_bbnsertifikat',
							flex       : 3,
							value      : 0.00,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 7,
							items     : [
								{ xtype: 'label', text: 'Biaya perolehan hak', itemId: 'labelbphtb', flex: 1 },
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_bphtb',
							flex       : 3,
							value      : 0.00,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 7,
							items     : [
								{ xtype: 'label', text: 'Biaya Akta Jual Beli', itemId: 'labelajb', flex: 1 },
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_bajb',
							flex       : 3,
							value      : 0.00,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 7,
							items     : [
								{ xtype: 'label', text: 'Biaya P. Mutu', flex: 1 },
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'harga_pmutu',
							flex       : 3,
							value      : 0.00,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 2,
							items     : [
							]
						},
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 1,
							items     : [
								{
									xtype   : 'label',
									text    : '',
									width   : '100%',
									height  : 2,
									padding : '8px 0 0 0',
									border  : '0 0 2 0',
									style   : {
										borderColor : 'black',
										borderStyle : 'solid',
									},
									flex   : 1,
									margin : '0 0'
								},
								{ xtype: 'label', text: '+', width: 20, padding: '0 0 0 10px' }
							]
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 7,
							items     : [
								{ xtype: 'label', text: 'HARGA JUAL', flex: 1 },
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_jual',
							flex       : 3,
							readOnly   : true,
							value      : 0.00,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 7,
							items     : [
								{ xtype: 'label', text: 'Biaya Administrasi', flex: 1 },
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'harga_administrasi',
							flex       : 3,
							value      : 0.00,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 7,
							items     : [
								{ xtype: 'label', text: 'Biaya Paket tambahan', flex: 1 },
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'harga_paket_tambahan',
							flex       : 3,
							value      : 0.00,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 7,
							items     : [
								{ xtype: 'label', text: 'Biaya Administrasi Subsidi', flex: 1 },
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'harga_admsubsidi',
							flex       : 3,
							value      : 0.00,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 7,
							items     : [
								{ xtype: 'label', text: 'Biaya Asuransi', flex: 1 },
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'biaya_asuransi',
							flex       : 3,
							value      : 0.00,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 7,
							items     : [
								{ xtype: 'label', text: 'Discount Sales', flex: 6 },
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : '',
									name       : 'persen_salesdisc',
									flex       : 1,
									readOnly   : true,
									value      : 0.00,
								},
								{ xtype: 'label', text: '%', width: 50, padding: '0 0 0 10px' }
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'harga_salesdisc',
							flex       : 3,
							readOnly   : true,
							value      : 0.00,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 7,
							items     : [
								{ xtype: 'label', text: 'Harga Pembulatan', flex: 1 },
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'harga_pembulatan',
							flex       : 3,
							value      : 0.00,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 2,
							items     : [
							]
						},
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 1,
							items     : [
								{
									xtype   : 'label',
									text    : '',
									width   : '100%',
									height  : 2,
									padding : '8px 0 0 0',
									border  : '0 0 2 0',
									style   : {
										borderColor : 'black',
										borderStyle : 'solid',
									},
									flex   : 1,
									margin : '0 0'
								},
								{ xtype: 'label', text: '+', width: 20, padding: '0 0 0 10px' }
							]
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 7,
							items     : [
								{ xtype: 'label', text: 'HARGA TRANSAKSI', flex: 1, style: 'font-weight:bold;font-size:14px;' },
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'harga_total_jual',
							flex       : 3,
							readOnly   : true,
							value      : 0.00,
							padding    : '0 25px 0 0',
						}

					]
				},
			]
		};
	},
	billingInformation : function(){
		return {
			xtype       : 'panel',
			bodyPadding : 10,
			title       : 'BILLING INFORMATION',
			collapsible : true,
			itemId      : 'billingInformationBoxId',
			width       : '100%',
			items       : [
				{
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							xtype     : 'panel',
							flex      : 1,
							layout    : 'vbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									width     : '100%',
									items     : [
										{
											xtype      : 'textfield',
											fieldLabel : 'BANK KPR',
											name       : 'bank_bank_name',
											readOnly   : true,
											flex       : 1
										},
										{
											xtype : 'splitter', width: 5
										},
										{
											xtype      : 'cbbank',
											fieldLabel : '',
											itemId     : 'bank_cb',
											name       : 'bank_bank_id',
											readOnly   : true,
											flex       : 1,
										}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									width     : '100%',
									items     : [
										{
											xtype      : 'cbbillingrules',
											fieldLabel : 'Billing Rules',
											name       : 'billingrules_billingrules_id',
											flex       : 1,
										}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									width     : '100%',
									items     : [
										{
											xtype      : 'xmoneyfieldEST',
											fieldLabel : 'Tanda Jadi',
											name       : 'billingrules_term_tandajadi',
											flex       : 1,
											value      : 0.00,
										},
										{
											xtype : 'label', text: ' / ', width: 40, padding: '0 5px'
										},
										{
											xtype      : 'xmoneyfieldEST',
											fieldLabel : '',
											name       : 'billingrules_tandajadi',
											flex       : 1,
											value      : 0.00,
										}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									width     : '100%',
									items     : [
										{
											xtype      : 'xmoneyfieldEST',
											fieldLabel : 'Uang muka',
											name       : 'billingrules_term_uangmuka',
											flex       : 1,
											value      : 0.00,
										},
										{
											xtype : 'label', text: ' / ', width: 40, padding: '0 5px'
										}, {
											xtype      : 'xmoneyfieldEST',
											fieldLabel : '',
											name       : 'billingrules_uangmuka',
											flex       : 1,
											value      : 0.00,
										}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									width     : '100%',
									items     : [
										{
											xtype      : 'xmoneyfieldEST',
											fieldLabel : 'Sisa',
											name       : 'billingrules_term_angsuran',
											flex       : 1,
											value      : 0.00,
										},
										{
											xtype : 'label', text: ' / ', width: 40, padding: '0 5px'
										},
										{
											xtype      : 'xmoneyfieldEST',
											fieldLabel : '',
											name       : 'billingrules_angsuran',
											flex       : 1,
											readOnly   : true,
											value      : 0.00,
										}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									width     : '100%',
									items     : [
										{
											xtype : 'splitter', text: '', width: 105
										},
										{
											xtype          : 'checkboxfield',
											itemId         : 'is_ppndtp',
											name           : 'is_ppndtp',
											inputValue     : '1',
											uncheckedValue : '0',
											boxLabel       : 'Generate Schedule with PPNDTP',
											anchor         : '1',
											flex           : 1
										}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									width     : '100%',
									items     : [
										{
											xtype : 'splitter', text : '', width : 105
										},
										{
											xtype          : 'checkboxfield',
											itemId         : 'is_extend_schedule',
											name           : 'is_extend_schedule',
											inputValue     : '1',
											uncheckedValue : '0',
											boxLabel       : 'Extend Schedule (SH1)',
											anchor         : '1',
											flex           : 1
										}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									width     : '100%',
									items     : [
										{
											xtype      : 'checkboxfield',
											fieldLabel : '&nbsp;',
											name       : 'company',
											flex       : 1,
										},
										{
											xtype   : 'label',
											text    : 'APPROVAL',
											flex    : 1,
											padding : '0 0 0 10px'
										},
										{
											xtype  : 'button',
											text   : 'GENERATE',
											action : 'genschedule',
											flex   : 1
										}
									]
								}

							]
						},
						{ xtype: 'splitter', width: 20 },
						{
							xtype     : 'panel',
							flex      : 1,
							layout    : 'vbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									width     : '100%',
									items     : [
										{
											xtype           : 'xnumericfieldEST',
											fieldLabel      : 'Estimasi Serah Terima',
											name            : 'rencana_serahterima',
											allowBlank      : false,
											enableKeyEvents : true,
											labelWidth      : 200,
											value           : 0,
											flex            : 6,
										},
										{
											xtype   : 'label',
											text    : 'bulan',
											flex    : 1,
											padding : '0 0 0 10px'
										}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									width     : '100%',
									items     : [
										{
											xtype        : 'datefield',
											labelWidth   : 200,
											allowBlank   : false,
											fieldLabel   : 'Tanggal ST 1',
											name         : 'rencana_serahterima_date',
											format       : 'd-m-Y',
											submitFormat : 'Y-m-d H:i:s.u',
											flex         : 1,
											editable     : false
										}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									width     : '100%',
									items     : [
										{
											xtype      : 'cbcollector',
											fieldLabel : 'Collector',
											name       : 'collector_employee_id',
											flex       : 1
										}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									width     : '100%',
									items     : [
										{
											xtype        : 'datefield',
											labelWidth   : 200,
											fieldLabel   : 'Tanggal ST 2',
											name         : 'realisation_serahterima_date',
											format       : 'd-m-Y',
											submitFormat : 'Y-m-d H:i:s.u',
											flex         : 1,
											readOnly     : true
										}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									width     : '100%',
									items     : [
										{
											xtype      : 'datefield',
											format     : 'd-m-Y',
											fieldLabel : 'Tanggal UTJ',
											editable   : false,
											name       : 'utj_date',
											hidden     : true,
											flex       : 1
										}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									width     : '100%',
									items     : [
										{
											xtype        : 'combobox',
											name         : 'um1_date',
											hidden       : true,
											fieldLabel   : 'Tanggal UM 1',
											displayField : 'date_display',
											valueField   : 'date_value',
											store        : Ext.create('Ext.data.Store', {
												fields : ['date_value', 'date_display'],
												data   : []
											}),
											flex : 1
										}
									]
								}
							]
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					width     : '100%',
					items     : [
						{
							xtype  : 'purchaseletterschedulegrid',
							width  : '100%',
							itemId : 'MyScheduleGrid'
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					width     : '100%',
					items     : [
						{
							xtype      : 'textfield',
							fieldLabel : '',
							name       : 'balance_value',
							readOnly   : true,
							width      : '300px'
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					width     : '100%',
					items     : [
						{
							xtype      : 'xnotefieldEST',
							fieldLabel : 'Notes',
							name       : 'notes',
							flex       : 1,
						}
					]
				},
				//edited by Rizal 28 Feb 2019
				{
					xtype          : 'checkboxfield',
					fieldLabel     : 'Auto Send SMS',
					name           : 'is_auto_sms',
					itemId         : 'is_auto_sms',
					inputValue     : '1',
					hidden         : true,
					checked        : true,
					uncheckedValue : '0',
					width          : '100%'
				},
				{
					xtype          : 'checkboxfield',
					fieldLabel     : 'Allowed to Send SP',
					name           : 'is_not_allowed_sp',
					itemId         : 'is_not_allowed_sp',
					inputValue     : '1',
					hidden         : true,
					checked        : true,
					uncheckedValue : '0',
					width          : '100%'
				},
				// added by Rico 11 Mei 2021
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					width     : '50%',
					items     : [
						{
							xtype      : 'textfield',
							fieldLabel : 'Nomor IM/FP',
							name       : 'nomor_im',
							maskRe     : /[A-Za-z0-9()\s./-]/,
							flex       : 1,
							hidden     : true,
						}
					]
				},
				//endedited
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					width     : '100%',
					items     : [
						{
							xtype      : 'xnotefieldEST',
							fieldLabel : 'Promo',
							hidden     : true,
							itemId     : 'promo',
							name       : 'promo',
							flex       : 1,
							hidden 	   : true
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					hidden    : true,
					itemId    : 'rewardsalesPanelID',
					bodyStyle : 'border:0px',
					items     : [
						{
							xtype      : 'textfield',
							fieldLabel : 'Reward Sales',
							anchor     : '-5',
							name       : 'rewardsales_code',
							readOnly   : true,
							keepRO     : true,
							flex       : 2
						},
						{
							xtype : 'splitter', width: 5,
						},
						{
							xtype        : 'combobox',
							fieldLabel   : '',
							anchor       : '-5',
							queryMode    : 'local',
							displayField : 'name',
							valueField   : 'reward_id',
							name         : 'rewardsales_reward_id',
							flex         : 2,
							editable     : false
						},
						{
							xtype : 'label',
							flex  : 3
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					itemId    : 'rewardtambahanPanelID',
					hidden    : true,
					bodyStyle : 'border:0px',
					items     : [
						{
							xtype      : 'textfield',
							fieldLabel : 'Reward Tambahan',
							anchor     : '-5',
							readOnly   : true,
							keepRO     : true,
							name       : 'rewardtambahan_code',
							flex       : 2
						},
						{
							xtype : 'splitter', width: 5,
						},
						{
							xtype        : 'combobox',
							fieldLabel   : '',
							anchor       : '-5',
							queryMode    : 'local',
							displayField : 'name',
							valueField   : 'reward_id',
							name         : 'rewardtambahan_reward_id',
							flex         : 2,
							editable     : false
						},
						{
							xtype : 'label',
							flex  : 3
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					hidden    : true,
					itemId    : 'rewardcustomerPanelID',
					bodyStyle : 'border:0px',
					items     : [
						{
							xtype      : 'textfield',
							fieldLabel : 'Reward Customer',
							anchor     : '-5',
							name       : 'rewardcustomer_code',
							readOnly   : true,
							keepRO     : true,
							flex       : 2
						},
						{
							xtype : 'splitter', width: 5,
						},
						{
							xtype        : 'combobox',
							fieldLabel   : '',
							anchor       : '-5',
							queryMode    : 'local',
							name         : 'rewardcustomer_reward_id',
							displayField : 'name',
							valueField   : 'reward_id',
							flex         : 2,
							editable     : false
						},
						{
							xtype : 'label',
							flex  : 3
						}
					]
				},
				{
					title       : 'DETAIL PROMO / REWARD',
					xtype       : 'panel',
					itemId      : 'detailrewardPanelID',
					bodyPadding : 10,
					collapsible : true,
					hidden      : true,
					items       : [
						{
							padding   : '5px 0 10px 0',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							width     : '100%',
							items     : [
								{
									xtype        : 'combobox',
									fieldLabel   : 'Internal Memo',
									anchor       : '-5',
									queryMode    : 'local',
									displayField : 'nomor_im',
									valueField   : 'internalmemo_id',
									name         : 'internalmemo_id',
									flex         : 2,
									editable     : false
								},
								{
									xtype : 'splitter', width: 20,
								},
								{
									xtype : 'label',
									text  : ' ',
									width : 200
								}
							]
						},
						{
							xtype  : 'purchaseletterrewardgriddetail',
							width  : '100%',
							itemId : 'RewardGrid',
						},
					]
				},
				{
					title       : 'JENIS BIAYA',
					xtype       : 'panel',
					itemId      : 'jenisbiayaPanelID',
					bodyPadding : 10,
					collapsible : true,
					hidden      : true,
					items       : [
						{
							xtype  : 'jenisbiayagrid',
							width  : '100%',
							itemId : 'JenisbiayaGrid',
						}
					]
				},
				{
					//added by iqbal 06 mei 2019
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							xtype          : 'checkboxfield',
							fieldLabel     : 'Repeat Order',
							name           : 'is_repeat_order',
							inputValue     : '1',
							uncheckedValue : '0',
							width          : 80
						}
					]
				}, // end
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					width     : '100%',
					id        : 'testModalID',
					html      : ''
				}
			]
		};
	}
});
