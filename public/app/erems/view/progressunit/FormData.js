Ext.define('Erems.view.progressunit.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.progressunitformdata',
	requires: ['Erems.library.template.view.combobox.Cluster',
		'Erems.library.template.view.combobox.Block', 'Erems.library.template.view.combobox.Unit',
		'Erems.view.progressunit.GridDetail', 'Erems.view.progressunit.GridPencairan', 'Erems.view.progressunit.GridTarget'],
	frame: true,
	autoScroll: true,
	anchorSize: 100,
	height: 450,
	bodyBorder: true,
	itemId: 'SpkFormData',
	bodyPadding: 10,
	bodyStyle: 'padding:5px 5px 0;background-color:#ffffff;',
	defaults: {
		border: false,
		xtype: 'panel',
		flex: 1,
		layout: ''

	},
	initComponent: function () {
		var me = this;
		//var cbf = new Erems.template.ComboBoxFields();

		Ext.applyIf(me, {
			items: [
				{
					xtype: 'hiddenfield',
					name: 'spk_spk_id'
				},
				{
					xtype: 'hiddenfield',
					name: 'unit_unit_id'
				},
				{
					xtype: 'hiddenfield',
					name: 'type_building_class'
				},
				{
					xtype: 'hiddenfield',
					name: 'purchaseletter_purchaseletter_id'
				},
				{
					xtype: 'panel',
					bodyPadding: 10,

					width: '100%',
					myId: 'spkInformationIDPUPanel',
					//  bodyStyle: 'z-index:1000',
					items: [
						{
							xtype: 'panel',
							bodyStyle: 'background-color:#FFFFFF;border:0px',
							// bodyPadding: 10,
							// margin: '0 0 20px 300px',
							padding: '5px 10px',
							layout: 'hbox',
							defaults: {
								xtype: 'textfield',
								padding: '5px 0 0 0',
								width: '100%',
								margin: '5px 10px 0 0',
								flex: 1
							},
							items: [
								{
									fieldLabel: 'SPK Number',
									name: 'spk_no2',
									width: 200,
									readOnly: true

								},
								{
									fieldLabel: 'Contractor',
									name: 'contractor_contractorname2',
									width: 200,
									readOnly: true
								}
							]

						},
					]
				},
				{
					xtype: 'panel',
					bodyPadding: 10,
					padding: '50px 0 0 0',
					width: '100%',
					items: [
						{
							xtype: 'panel',
							bodyStyle: 'background-color:#FFFF99;border:0px',
							bodyPadding: 10,
							margin: '0 0 20px 300px',
							layout: 'hbox',
							defaults: {
								xtype: 'textfield',
								padding: '5px 0 0 0',
								width: '100%',
								margin: '5px 10px 0 0',
								flex: 1
							},
							items: [
								{
									fieldLabel: 'Status',
									name: 'unitstatus_status',
									readOnly: true

								},
								{
									fieldLabel: 'Const. Progress',
									name: 'progress',
									readOnly: true
								}
							]

						},
						{
							xtype: 'container',
							layout: 'hbox',
							width: '100%',
							defaults: {
								xtype: 'container',
								layout: 'vbox',
								width: '100%',
								flex: 1
							},
							items: [
								{
									defaults: {
										xtype: 'container',
										layout: 'hbox',
										width: '100%',
										flex: 1
									},
									items: [
										{
											defaults: {
												xtype: 'textfield',
												readOnly: true,
												flex: 1,
												padding: '5px 10px 0 0'
											},
											items: [
												{
													fieldLabel: 'Kawasan / Cluster',
													name: 'cluster_code'

												},
												{
													fieldLabel: '',
													name: 'cluster_cluster'

												}
											]
										},
										{
											defaults: {
												xtype: 'textfield',
												readOnly: true,
												flex: 1,
												padding: '5px 10px 0 0'
											},
											items: [
												{
													fieldLabel: 'Block Name',
													name: 'block_code'

												},
												{
													fieldLabel: '',
													name: 'block_block'

												}
											]
										},
										{
											defaults: {
												xtype: 'textfield',
												readOnly: true,
												flex: 1,
												padding: '5px 10px 0 0'
											},
											items: [
												{
													xtype: 'cbunit',
													width: '100%',
													fieldLabel: 'Kavling / Unit No.',
													flex: 2,
													storeUrl: 'spk',
													name: 'unit_unit_number',
													readOnly: true,
												},
												{
													xtype: 'label',
													text: '',
													margin: '5px 10px 0 0',
													flex: 1
												}
											]
										}
									]
								},
								{
									defaults: {
										xtype: 'container',
										width: '100%',
										layout: 'hbox'
									},
									items: [
										{
											xtype: 'textfield',
											padding: '5px 0 0 0',
											width: '100%',
											fieldLabel: 'Product Category',
											name: 'productcategory_productcategory',
											readOnly: true,
											fieldStyle: 'background:none !important;background-color:#F2F2F2 !important;'
										},
										{
											xtype: 'textfield',
											padding: '5px 0 0 0',
											width: '100%',
											fieldLabel: 'Type',
											name: 'type_name',
											readOnly: true,
											fieldStyle: 'background:none !important;background-color:#F2F2F2 !important;'
										},
										{
											defaults: me.textFieldDefault(),
											items: [
												{
													fieldLabel: 'Land Size',
													name: 'land_size',
													flex: 2
												},
												{
													xtype: 'label',
													text: 'm2',
													width: 30,
													padding: '5px 0 0 5px',
													margin: '0 10px 0 0'
												},
												{
													fieldLabel: 'Long',
													name: 'long',
													labelWidth: 30,
													flex: 1
												},
												{
													xtype: 'label',
													text: 'm',
													width: 20,
													padding: '5px 0 0 5px'
												}
											]
										},
										{
											defaults: me.textFieldDefault(),
											items: [
												{
													fieldLabel: 'Building Size',
													name: 'building_size',
													flex: 2
												},
												{
													xtype: 'label',
													text: 'm2',
													width: 30,
													padding: '5px 0 0 5px',
													margin: '0 10px 0 0'
												},
												{
													fieldLabel: 'Width',
													name: 'width',
													labelWidth: 30,
													flex: 1
												},
												{
													xtype: 'label',
													text: 'm',
													width: 20,
													padding: '5px 0 0 5px'
												}
											]
										},
										{
											defaults: me.textFieldDefault(),
											items: [
												{
													fieldLabel: 'Kelebihan Tanah',
													name: 'kelebihan',
													flex: 2
												},
												{
													xtype: 'label',
													text: 'm2',
													width: 30,
													padding: '5px 0 0 5px',
													margin: '0 10px 0 0'
												},
												{
													fieldLabel: 'Floor',
													name: 'floor',
													labelWidth: 30,
													flex: 1
												},
												{
													xtype: 'label',
													text: 'm',
													width: 20,
													padding: '5px 0 0 5px'
												}
											]
										}
									]
								}
							]
						}
					]
				},
				{
					xtype: 'panel',
					bodyPadding: 10,
					title: 'PURCHASE LETTER INFORMATION',
					collapsible: true,
					width: '100%',
					layout: 'hbox',
					defaults: {
						xtype: 'container',
						layout: 'vbox',
						width: '100%',
						flex: 1
					},
					items: [
						{
							margin: '0 20px 0 0px',
							flex: 3,
							defaults: me.textFieldDefault(),
							items: [
								{
									fieldLabel: 'Purchase Letter No',
									name: 'purchaseletter_purchaseletter_no'
								},
								{
									fieldLabel: 'Price Type',
									name: 'pricetype_pricetype'
								},
								{
									fieldLabel: 'Total Price',
									name: 'purchaseletter_harga_total_jual'
								},
								{
									//  bodyPadding: 10,
									xtype: 'container',
									layout: 'hbox',
									width: '100%',
									defaults: me.textFieldDefault(),
									items: [
										{
											fieldLabel: 'Total payment',
											name: 'purchaseletter_total_payment',
											margin: '5px 10px 0 0'
										},
										{
											fieldLabel: 'Percentage',
											name: 'Customer'
										}
									]
								}
							]
						},
						{
							flex: 2,
							defaults: me.textFieldDefault(),
							items: [
								{
									xtype: 'datefield',
									format: 'd-m-Y',
									fieldLabel: 'Purchase letter Date',
									editable: false,
									name: 'purchaseletter_purchase_date'
								},
								{
									xtype: 'datefield',
									format: 'd-m-Y',
									fieldLabel: 'Rencana Serah Terima',
									editable: false,
									name: 'purchaseletter_rencana_serahterima_date'
								},
								{
									xtype: 'datefield',
									format: 'd-m-Y',
									fieldLabel: 'Realisasi Serah Terima',
									editable: false,
									name: 'purchaseletter_realisation_serahterima_date'
								},
								{
									xtype: 'datefield',
									format: 'd-m-Y',
									fieldLabel: 'Akad Date',
									editable: false,
									name: 'purchaseletter_akad_realisasiondate'
								}
							]
						}
					]
				},
				{
					xtype: 'panel',
					bodyPadding: 10,
					title: 'CUSTOMER INFORMATION',
					collapsible: true,
					width: '100%',
					layout: 'vbox',
					items: [
						{
							//  bodyPadding: 10,
							xtype: 'container',
							layout: 'hbox',
							width: '100%',
							defaults: me.textFieldDefault(),
							items: [
								{
									fieldLabel: 'Customer Name',
									name: 'customer_customer_id',
									margin: '5px 10px 0 0',
									flex: 2
								},
								{
									fieldLabel: '',
									name: 'customer_name',
									flex: 4
								}
							]
						},
						{
							xtype      : 'xaddressfieldEST',
							padding    : '5px 0 0 0',
							width      : '100%',
							fieldLabel : 'Address',
							readOnly   : true,
							name       : 'customer_address'
						},
						{
							xtype: 'textfield',
							padding: '5px 0 0 0',
							width: '100%',
							fieldLabel: 'KTP Number',
							readOnly: true,
							name: 'customer_KTP_number'
						},
						{
							xtype: 'container',
							layout: 'hbox',
							width: '100%',
							defaults: {
								xtype: 'container',
								layout: 'vbox',
								width: '100%',
								flex: 1
							},
							items: [
								{
									margin: '0 20px 0 100px',
									defaults: me.textFieldDefault(),
									items: [
										{
											fieldLabel: 'City',
											name: 'city_city_name'
										},
										{
											xtype      : 'xphonenumberfieldEST',
											fieldLabel : 'Home phone',
											name       : 'customer_home_phone'
										},
										{
											xtype      : 'xphonenumberfieldEST',
											fieldLabel : 'Office phone',
											name       : 'customer_office_phone'
										}
									]
								},
								{
									defaults: me.textFieldDefault(),
									items: [
										{
											fieldLabel: 'Zip code',
											name: 'customer_zipcode'
										},
										{
											xtype      : 'xphonenumberfieldEST',
											fieldLabel : 'Mobile phone',
											name       : 'customer_mobile_phone'
										},
										{
											xtype      : 'xphonenumberfieldEST',
											fieldLabel : 'FAX',
											name       : 'customer_fax'
										}
									]
								}
							]
						}
					]
				},
				{
					xtype: 'panel',
					bodyPadding: 10,
					title: 'SPK INFORMATION',
					collapsible: true,
					width: '100%',
					layout: 'vbox',
					itemId: 'myFormdataSPKInformationPanelID',
					items: [
						{
							xtype: 'container',
							layout: 'hbox',
							width: '100%',
							defaults: {
								xtype: 'container',
								layout: 'vbox',
								width: '100%',
								flex: 1
							},
							items: [
								{
									margin: '0 20px 0 0',
									flex: 3,
									defaults: me.textFieldDefault(),
									items: [
										{
											//  bodyPadding: 10,
											xtype: 'container',
											layout: 'hbox',
											defaults: me.textFieldDefault(),
											items: [
												{
													fieldLabel: 'SPK Number',
													name: 'spk_no',
													margin: '5px 10px 0 0',
													flex: 5
												},
												{
													fieldLabel: '',
													name: 'spk_spk_id_display',
													flex: 1
												}
											]
										},
										{
											fieldLabel: 'Contractor',
											name: 'contractor_contractorname'
										},
										{
											//  bodyPadding: 10,
											xtype: 'container',
											layout: 'hbox',
											defaults: me.textFieldDefault(),
											items: [
												{
													fieldLabel: 'Working Date',
													xtype: 'datefield',
													format: 'd-m-Y',
													name: 'started',
													editable: false,
													margin: '5px 10px 0 0',
													flex: 3
												},
												{
													xtype: 'label',
													text: 'to',
													width: 10,
													margin: '0 10px 0 5px',
												},
												{
													fieldLabel: '',
													xtype: 'datefield',
													format: 'd-m-Y',
													editable: false,
													name: 'ended',
													flex: 2
												}
											]
										},
										{
											fieldLabel: 'Pelaksana',
											name: 'contractor_contractorname'
										},
										{
											fieldLabel: 'Supervisor',
											name: 'contractor_PIC'
										}

									]
								},
								{
									flex: 2,
									defaults: me.textFieldDefault(),
									items: [
										{
											fieldLabel: 'SPK Status',
											name: 'status'
										},
										{
											xtype: 'dfdatefield',
											//   format: 'd-m-Y',
											fieldLabel: 'SPK Date',
											editable: false,
											name: 'spk_date'
										},
										{
											//  bodyPadding: 10,
											xtype: 'container',
											layout: 'hbox',
											defaults: me.textFieldDefault(),
											items: [
												{
													fieldLabel: 'Progress',
													name: 'progress',
													margin: '5px 10px 0 0',
													flex: 2

												},
												{
													xtype: 'label',
													text: '%',
													width: 10,
													margin: '0 0 0 5px'
												}
											]
										},
										{
											xtype: 'combobox',
											name: 'employee',
											displayField: 'employee_name',
											valueField: 'employee_id',
											fieldLabel: 'Pengawas',
											anchor: '-15',
											margin: '5px 10px 0 0',
											readOnly: false,
											fieldStyle: 'background:none !important;background-color:#fff !important;'

										},
									]
								}
							]
						},
						{
							xtype      : 'xnotefieldEST',
							padding    : '5px 0 0 0',
							width      : '100%',
							fieldLabel : 'Note',
							name       : 'description',
							fieldStyle : me.textfieldStyle(true, true),
							readOnly   : true,
						},
						{
							xtype: 'container',
							layout: 'hbox',
							defaults: {
								xtype: 'button',
								width: '100%',
								flex: 1,
								margin: '5px 10px 0 0'
							},
							items: [
								{
									text: 'Show SPK list',
									margin: '5px 10px 0 100px',
									action: 'show_spk'
								},
								{
									xtype: 'label',
									text: 'spk page info',
									itemId: 'spkPageInfo',
									width: 70,
									margin: '5px 10px 0 300px'
								},
								{
									text: 'Previous',
									action: 'previous',
									itemId: 'previousButton'
								},
								{
									text: 'Next',
									action: 'next',
									itemId: 'nextButton'
								}
							]
						},
						{
							xtype: 'checkboxfield',
							anchor: '100%',
							fieldLabel: 'Hold Teknik',
							name: 'is_holdteknik',
							inputValue: 1,
							uncheckedValue: 0,
							readOnly: true,
						},
						{
							xtype      : 'xnotefieldEST',
							padding    : '5px 0 0 0',
							width      : '100%',
							fieldLabel : 'Notes Hold Teknik',
							name       : 'notes_holdteknik',
							fieldStyle : me.textfieldStyle(true, true),
							readOnly   : true,
						},
					]
				},
				{
					xtype: 'panel',
					bodyPadding: 10,
					title: 'Construction Target',
					collapsible: true,
					width: '100%',
					layout: 'vbox',
					items: [
						{
							xtype: 'progressgridtarget',
							itemId: "ProgressGridTarget",
							height: 250,
							width: '100%'
						}
					]
				},
				{
					xtype: 'panel',
					bodyPadding: 10,
					title: 'Skema Pencairan',
					collapsible: true,
					width: '100%',
					layout: 'vbox',
					items: [
						{
							xtype: 'progressgridpencairan',
							itemId: "ProgressGridPencairan",
							height: 250,
							width: '100%'
						}
					]
				},
				{
					xtype: 'panel',
					bodyPadding: 10,
					title: 'Detail Progress',
					collapsible: true,
					width: '100%',
					layout: 'vbox',
					items: [
						{
							xtype: 'progressgriddetail',
							itemId: "ProgressGridDetail",
							height: 250,
							width: '100%'
						}
					]
				},
				{
					xtype: 'panel',
					bodyPadding: 10,
					title: 'Status Rubah Design',
					collapsible: true,
					width: '100%',
					layout: 'vbox',
					items: [
						{
							xtype: 'container',
							layout: 'hbox',
							width: '100%',
							defaults: {
								xtype: 'container',
								layout: 'vbox',
								width: '100%',
								flex: 1
							},

							items:
									[
										{
											// Arrange checkboxes into two columns, distributed vertically
											xtype: 'checkboxgroup',
											columns: 1,
											vertical: true,
											items: [
												{boxLabel: 'Rubah Design', name: 'rb1', inputValue: '1'},
												{boxLabel: 'Berita Acara', name: 'rb2', inputValue: '1'},
												{boxLabel: 'Gambar', name: 'rb3', inputValue: '1'},
												{boxLabel: 'Jadwal', name: 'rb4', inputValue: '1'},
												{boxLabel: 'SIK', name: 'rb5', inputValue: '1'},
											]
										},
										{
											flex: 2,
											fieldStyle: me.textfieldStyle(true, true),
											readOnly: false,
											items: [
												{
													xtype: 'datefield',
													format: 'd-m-Y',
													fieldLabel: 'Serah Terima 1',
													name: 'serahterima1_date',
													altFormats: 'd-m-Y',
													submitFormat: 'd-m-Y',
													editable: false,
													value: new Date()
												},
												{
													xtype: 'datefield',
													format: 'd-m-Y',
													fieldLabel: 'Serah Terima 2',
													name: 'serahterima2_date',
													altFormats: 'd-m-Y',
													submitFormat: 'd-m-Y',
													editable: false,
													value: new Date()
												},
												{
													xtype      : 'xnotefieldEST',
													fieldLabel : 'Note',
													name       : 'description2',
													padding    : '5px 0 0 0',
													width      : '100%',
												},
											]
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
						padding: 5,
						width: 75,
						iconCls: 'icon-save',
						text: 'Save'
					},
					{
						xtype: 'button',
						action: 'cancel',
						itemId: 'btnCancel',
						padding: 5,
						width: 75,
						iconCls: 'icon-cancel',
						text: 'Close',
						handler: function () {
							this.up('window').close();
						}
					}
				]
			}
		];
		return x;
	}
});