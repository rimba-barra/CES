Ext.define('Erems.view.changeprice.FormData', {
	extend   : 'Erems.library.template.view.FormData',
	alias    : 'widget.changepriceformdata',
	requires : [
		'Erems.library.template.view.combobox.Billingrules',
		'Erems.library.template.view.combobox.Collector',
		'Erems.library.template.view.combobox.Bank',
		'Erems.library.template.component.Pricetypecombobox',
		'Erems.view.changeprice.Schedulegrid',
		'Erems.library.template.view.combobox.Type',
		'Erems.library.template.component.Tanggalvalidasicombobox'
		// 'Erems.library.box.view.DateField',
		// 'Erems.view.purchaseletter.Schedulegrid',
		// 'Erems.library.template.view.MoneyField',
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

		Ext.override(Ext.form.Checkbox, {
		    setBoxLabel: function(boxLabel){
		        this.boxLabel = boxLabel;
		        if(this.rendered){
		            //NOTICE I CHANGED THIS LINE FROM THE ONE IN THE ORIGINAL SENCHA FORUM
		            this.getEl().down('label.x-form-cb-label').update(boxLabel);
		        }
		    }
		});

		Ext.applyIf(me, {
			items: [
				{xtype: 'hiddenfield', name: 'unit_unit_id'},
				// {xtype: 'component', html: '<iframe src="app/erems/uploads/mastertype/BNI.pdf" width="100%" height="100%"></iframe>'},
				{xtype: 'hiddenfield', name: 'changeprice_id'},
				{xtype: 'hiddenfield', name: 'purchaseletter_id'},
				{xtype: 'hiddenfield', name: 'purchaseletter_purchaseletter_id'},
				{xtype: 'hiddenfield', name: 'firstpurchase_date'},
				me.unitInformation(),
				me.tipebaruInformation(),
				me.customerInformation(),
				me.priceInformation(),
				me.billingInformation()
			],
			dockedItems: me.generateDockedItem()
		});

		me.callParent(arguments);
	},
	unitInformation : function(){
		var me = this;

		return {
			xtype       : 'panel',
			bodyPadding : 10,
			title       : 'UNIT INFORMATION',
			collapsible : true,
			items       : [
				{
					xtype    : 'container',
					layout   : 'hbox',
					defaults : { flex : 1 },
					items    : [
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
								fieldStyle : 'background:none;background-color:#F2F2F2;',
								labelWidth : 45,
								readOnly   : true
							},
							items : [
								{
									name       : 'unitstatus_status',
									fieldLabel : 'Status',
									flex       : 1
								},
								{
									name       : 'sss',
									fieldLabel : 'Progress',
									flex       : 1
								},
								me.labelpersen()
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
									xtype          : 'textfield',
									name           : 'pt_name',
									width          : 340,
									fieldLabel     : 'PT',
									keepRO         : true,
									readOnly       : true,
									defaultMargins : { top : 0, right : 0, bottom : 5, left : 0 }
								},
								{
									defaults : {
										xtype : 'textfield',
										width : '100%'
									},
									items : [
										{
											name       : 'cluster_code',
											fieldLabel : 'Kawasan / Cluster',
											readOnly   : true,
											flex       : 1,
											margin     : '0 5px 0 0'
										},
										{
											name       : 'cluster_cluster',
											readOnly   : true,
											fieldLabel : '',
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
											readOnly   : true,
											margin     : '0 5px 0 0',
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
											items : [
												{
													xtype      : 'textfield',
													name       : 'unit_land_size',
													readOnly   : true,
													fieldLabel : 'Land Size',
													flex       : 3
												},
												me.labelM2(),
												{
													xtype      : 'textfield',
													name       : 'unit_long',
													readOnly   : true,
													fieldLabel : 'Long',
													labelWidth : 45,
													flex       : 2,
													margin     : '0 0 10px 10px'
												},
												me.labelM(),
											]
										},
										{
											items : [
												{
													xtype      : 'textfield',
													name       : 'unit_building_size',
													readOnly   : true,
													fieldLabel : 'Building Size',
													flex       : 3
												},
												me.labelM2(),
												{
													xtype      : 'textfield',
													name       : 'unit_width',
													readOnly   : true,
													fieldLabel : 'Width',
													labelWidth : 45,
													flex       : 2,
													margin     : '0 0 10px 10px'
												},
												me.labelM(),
											]
										},
										{
											items: [
												{
													xtype      : 'textfield',
													name       : 'unit_kelebihan',
													readOnly   : true,
													fieldLabel : 'Kelebihan Tanah',
													flex       : 3,
												},
												me.labelM2(),
												{
													xtype      : 'textfield',
													name       : 'unit_floor',
													readOnly   : true,
													fieldLabel : 'Floor',
													labelWidth : 45,
													flex       : 2,
													margin     : '0 0 10px 10px'
												},
												me.labelM(),
											]
										}

									]
								}
							]
						}
					]
				}
			]
		}
	},
	tipebaruInformation : function(){
		var me = this;

		return {
			xtype       : 'panel',
			bodyPadding : 10,
			title       : 'TIPE BARU INFORMATION',
			collapsible : true,
			items       : [
				{
					layout    : 'hbox',
					padding   : '10px 0 0 0',
					bodyStyle : 'border:0px',
					width     : '100%',
					items     : [
						{
							xtype  : 'panel',
							flex   : 3,
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
											xtype      : 'textfield',
											fieldLabel : 'Type',
											anchor     : '-5',
											readOnly   : true,
											name       : 'type2_code',
											flex       : 5
										},
										me.splitter(5),
										{
											xtype      : 'cbtype',
											fieldLabel : '',
											anchor     : '-5',
											name       : 'type_id_new',
											flex       : 6
										}
									]
								}

							]
						},
						me.splitter(50),
						{
							xtype  : 'panel',
							flex   : 3,
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
											xtype      : 'xmoneyfieldEST',
											fieldLabel : 'Land Size',
											name       : 'landsize_new',
											labelWidth : 60,
											flex       : 7,
											width      : 40,
										},
										me.labelM2(),
										me.splitter(20),
										{
											xtype      : 'xmoneyfieldEST',
											fieldLabel : 'Building Size',
											name       : 'buildingsize_new',
											flex       : 7,
											labelWidth : 70,
											width      : 40,
										},
										me.labelM2(),
									]
								},
								{
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									width     : '100%',
									items     : [
										{
											xtype      : 'xmoneyfieldEST',
											fieldLabel : 'Kelebihan Tanah',
											anchor     : '-5',
											name       : 'kelebihan_new',
											flex       : 10,
											labelWidth : 90,
											width      : 40,
										},
										me.labelM2(),
										me.splitter(30),
										{
											xtype : 'label',
											text  : '',
											flex  : 7
										},
									]
								}
							]
						}
					]
				}
			]
		}
	},
	customerInformation : function(){
		var me = this;

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
											fieldStyle : 'background:none;background-color:#F2F2F2;'
										},
										me.splitter(5),
										{
											xtype : 'label',
											text  : '',
											width : 120
										},
										{
											xtype: 'label', flex: 5
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
											fieldLabel : 'Address',
											anchor     : '-5',
											name       : 'customer_address',
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
											fieldLabel : 'City',
											anchor     : '-5',
											name       : 'city_city_name',
											flex       : 1,
											readOnly   : true,
											fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
										},
										me.splitter(20),
										{
											xtype      : 'textfield',
											fieldLabel : 'Zip Code',
											anchor     : '-5',
											name       : 'customer_zipcode',
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
											xtype      : 'xphonenumberfieldEST',
											fieldLabel : 'Home phone',
											name       : 'customer_home_phone',
											flex       : 1,
											readOnly   : true,
											anchor     : '-5',
											fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
										},
										me.splitter(20),
										{
											xtype      : 'xphonenumberfieldEST',
											fieldLabel : 'Mobile phone',
											name       : 'customer_mobile_phone',
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
											xtype      : 'xphonenumberfieldEST',
											fieldLabel : 'Office phone',
											name       : 'customer_office_phone',
											flex       : 1,
											readOnly   : true,
											anchor     : '-5',
											fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
										},
										me.splitter(20),
										{
											xtype      : 'xphonenumberfieldEST',
											fieldLabel : 'FAX',
											anchor     : '-5',
											name       : 'customer_fax',
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
											fieldLabel : 'KTP Number',
											anchor     : '-5',
											name       : 'customer_KTP_number',
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
											fieldLabel : 'NPWP Number',
											anchor     : '-5',
											name       : 'customer_NPWP',
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
											fieldLabel : 'Email Address',
											anchor     : '-5',
											name       : 'customer_email',
											flex       : 1,
											readOnly   : true,
											fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
										}
									]
								}
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
								}
							]
						}
					]
				}
			]
		}
	},
	priceInformation : function(){
		var me = this;

		var current_price = {
			xtype       : 'panel',
			itemId      : 'oldPriceBox',
			bodyPadding : 5,
			title       : 'CURRENT PRICE',
			flex        : 7,
			bodyPadding : 10,
			header      : {
				style     : 'border:0px;background:none !important;background-color:#F9BA87 !important;',
				bodyStyle : 'color:white !important;text-align:center !important;'
			},
			bodyStyle : 'border:1px solid #F9BA87',
			items     : [
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
								{
									xtype : 'label',
									text  : 'Nomor SP',
									flex  : 2
								},
								{
									xtype      : 'textfield',
									fieldLabel : '',
									name       : 'purchaseletter_purchaseletter_no',
									itemId     : 'purchaseletter_no_current_price',
									width      : 250,
									readOnly   : true,
									fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
								},
								{xtype: 'xmoneyfieldEST', name: 'price_is_ppn', flex : 1, hidden : true},
								{xtype: 'xmoneyfieldEST', name: 'price_is_nonppn', flex : 1, hidden : true},
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
								{
									xtype : 'label',
									text  : 'Price Type',
									flex  : 2
								},
								{
									xtype      : 'textfield',
									fieldLabel : '',
									name       : 'pricetype_pricetype',
									itemId     : 'pricetype_pricetype',
									width      : 250,
									readOnly   : true,
									fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
								},
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
								{
									xtype   : 'label',
									name    : 'label_old_ppn',
									text    : '',
									padding : '5px 0px 0px 260px',
									style   : 'font-size:11px; color:red; height:15px;'
								}
							]
						}
					]
				},
				{
					padding   : '0',
					layout    : 'hbox',
					bodyStyle : 'border:0px;',
					width     : '100%',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 7,
							items     : [
								{
									xtype : 'label',
									text  : '',
									flex  : 2
								},
								{
									xtype          : 'checkboxfield',
									boxLabel       : 'PPNDTP',
									name           : 'is_nonppn_old',
									flex           : 1,
									inputValue     : '1',
									uncheckedValue : '0',
									style          : 'font-size:11px; opacity:.6;',
									readOnly       : true,
								},
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
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 7,
							items     : [
								{
									xtype : 'label',
									text  : 'Harga Tanah /m2',
									flex  : 2
								},
								{
									xtype        : 'xmoneyfieldEST',
									fieldLabel   : '',
									name         : 'price_tanahpermeter',
									width        : 125,
									readOnly     : true,
									fieldCls     : 'readonly',
									decPrecision : 4
								},
								me.labelperM2(),
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
								{
									xtype : 'label',
									text  : 'Harga Kelebihan Tanah /m2',
									flex  : 2
								},
								{
									xtype        : 'xmoneyfieldEST',
									fieldLabel   : '',
									name         : 'price_kelebihantanah',
									width        : 125,
									readOnly     : true,
									fieldCls     : 'readonly',
									decPrecision : 4
								},
								me.labelperM2()
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
								{xtype: 'label', text: 'Harga Tanah', flex: 1},
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_tanah',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
								{xtype: 'label', text: 'Harga Kelebihan Tanah', flex: 1},
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_kelebihantanah',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
								{xtype: 'label', text: 'Harga Bangunan', flex: 1},
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_bangunan',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
								{xtype: 'label', text: 'Subsidi DP', flex: 1},
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_subsidi_dp',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
								{xtype: 'label', text: 'Harga Interior', flex: 1},
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_interior',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
								{xtype: 'label', text: '+', width: 20, padding: '0 0 0 10px'}
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
								{xtype: 'label', text: 'Harga Jual Dasar', flex: 1},
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_jualdasar',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
								{xtype: 'label', text: 'Discount harga dasar', flex: 6},
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : '',
									name       : 'price_persen_dischargedasar',
									flex       : 1,
									readOnly   : true,
									fieldCls   : 'readonly',
								},
								me.labelpersen()
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_dischargedasar',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
								{xtype: 'label', text: 'Discount harga tanah', flex: 6},
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : '',
									name       : 'price_persen_dischargetanah',
									flex       : 1,
									readOnly   : true,
									fieldCls   : 'readonly',
								},
								me.labelpersen()
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_dischargetanah',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
								{xtype: 'label', text: 'Discount harga bangunan', flex: 6},
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : '',
									name       : 'price_persen_dischargebangunan',
									flex       : 1,
									readOnly   : true,
									fieldCls   : 'readonly',
								},
								me.labelpersen()
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_dischargebangunan',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
							items     : []
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
								{xtype: 'label', text: '-', width: 20, padding: '0 0 0 10px'}
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
								{xtype: 'label', text: 'Harga Netto', flex: 1},
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_neto',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
								{xtype: 'label', text: 'PPN Tanah', flex: 6},
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : '',
									name       : 'price_persen_ppntanah',
									flex       : 1,
									readOnly   : true,
									fieldCls   : 'readonly',
								},
								me.labelpersen()
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_ppntanah',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
								{xtype: 'label', text: 'PPN Bangunan', flex: 6},
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : '',
									name       : 'price_persen_ppnbangunan',
									flex       : 1,
									readOnly   : true,
									fieldCls   : 'readonly',
								},
								me.labelpersen()
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_ppnbangunan',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
								{xtype: 'label', text: 'PPN Subsidi DP', flex: 6},
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : '',
									name       : 'price_persen_ppnsubsidi_dp',
									flex       : 1,
									readOnly   : true,
									fieldCls   : 'readonly',
								},
								me.labelpersen()
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_ppnsubsidi_dp',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
								{xtype: 'label', text: 'PPN Interior', flex: 6},
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : '',
									name       : 'price_persen_ppninterior',
									flex       : 1,
									readOnly   : true,
									fieldCls   : 'readonly',
								},
								me.labelpersen()
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_ppninterior',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
								{xtype: 'label', text: 'PPNBM', flex: 6},
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : '',
									name       : 'price_persen_ppnbm',
									flex       : 1,
									readOnly   : true,
									fieldCls   : 'readonly',
								},
								me.labelpersen()
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_ppnbm',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
								{xtype: 'label', text: 'PPH22', flex: 6},
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : '',
									name       : 'price_persen_pph22',
									flex       : 1,
									readOnly   : true,
									fieldCls   : 'readonly',
								},
								me.labelpersen()
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_pph22',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
								{xtype: 'label', text: 'Biaya balik nama', flex: 1},
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_bbnsertifikat',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
								{xtype: 'label', text: 'Biaya perolehan hak', flex: 1},
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_bphtb',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
								{xtype: 'label', text: 'Biaya Akta Jual Beli', flex: 1},
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_bajb',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
								{xtype: 'label', text: 'Biaya P. Mutu', flex: 1},
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'harga_pmutu',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
								{xtype: 'label', text: '+', width: 20, padding: '0 0 0 10px'}
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
								{xtype: 'label', text: 'HARGA JUAL', flex: 1},
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'price_harga_jual',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
								{xtype: 'label', text: 'Biaya Administrasi', flex: 1},
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'priceadmin_harga_administrasi',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
								{xtype: 'label', text: 'Biaya Paket tambahan', flex: 1},
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'priceadmin_harga_paket_tambahan',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
								{xtype: 'label', text: 'Biaya Administrasi Subsidi', flex: 1},
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'priceadmin_harga_admsubsidi',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
								{xtype: 'label', text: 'Biaya Asuransi', flex: 1},
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'priceadmin_biaya_asuransi',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
								{xtype: 'label', text: 'Discount Sales', flex: 4},
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : '',
									name       : 'priceadmin_persen_salesdisc',
									flex       : 1,
									readOnly   : true,
									fieldCls   : 'readonly',
								},
								me.labelpersen()
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'priceadmin_harga_salesdisc',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
								{xtype: 'label', text: 'Harga Pembulatan', flex: 1},
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'harga_pembulatan',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
								{xtype: 'label', text: '-', width: 20, padding: '0 0 0 10px'}
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
								{xtype: 'label', text: 'TOTAL HARGA JUAL', flex: 1, style: 'font-weight:bold;font-size:14px;'},
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'harga_total_jual',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
						}
					]
				}
			]
		};

		var new_price = {
			xtype       : 'panel',
			title       : 'NEW PRICE',
			itemId      : 'newPriceBox',
			flex        : 4,
			bodyPadding : 10,
			header      : {
				style     : 'border:0px;background:none !important;background-color:#F9BA87 !important;',
				bodyStyle : 'color:white !important;text-align:center !important;'
			},
			bodyStyle : 'border:1px solid #F9BA87',
			items     : [
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							xtype      : 'textfield',
							fieldLabel : '',
							readOnly   : true,
							name       : 'changeprice_no',
							flex       : 1,
							fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
						},
						{xtype: 'xmoneyfieldEST', name: 'pricenew_is_ppn', flex : 1, hidden : true},
						{xtype: 'xmoneyfieldEST', name: 'pricenew_is_nonppn', flex : 1, hidden : true},
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							xtype      : 'pricetypecombobox',
							fieldLabel : '',
							name       : 'pricetype_id',
							flex       : 1,
							disabled   : true,
							editable   : false
						}
					]
				},
				{
					padding   : '10px 0px 0px 0px',
					layout    : 'hbox',
					bodyStyle : 'border:0px;',
					width     : '100%',
					items     : [
						{
							xtype   : 'label',
							name    : 'label_new_ppn',
							text    : '',
							padding : '5px 0px 0px 80px',
							style   : 'font-size:11px; color:red;',
							hidden : true
						},
						{
							xtype          : 'checkboxfield',
							boxLabel       : 'NEW PRICE Sync to PPN 10%',
							name           : 'is_ppn_additional',
							flex           : 1,
							inputValue     : '1',
							uncheckedValue : '0',
							style          : 'font-size:11px;',
							disabled       : true,
						},
					]
				},
				{
					padding   : '0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 2,
							items     : []
						},
						{
							xtype          : 'checkboxfield',
							boxLabel       : 'PPNDTP',
							name           : 'is_nonppn_new',
							flex           : 4,
							inputValue     : '1',
							uncheckedValue : '0',
							style          : 'font-size:11px;',
						}
					]
				},
				{
					padding   : '3px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 7,
							items     : [
								{xtype: 'label', text: '', flex: 2},
								{
									xtype        : 'xmoneyfieldEST',
									fieldLabel   : '',
									name         : 'pricenew_tanahpermeter',
									width        : 130,
									decPrecision : 4,
								},
								me.labelperM2()
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
								{xtype: 'label', text: '', flex: 2},
								{
									xtype        : 'xmoneyfieldEST',
									fieldLabel   : '',
									name         : 'pricenew_kelebihantanah',
									width        : 130,
									decPrecision : 4,
								},
								me.labelperM2()
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
							flex      : 2,
							items     : []
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'pricenew_harga_tanah',
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
							flex      : 2,
							items     : []
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'pricenew_harga_kelebihantanah',
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
							flex      : 2,
							items     : []
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'pricenew_harga_bangunan',
							flex       : 3,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					itemId    : 'boxSubsididp_new',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 2,
							items     : []
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'pricenew_subsidi_dp',
							flex       : 3,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					itemId    : 'boxInterior_new',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 2,
							items     : []
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'pricenew_harga_interior',
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
							flex      : 2,
							items     : []
						},
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 3,
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
								{xtype: 'label', text: '+', width: 20, padding: '0 0 0 10px'}
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
							flex      : 2,
							items     : []
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'pricenew_harga_jualdasar',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : '',
									name       : 'pricenew_persen_dischargedasar',
									flex       : 1,
									readOnly   : true,
									fieldCls   : 'readonly',
								},
								me.labelpersen()
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'pricenew_harga_dischargedasar',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : '',
									name       : 'pricenew_persen_dischargetanah',
									flex       : 1,
									readOnly   : true,
									fieldCls   : 'readonly',
								},
								me.labelpersen()
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'pricenew_harga_dischargetanah',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : '',
									name       : 'pricenew_persen_dischargebangunan',
									flex       : 1,
									readOnly   : true,
									fieldCls   : 'readonly',
								},
								me.labelpersen()
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'pricenew_harga_dischargebangunan',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
							items     : []
						},
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 3,
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
								{xtype: 'label', text: '-', width: 20, padding: '0 0 0 10px'}
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
							flex      : 2,
							items     : []
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'pricenew_harga_neto',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : '',
									name       : 'pricenew_persen_ppntanah',
									flex       : 1,
								},
								me.labelpersen()
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'pricenew_harga_ppntanah',
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
							flex      : 2,
							items     : [
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : '',
									name       : 'pricenew_persen_ppnbangunan',
									flex       : 1,
								},
								me.labelpersen()
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'pricenew_harga_ppnbangunan',
							flex       : 3,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					itemId    : 'boxPpnsubsididp_new',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 2,
							items     : [
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : '',
									name       : 'pricenew_persen_ppnsubsidi_dp',
									flex       : 1,
								},
								me.labelpersen()
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'pricenew_harga_ppnsubsidi_dp',
							flex       : 3,
							padding    : '0 25px 0 0',
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					itemId    : 'boxPpninterior_new',
					items     : [
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 2,
							items     : [
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : '',
									name       : 'pricenew_persen_ppninterior',
									flex       : 1,
								},
								me.labelpersen()
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'pricenew_harga_ppninterior',
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
							flex      : 2,
							items     : [
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : '',
									name       : 'pricenew_persen_ppnbm',
									flex       : 1,
								},
								me.labelpersen()
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'pricenew_harga_ppnbm',
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
							flex      : 2,
							items     : [
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : '',
									name       : 'pricenew_persen_pph22',
									flex       : 1,
								},
								me.labelpersen()
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'pricenew_harga_pph22',
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
							flex      : 2,
							items     : []
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'pricenew_harga_bbnsertifikat',
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
							flex      : 2,
							items     : []
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'pricenew_harga_bphtb',
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
							flex      : 2,
							items     : []
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'pricenew_harga_bajb',
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
							flex      : 2,
							items     : []
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'new_harga_pmutu',
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
							flex      : 2,
							items     : []
						},
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 3,
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
								{xtype: 'label', text: '+', width: 20, padding: '0 0 0 10px'}
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
							flex      : 2,
							items     : []
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'pricenew_harga_jual',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldStyle : 'background:none;background-color:#F2F2F2 !important;text-align:right;'
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
							items     : []
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'new_harga_administrasi',
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
							flex      : 2,
							items     : []
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'new_harga_paket_tambahan',
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
							flex      : 2,
							items     : []
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'new_harga_admsubsidi',
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
							flex      : 2,
							items     : []
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'new_biaya_asuransi',
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
							flex      : 2,
							items     : [
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : '',
									name       : 'new_persen_salesdisc',
									flex       : 1,
									readOnly   : true,
									fieldCls   : 'readonly',
								},
								me.labelpersen()
							]
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'new_harga_salesdisc',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
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
							items     : []
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'harga_pembulatan_new',
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
							flex      : 2,
							items     : []
						},
						{
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							flex      : 3,
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
								{xtype: 'label', text: '+', width: 20, padding: '0 0 0 10px'}
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
							flex      : 2,
							items     : []
						},
						{
							xtype      : 'xmoneyfieldEST',
							fieldLabel : '',
							name       : 'new_harga_total_jual',
							flex       : 3,
							padding    : '0 25px 0 0',
							readOnly   : true,
							fieldCls   : 'readonly',
						}
					]
				}
			]
		};

		return {
			xtype       : 'panel',
			bodyPadding : 10,
			title       : 'PRICE INFORMATION',
			collapsible : true,
			width       : '100%',
			items       : [
				{
					xtype     : 'panel',
					layout    : 'vbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							xtype     : 'panel',
							flex      : 1,
							width     : '100%',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype     : 'panel',
									flex      : 3,
									layout    : 'vbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											width     : '100%',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'xdatefield',
													fieldLabel : 'Purchase Letter Date',
													anchor     : '-5',
													name       : 'purchaseletter_purchase_date',
													flex       : 1,
													labelWidth : 120,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2;',
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											width     : '100%',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Purchase Letter No.',
													anchor     : '-5',
													name       : 'purchaseletter_purchaseletter_no',
													flex       : 1,
													labelWidth : 120,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2;',
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											width     : '100%',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Change Price No.',
													anchor     : '-5',
													name       : 'company',
													flex       : 1,
													labelWidth : 120,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2;',
												}
											]
										}

									]
								},
								me.splitter(30),
								{
									xtype     : 'panel',
									flex      : 2,
									layout    : 'vbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											width     : '100%',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Revision Index',
													anchor     : '-5',
													name       : 'company',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2;'
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											width     : '100%',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'xdatefield',
													fieldLabel : 'Change Date',
													anchor     : '-5',
													name       : 'changeprice_date',
													flex       : 1,
													value      : new Date()
												}
											]
										}
									]
								}
							]
						},
						//////// bagian bawah ///
						{
							xtype     : 'panel',
							flex      : 1,
							width     : '100%',
							margin    : '30px 0 0 0',
							layout    : 'hbox',
							bodyStyle : 'border:0px;',
							items     : [
								current_price,
								me.splitter(5),
								new_price
							]
						}
					]
				}
			]
		}
	},
	billingInformation : function(){
		var me = this;

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
									itemId    : 'bankKPRElementId',
									width     : '100%',
									items     : [
										{
											xtype           : 'textfield',
											fieldLabel      : 'BANK KPR',
											name            : 'bank_bank_name',
											enableKeyEvents : true,
											readOnly        : true,
											flex            : 1
										},
										me.splitter(5),
										{
											xtype      : 'cbbank',
											fieldLabel : '',
											itemId     : 'bank_cb',
											readOnly   : true,
											name       : 'bank_bank_id',
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
											xtype            : 'xmoneyfieldEST',
											fieldLabel       : 'Tanda Jadi',
											name             : 'billingrules_term_tandajadi',
											flex             : 1,
											enforceMaxLength : true,
											maxLength        : 13,
											value            : 0.00,
										},
										me.labelper(),
										{
											xtype            : 'xmoneyfieldEST',
											fieldLabel       : '',
											name             : 'billingrules_tandajadi',
											flex             : 1,
											enforceMaxLength : true,
											maxLength        : 13,
											value            : 0.00,
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
											xtype            : 'xmoneyfieldEST',
											fieldLabel       : 'Uang muka',
											name             : 'billingrules_term_uangmuka',
											flex             : 1,
											enforceMaxLength : true,
											maxLength        : 13,
											value            : 0.00,
										},
										me.labelper(),
										{
											xtype            : 'xmoneyfieldEST',
											fieldLabel       : '',
											name             : 'billingrules_uangmuka',
											flex             : 1,
											enforceMaxLength : true,
											maxLength        : 13,
											value            : 0.00,
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
											readOnly   : true,
											fieldCls   : 'readonly',
										},
										me.labelper(),
										{
											xtype      : 'xmoneyfieldEST',
											fieldLabel : '',
											name       : 'billingrules_angsuran',
											flex       : 1,
											value      : 0.00,
											readOnly   : true,
											fieldCls   : 'readonly',
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
											xtype    : 'checkboxfield',
											boxLabel : 'APPROVE',
											name     : 'purchaseletterrevision_is_approve',
											readOnly : true,
											flex     : 1,
										},
										{
											xtype   : 'button',
											action  : 'genschedule',
											text    : 'GENERATE',
											flex    : 3,
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
											xtype      : 'textfield',
											name       : 'rencana_termin',
											fieldLabel : 'Termin',
											width      : 140
										}
									]
								},
							]
						},
						me.splitter(20),
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
											fieldLabel      : 'Rencana Serah Terima',
											name            : 'rencana_serahterima',
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
											xtype        : 'xdatefield',
											labelWidth   : 200,
											fieldLabel   : 'Serah Terima Planning Date',
											name         : 'rencana_serahterima_date',
											value        : new Date(),
											flex         : 1,
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
											readOnly   : true,
											name       : 'collector_employee_id',
											flex       : 1
										}
									]
								},
								{
									xtype  : 'tanggalvalidasicombobox',
									name   : 'tanggal_validasi',
									maskRe : /[0-9]/,
									hidden : true
								},
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
							xtype          : 'changepriceschedulegrid',
							width          : '100%',
							itemId         : 'MyScheduleGrid',
							bindPrefixName : 'Changeprice'
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
							fieldLabel : '',
							name       : 'balance_value',
							width      : '300px',
							readOnly   : true,
							fieldCls   : 'readonly',
						}]
				},
				{
					padding   : '10px 0 0 0',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					width     : '100%',
					items     : [
						{
							xtype      : 'xnotefieldEST',
							fieldLabel : 'Change Price Notes',
							name       : 'change_note',
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
							xtype      : 'xnotefieldEST',
							fieldLabel : 'Purchaeletter Notes',
							name       : 'notes_new',
							flex       : 1,
						}
					]
				},
				{
					padding   : '10px 0 0 0',
					itemId    : 'NPVDOC',
					hidden    : true,
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					width     : '100%',
					items     : [
						{
							xtype : 'hiddenfield',
							name  : 'npv_doc_approved',
		                },
		                {
							xtype   : 'label',
							id      : 'label_npv_doc',
							html    : 'NPV Doc Approved',
							padding : '0 10px 0 0',
							width   : 105,
		                },
						{
							xtype        : 'filefield',
							fieldLabel   : '',
							labelWidth   : '100px',
							itemId       : 'fd_npv_doc_approved',
							name         : 'file_npv_doc_approved',
							buttonText   : 'Choose File',
							buttonOnly   : true,
							buttonConfig : { width : '120px' },
							padding : '0 20px 0 0',
		                    listeners  : {
		                        afterrender : function(cmp){
		                            cmp.fileInputEl.set({
		                                accept : 'application/pdf'
		                            });
		                        }
		                    }
		                },
		                {
							xtype  : 'label',
							id     : 'view_document',
							html   : 'View Document',
							style  : 'display:inline-block;cursor:pointer;color:rgb(0 113 255);',
							margin : '5px 0 0 0',
							hidden : true
		                },
					]
				}
			]
		}
	},
	labelper : function(){
		return {
			xtype   : 'label',
			text    : '/',
			width   : 10,
			margin : '0 5px 0 0',
			padding : '5px 10px 0 5px',
			style   : 'font-size:11px;'
		}
	},
	labelpersen : function(){
		return {
			xtype   : 'label',
			text    : '%',
			width   : 25,
			padding : '5px 10px 0 5px',
			style   : 'font-size:11px;'
		}
	},
	labelperM2 : function(){
		return {
			xtype   : 'label',
			text    : '/m2',
			width   : 25,
			padding : '5px 10px 0 5px',
			style   : 'font-size:11px;'
		}
	},
	labelM2 : function(){
		return {
			xtype   : 'label',
			text    : 'm2',
			width   : 25,
			padding : '5px 10px 0 5px',
			style   : 'font-size:11px;'
		}
	},
	labelM : function(){
		return {
			xtype   : 'label',
			text    : 'm',
			width   : 25,
			padding : '5px 10px 0 5px',
			style   : 'font-size:11px;'
		}
	},
	splitter : function(width=5){
		return {xtype: 'splitter', width: width}
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
				items: [
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
						action  : 'approve',
						itemId  : 'btnApprove',
						padding : 5,
						iconCls : 'icon-approve',
						text    : 'Approve'
					},
					{
						xtype   : 'button',
						action  : 'approvecoll',
						hidden  : true,
						padding : 5,
						iconCls : 'icon-approve',
						text    : 'Approve Coll'
					},
					{
						xtype    : 'button',
						action   : 'reject',
						disabled : true,
						itemId   : 'btnReject',
						padding  : 5,
						width    : 75,
						iconCls  : 'icon-unapprove',
						text     : 'Reject'
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
					}
				]
			}
		];
		return x;
	}
});
