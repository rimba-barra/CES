Ext.define('Erems.view.purchaseletterreward.FormData', {
	extend: 'Erems.library.template.view.FormData',
	requires: ['Erems.library.template.view.combobox.Cluster2',
		'Erems.library.template.view.combobox.Block',
		'Erems.library.template.view.combobox.Kprstatus',
		'Erems.library.template.component.Pricetypecombobox',
		// 'Erems.view.purchaseletter.Schedulegrid',
		'Erems.library.template.view.combobox.Mediapromotion',
		'Erems.library.template.view.combobox.Saleslocation',
		'Erems.library.template.view.combobox.Bank',
		'Erems.library.template.view.combobox.Citraclub',
		'Erems.library.template.view.combobox.Salesman',
		'Erems.library.template.view.combobox.Collector',
		'Erems.library.template.view.FdUnitInformation',
		'Erems.library.template.view.combobox.Billingrules',
		'Erems.library.box.Mymoneyfield',
		'Erems.library.template.view.MoneyField',
		'Erems.view.purchaseletterreward.RewardGrid',
	],
	alias: 'widget.purchaseletterrewardformdata',
	frame: true,
	autoScroll: true,
	anchorSize: 100,
	height: 600,
	bodyBorder: true,
	bodyPadding: 10,
	editedRow: -1,
	bodyStyle: 'padding:5px 5px 0',
	defaults: {
		border: false,
		xtype: 'panel',
		flex: 1,
		layout: ''

	},
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			items: [{
				xtype: 'hiddenfield',
				itemId: 'fdms_id',
				name: 'side_id'
			}, {
				xtype: 'hiddenfield',
				name: 'unit_unit_id'
			}, {
				xtype: 'hiddenfield',
				name: 'purchaseletter_id'
			}, {
				xtype: 'hiddenfield',
				name: 'customer_id'
			},
			{
				xtype: 'panel', bodyPadding: 10,
				items: [
					{
						//  bodyPadding: 10,
						padding: '10px 0 0 0',
						layout: 'hbox',
						bodyStyle: 'border:0px',
						items: [{
							xtype: 'textfield',
							fieldLabel: 'PT',
							name: 'pt_name',
							flex: 1,
							readOnly: true,
							fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
						}
						]
					}
				]
			},
			{
				xtype: 'panel', bodyPadding: 10,
				items: [
					{
						//  bodyPadding: 10,
						padding: '0 0 0 0',
						layout: 'hbox',
						bodyStyle: 'border:0px',
						items: [{
							xtype: 'textfield',
							fieldLabel: 'Nomor SP',
							name: 'purchaseletter_no',
							flex: 1,
							readOnly: true,
							// fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
						},
						{
							xtype: 'splitter', width: 20
						}, {
							xtype: 'datefield',
							fieldLabel: 'Tanggal SP',
							name: 'purchase_date',
							value: new Date(),
							format: 'd-m-Y',
							submitFormat: 'Y-m-d H:i:s.u',
							flex: 1,
							editable: false,
							readOnly: true,
						}
						]
					}
				]
			},
			{
				xtype: 'panel', bodyPadding: 10,
				items: [
					{
						//  bodyPadding: 10,
						padding: '0 0 0 0',
						layout: 'hbox',
						bodyStyle: 'border:0px',
						items: [
							{
								xtype: 'datefield',
								labelWidth: 120,
								//                                    allowBlank: false,
								fieldLabel: 'First Purchase Date',
								name: 'firstpurchase_date',
								format: 'd-m-Y',
								submitFormat: 'Y-m-d H:i:s.u',
								readOnly: true,
								flex: 1,
								width: 350,
								editable: false
							},
							{
								xtype: 'splitter', width: 20
							}, {
								xtype: 'textfield',
								fieldLabel: 'Salesman',
								name: 'salesman_employee_name',
								flex: 1,
								readOnly: true
							}
						]
					}
				]
			},
			{
				xtype: 'panel', bodyPadding: 10,
				items: [
					{
						//  bodyPadding: 10,
						padding: '0 0 0 0',
						layout: 'hbox',
						bodyStyle: 'border:0px',
						items: [{
							xtype: 'textfield',
							fieldLabel: 'Virtual Account BCA',
							name: 'unit_virtualaccount_bca',
							flex: 1,
							readOnly: true
						},
						{
							xtype: 'splitter', width: 20
						}, {
							xtype: 'textfield',
							fieldLabel: 'Virtual Account Mandiri',
							name: 'unit_virtualaccount_mandiri',
							flex: 1,
							readOnly: true
						}
						]
					}
				]
			},

			{
				xtype: 'panel', bodyPadding: 10, title: 'UNIT INFORMATION', collapsible: true,
				items: [
					{
						xtype: 'container',
						layout: 'hbox',
						defaults: {
							flex: 1
						},
						items: [
							{
								xtype: 'label',
								text: ''
							},
							{
								xtype: 'panel',
								layout: 'hbox',
								bodyStyle: 'background-color:#FFFF99;border:0px;padding:10px 20px',
								defaults: {
									xtype: 'textfield',
									margin: '0 10px 0 0',
									fieldStyle: 'background:none;background-color:#F2F2F2;',
									labelWidth: 45,
									readOnly: true
								},
								items: [
									{
										name: 'unitstatus_status',
										fieldLabel: 'Status',
										flex: 1

									},
									{
										name: 'unit_progress',
										fieldLabel: 'Progress',
										flex: 1
									},
									{
										xtype: 'label',
										text: '%',
										width: 20
									}
								]
							}
						]
					},
					{
						xtype: 'container',
						layout: 'hbox',
						margin: '10px 0 0 0',
						defaults: {
							xtype: 'container',
							layout: 'vbox',
							flex: 1,
							width: '100%'
						},
						items: [
							{
								margin: '0 20px 0 0',
								defaults: {
									xtype: 'container',
									layout: 'hbox',
									width: '100%',
									margin: '0 0 10px 0'
								},
								items: [
									{
										defaults: {
											xtype: 'textfield',
											width: '100%'
										},
										items: [
											{
												name: 'cluster_code',
												fieldLabel: 'Kawasan / Cluster',
												flex: 1,
												readOnly: true,
												margin: '0 5px 0 0'
											},
											{
												name: 'cluster_cluster',
												fieldLabel: '',
												readOnly: true,
												flex: 1
											}
										]

									},
									{
										defaults: {
											xtype: 'textfield',
											width: '100%'
										},
										items: [
											{
												name: 'block_code',
												fieldLabel: 'Block',
												flex: 1,
												readOnly: true,
												margin: '0 5px 0 0'
											},
											{
												name: 'block_block',
												fieldLabel: '',
												readOnly: true,
												flex: 1
											}
										]

									},
									{
										items: [
											{
												xtype: 'textfield',
												width: '100%',
												name: 'unit_unit_number',
												fieldLabel: 'Unit Number',
												margin: '0 5px 0 0',
												readOnly: true,
												flex: 2
											},
											{
												xtype: 'button',
												text: 'Browse Unit',
												action: 'browse_unit',
												flex: 1,
												hidden: true
											},
											/*
											 {
											 xtype: 'container',
											 id: 'new_buttonBrowseID',
											 html: '',
											 action: 'browse_unit2',
											 width: 50
											 },
											 */
											{
												xtype: 'label',
												text: '',
												width: 50
											}
										]
									}
								]
							},
							{
								margin: '0 20px 0 0',
								defaults: {
									xtype: 'container',
									width: '100%'
								},
								items: [
									{
										layout: 'vbox',
										defaults: {
											xtype: 'textfield',
											width: '100%'
										},
										items: [
											{
												name: 'productcategory_productcategory',
												fieldLabel: 'Product Category',
												readOnly: true,
												margin: '0 0 10px 0'
											},
											{
												name: 'type_name',
												readOnly: true,
												fieldLabel: 'Type',
											}
										]

									},
									{
										xtype: 'container',
										layout: 'vbox',
										defaults: {
											xtype: 'container',
											layout: 'hbox',
											width: '100%',
											margin: '0 0 10px 0'
										},
										items: [
											{
												defaults: {
													margin: '0 10px 0 0'
												},
												items: [
													{
														xtype: 'textfield',
														name: 'unit_land_size',
														readOnly: true,
														fieldLabel: 'Land Size',
														flex: 3
													},
													{
														xtype: 'label',
														text: 'm2',
														width: 30
													},
													{
														xtype: 'textfield',
														name: 'unit_long',
														fieldLabel: 'Long',
														labelWidth: 45,
														readOnly: true,
														flex: 2
													},
													{
														xtype: 'label',
														text: 'm',
														width: 20,
														margin: '0 0 0 0'
													}
												]
											},
											{
												defaults: {
													margin: '0 10px 0 0'
												},
												items: [
													{
														xtype: 'textfield',
														name: 'unit_building_size',
														readOnly: true,
														fieldLabel: 'Building Size',
														flex: 3
													},
													{
														xtype: 'label',
														text: 'm2',
														width: 30
													},
													{
														xtype: 'textfield',
														name: 'unit_width',
														readOnly: true,
														fieldLabel: 'Width',
														labelWidth: 45,
														flex: 2
													},
													{
														xtype: 'label',
														text: 'm',
														width: 20,
														margin: '0 0 0 0'
													}
												]
											},
											{
												defaults: {
													margin: '0 10px 0 0'
												},
												items: [
													{
														xtype: 'textfield',
														name: 'unit_kelebihan',
														readOnly: true,
														fieldLabel: 'Kelebihan Tanah',
														flex: 3
													},
													{
														xtype: 'label',
														text: 'm2',
														width: 30
													},
													{
														xtype: 'textfield',
														name: 'unit_floor',
														readOnly: true,
														fieldLabel: 'Floor',
														labelWidth: 45,
														flex: 2
													},
													{
														xtype: 'label',
														text: '',
														width: 20,
														margin: '0 0 0 0'
													}
												]
											},
											//added by anas 18102021
											{
												defaults: {
													margin: '0 10px 0 0'
												},
												items: [
													{
														xtype: 'textfield',
														name: 'unit_electricity',
														readOnly: true,
														fieldLabel: 'Electricity',
														flex: 1
													},
													{
														xtype: 'label',
														text: 'watt',
														width: 30
													},
													{
														xtype: 'label',
														text: '',
														width: 125
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
			},
			/* CUSTOMER INFORMATION */
			{
				xtype: 'panel', bodyPadding: 10, title: 'CUSTOMER INFORMATION', collapsible: true,
				width: '100%',
				items: [
					{
						xtype: 'panel',
						layout: 'hbox',
						bodyStyle: 'border:0px',
						items: [
							{
								xtype: 'panel',
								width: '100%',
								flex: 3,
								bodyStyle: 'border:0px',
								items: [
									{
										//  bodyPadding: 10,
										padding: '10px 0 0 0',
										layout: 'hbox',
										bodyStyle: 'border:0px',
										items: [{
											xtype: 'hiddenfield',
											name: 'customer_customer_id'
										}, {
											xtype: 'textfield',
											fieldLabel: 'Customer ID',
											anchor: '-5',
											name: 'customer_code',
											flex: 3,
											readOnly: true,
											fieldStyle: 'background:none;background-color:#F2F2F2;'
										}, {
											xtype: 'splitter', width: 5,
										}, {
											xtype: 'button',
											text: 'Browse Customer',
											width: 120,
											padding: '2px 5px',
											itemId: 'fd_browse_customer_btn',
											action: 'browse_customer',
											iconCls: 'icon-search',
											style: 'background-color:#FFC000;',
											hidden: true
										},
										{
											xtype: 'label', flex: 5
										}]
									},
									{
										//  bodyPadding: 10,
										padding: '10px 0 0 0',
										layout: 'hbox',
										bodyStyle: 'border:0px',
										items: [{
											xtype: 'textfield',
											fieldLabel: 'Customer Name',
											anchor: '-5',
											name: 'customer_name',
											flex: 1,
											readOnly: true,
											fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
										}]
									},
									{
										padding   : '10px 0 0 0',
										layout    : 'hbox',
										bodyStyle : 'border:0px',
										items     : [{
											xtype      : 'xaddressfieldEST',
											fieldLabel : 'Alamat Koresponden',
											anchor     : '-5',
											name       : 'customer_address',
											flex       : 1,
											readOnly   : true,
											fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
										}]
									},
									{
										//  bodyPadding: 10,
										padding: '10px 0 0 0',
										layout: 'hbox',
										bodyStyle: 'border:0px',
										items: [{
											xtype: 'combobox',
											fieldLabel: 'City',
											anchor: '-5',
											name: 'city_city_name',
											displayField: 'city_name',
											valueField: 'city_id',
											queryMode: 'local',
											flex: 1,
											readOnly: true,
											fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
											editable: false
										}, {
											xtype: 'splitter', width: 20,
										}, {
											xtype: 'textfield',
											fieldLabel: 'Zip Code',
											anchor: '-5',
											name: 'customer_zipcode',
											flex: 1,
											readOnly: true,
											fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
										}]
									},
									{
										//  bodyPadding: 10,
										padding: '10px 0 0 0',
										layout: 'hbox',
										bodyStyle: 'border:0px',
										items: [{
											xtype      : 'xphonenumberfieldEST',
											fieldLabel : 'Home phone',
											anchor     : '-5',
											name       : 'customer_home_phone',
											flex       : 1,
											readOnly   : true,
											fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
										}, {
											xtype: 'splitter', width: 20,
										}, {
											xtype      : 'xphonenumberfieldEST',
											fieldLabel : 'Mobile phone',
											anchor     : '-5',
											name       : 'customer_mobile_phone',
											flex       : 1,
											readOnly   : true,
											fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
										}]
									},
									{
										//  bodyPadding: 10,
										padding: '10px 0 0 0',
										layout: 'hbox',
										bodyStyle: 'border:0px',
										items: [{
											xtype      : 'xphonenumberfieldEST',
											fieldLabel : 'Office phone',
											anchor     : '-5',
											name       : 'customer_office_phone',
											flex       : 1,
											readOnly   : true,
											fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
										}, {
											xtype: 'splitter', width: 20,
										}, {
											xtype      : 'xphonenumberfieldEST',
											fieldLabel : 'FAX',
											anchor     : '-5',
											name       : 'customer_fax',
											flex       : 1,
											readOnly   : true,
											fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
										}]
									},
									{
										//  bodyPadding: 10,
										padding: '10px 0 0 0',
										layout: 'hbox',
										bodyStyle: 'border:0px',
										items: [{
											xtype: 'textfield',
											fieldLabel: 'KTP Number',
											anchor: '-5',
											name: 'customer_KTP_number',
											flex: 1,
											readOnly: true,
											fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
										}]
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
												fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
											}
										]
									},
									{
										//  bodyPadding: 10,
										padding: '10px 0 0 0',
										layout: 'hbox',
										bodyStyle: 'border:0px',
										items: [{

											xtype: 'maskfield',
											mask: '##.###.###.#-###.###',
											fieldLabel: 'NPWP Number',
											anchor: '-5',
											name: 'customer_NPWP',
											flex: 1,
											readOnly: true,
											fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
										}]
									},
									{
										//  bodyPadding: 10,
										padding: '10px 0 0 0',
										layout: 'hbox',
										bodyStyle: 'border:0px',
										items: [{
											xtype: 'textfield',
											fieldLabel: 'NPWP Name',
											anchor: '-5',
											name: 'customer_NPWP_name',
											flex: 1,
											readOnly: true,
											fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
										}]
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
												fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
											}
										]
									},
									{
										//  bodyPadding: 10,
										padding: '10px 0 0 0',
										layout: 'hbox',
										bodyStyle: 'border:0px',
										items: [{
											xtype: 'textfield',
											fieldLabel: 'Email Address',
											anchor: '-5',
											name: 'customer_email',
											flex: 1,
											readOnly: true,
											fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
										}]
									},
									// {
									// 	//  bodyPadding: 10,
									// 	padding: '10px 0 0 0',
									// 	layout: 'hbox',
									// 	bodyStyle: 'border:0px',
									// 	items: [{
									// 		xtype: 'checkboxfield',
									// 		fieldLabel: '',
									// 		name: 'is_more_customer',
									// 		boxLabel: 'Add More Customer',
									// 		inputValue: '1',
									// 		uncheckedValue: '0',
									// 		//                                                        hidden: true
									// 		//  margin: '0 5px 0 0',
									// 		//                                                        width: 80
									// 	}]
									// },
								]
							},
							{
								xtype: 'panel',
								flex: 1,
								width: '100%',
								padding: '10px 0 0 10px',
								bodyStyle: 'border:0px',
								items: [
									/*  {
									 xtype: 'panel',
									 itemId: 'photo_image', flex: 1, height: 200, bodyStyle: 'background:none;background-color:#F2F2F2;',
									 padding: '0 0 10px 0'},*/
									{
										xtype: 'panel',
										height: 200,
										bodyStyle: 'background:none',
										itemId: 'photo_image',
										html: '',
										// flex: 1,
										width: 160
									},
									// {
									// 	xtype: 'button', text: 'Create New Customer',
									// 	flex: 1,
									// 	padding: 5,
									// 	margin: '5px 0',
									// 	action: 'create_new_customer',
									// 	iconCls: 'icon-add'
									// }
								]
							}
						]
					},
					// {
					// 	//  bodyPadding: 10,
					// 	padding: '10px 0 0 0',
					// 	layout: 'hbox',
					// 	bodyStyle: 'border:0px',
					// 	width: '100%',
					// 	items: [{
					// 		xtype: 'morecustomergrid',
					// 		width: '100%',
					// 		itemId: 'CGrid',
					// 		hidden: true,

					// 	}]
					// },
				]
			},

			{
				xtype       : 'panel', 
				bodyPadding : 10, 
				title       : 'DETAIL REWARD', 
				collapsible : true,
				itemId      : 'detail_reward',
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
						padding   : '10px 0 0 0',
						layout    : 'hbox',
						bodyStyle : 'border:0px',
						width     : '100%',
						items     : [
							{
								xtype  : 'purchaseletterrewardgriddetail',
								width  : '100%',
								itemId : 'RewardGrid',
							}
						]
					},
				]
			}

			],
			dockedItems: me.generateDockedItem()
		});

		me.callParent(arguments);
	},
	generateDockedItem: function () {
		var x = [
			{
				xtype: 'toolbar',
				dock: 'bottom',
				ui: 'footer',
				layout: {
					padding: 6,
					type: 'hbox'
				},
				items: [
					{
						xtype: 'button',
						action: 'save',
						itemId: 'btnSave',
						// disabled: true,
						padding: 5,
						width: 75,
						iconCls: 'icon-save',
						text: 'Save'
					},
					// {
					//     xtype: 'button',
					//     action: 'save',
					//     itemId: 'btnSaveFromDraft',
					//     hidden: true,
					//     padding: 5,
					//     width: 75,
					//     iconCls: 'icon-save',
					//     text: 'Save To '
					// },
					{
						xtype: 'button',
						action: 'cancel',
						itemId: 'btnCancel',
						padding: 5,
						width: 75,
						iconCls: 'icon-cancel',
						text: 'Cancel',
						handler: function () {
							this.up('window').close();
						}
					},
					// {
					// 	xtype: 'button',
					// 	action: 'authorize',
					// 	itemId: 'btnAuthorize',
					// 	hidden: true,
					// 	padding: 5,
					// 	width: 100,
					// 	iconCls: 'icon-save',
					// 	text: 'Authorize'
					// },
					// {
					// 	xtype: 'button',
					// 	action: 'printout',
					// 	itemId: 'btnPrintout',
					// 	disabled: true,
					// 	padding: 5,
					// 	width: 100,
					// 	iconCls: 'icon-print',
					// 	text: 'Printout'
					// },
					// {
					// 	xtype: 'button',
					// 	action: 'printsch',
					// 	itemId: 'btnPrintPaySch',
					// 	padding: 5,
					// 	width: 130,
					// 	iconCls: 'icon-print',
					// 	text: 'Payment Scheme'
					// },
					// {
					// 	xtype: 'button',
					// 	action: 'setaci',
					// 	itemId: 'btnAci',
					// 	align: 'center',
					// 	padding: 5,
					// 	width: 100,
					// 	//iconCls: '&#10003',
					// 	text: '&#10003; ACI',
					// 	name: 'apiaci'

					// },
					// {
					// 	xtype: 'button',
					// 	action: 'flashprint',
					// 	disabled: true,
					// 	hidden: true,
					// 	padding: 5,
					// 	width: 100,
					// 	iconCls: 'icon-flash',
					// 	text: 'Flash print'
					// },
					// {
					// 	xtype: 'button',
					// 	action: 'printoutspt',
					// 	itemId: 'btnPrintoutspt',
					// 	hidden: true,
					// 	padding: 5,
					// 	width: 100,
					// 	iconCls: 'icon-print',
					// 	text: 'Printout SPT'
					// },
					// //add by hadi 21082019
					// {
					// 	xtype: 'button',
					// 	action: 'saveDraft',
					// 	itemId: 'btnSaveDraft',
					// 	disabled: true,
					// 	hidden: true,
					// 	padding: 5,
					// 	width: 100,
					// 	iconCls: 'icon-save',
					// 	text: 'Save Draft'
					// }
					//add by hadi 21082019
				]
			}
		];
		return x;
	}
});