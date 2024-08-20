Ext.define('Erems.view.marketingstock.FormData', {
	extend      : 'Erems.library.template.view.FormData',
	alias       : 'widget.marketingstockformdata',
	requires    : ['Erems.template.ComboBoxFields'],
	frame       : true,
	autoScroll  : true,
	anchorSize  : 100,
	// minWidth    : 820,
	// maxWidth    : 820,
	height      : 600,
	bodyBorder  : true,
	bodyPadding : 10,
	bodyStyle   : 'padding:5px 5px 0',
	editedRow   : -1,
	defaults    : {
		border : false,
		xtype  : 'panel',
		flex   : 1,
		layout : ''
	},
	initComponent: function () {
		var me = this;

		var cbf = new Erems.template.ComboBoxFields();

		Ext.applyIf(me, {
			items: [
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_id',
					name   : 'marketstock_id'
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_unit_id',
					name   : 'unit_id'
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_list_unit_id',
					name   : 'list_unit_id'
				},
				{
					xtype : 'hiddenfield',
					name  : 'purpose_code'
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_cluster_cluster_id',
					name   : 'cluster_cluster_id'
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_productcategory_id',
					name   : 'productcategory_productcategory_id'
				},
				{
					xtype       : 'panel',
					bodyPadding : 10,
					title       : 'GENERAL INFORMATION',
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
										labelWidth : 35,
										readOnly   : true
									},
									items       : [
										{
											fieldLabel : 'State',
											name       : 'status_text',
											value      : 'AVAILABLE',
											flex       : 1,
											// fieldStyle : 'background-color:#FFCC00;background-image: none;'
										},
										{
											xtype : 'splitter',
											width : 	5,
										},
										{
											fieldLabel : 'Const. Progress',
											name       : 'progress',
											value      : '0',
											flex       : 1,
											labelWidth : 90,
											// fieldStyle : 'background-color:#FFCC00;background-image: none;'
										},
										{
											xtype   : 'label',
											text    : '%',
											width   : 5,
											padding : '5px 0 0 0'
										}
									]
								}
							]
						},
						{
							padding   : '10px 0 0 0',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							defaults  : {
								readOnly   : true,
								fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
							},
							items : [
								{
									xtype      : 'textfield',
									fieldLabel : 'Kawasan / Cluster',
									anchor     : '-5',
									name       : 'cluster_code',
									flex       : 4
								},
								{
									xtype : 'splitter',
									width : 5,
								},
								{
									xtype      : 'textfield',
									fieldLabel : '',
									anchor     : '-5',
									name       : 'cluster_cluster',
									flex       : 6
								},
								{
									xtype : 'splitter',
									width : 30,
								},
								{
									xtype      : 'textfield',
									fieldLabel : 'Land Size',
									anchor     : '-5',
									name       : 'land_size',
									id         : 'land_size',
									labelWidth : 70,
									flex       : 3
								},
								{
									xtype   : 'label',
									flex    : 1,
									text    : 'm2',
									padding : '0 0 0 10px'
								},
								{
									xtype : 'splitter',
									width : 5,
								},
								{
									xtype      : 'textfield',
									fieldLabel : 'Building Size',
									anchor     : '-5',
									name       : 'building_size',
									labelWidth : 70,
									flex       : 3
								},
								{
									xtype      : 'hidden',
									fieldLabel : 'Salesgroup',
									name       : 'type_salesgroup'
								},
								{
									xtype   : 'label',
									flex    : 1,
									text    : 'm2',
									padding : '0 0 0 10px'
								}
							]
						},
						{
							padding   : '10px 0 0 0',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							defaults  : {
								readOnly   : true,
								fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
							},
							items: [
								{
									xtype      : 'textfield',
									fieldLabel : 'Block name',
									anchor     : '-5',
									name       : 'block_code',
									flex       : 4
								},
								{
									xtype : 'splitter',
									width : 5,
								},
								{
									xtype      : 'textfield',
									fieldLabel : '',
									anchor     : '-5',
									name       : 'block_block',
									flex       : 6
								},
								{
									xtype : 'splitter',
									width : 30,
								},
								{
									xtype      : 'textfield',
									fieldLabel : 'Floor',
									anchor     : '-5',
									name       : 'floor',
									labelWidth : 70,
									flex       : 3
								},
								{
									xtype   : 'label',
									flex    : 1,
									text    : '',
									padding : '0 0 0 10px'
								},
								{
									xtype : 'splitter',
									width : 5,
								},
								{
									xtype      : 'textfield',
									fieldLabel : 'Floor Size',
									anchor     : '-5',
									name       : 'floor_size',
									labelWidth : 70,
									flex       : 3
								},
								{
									xtype   : 'label',
									flex    : 1,
									text    : 'm2',
									padding : '0 0 0 10px'
								}
							]
						},
						{
							padding   : '10px 0 0 0',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							defaults  : {
								readOnly   : true,
								fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
							},
							items: [
								{
									xtype      : 'textfield',
									fieldLabel : 'Product category',
									anchor     : '-5',
									name       : 'productcategory_code',
									flex       : 4
								},
								{
									xtype : 'splitter',
									width : 5,
								},
								{
									xtype      : 'textfield',
									fieldLabel : '',
									anchor     : '-5',
									name       : 'productcategory_productcategory',
									flex       : 6
								},
								{
									xtype : 'splitter',
									width : 30,
								},
								{
									xtype      : 'textfield',
									fieldLabel : 'Bedroom',
									anchor     : '-5',
									name       : 'bedroom',
									labelWidth : 70,
									flex       : 3
								},
								{
									xtype   : 'label',
									flex    : 1,
									text    : '',
									padding : '0 0 0 10px'
								},
								{
									xtype : 'splitter',
									width : 5,
								},
								{
									xtype      : 'textfield',
									fieldLabel : 'Bathroom',
									anchor     : '-5',
									name       : 'bathroom',
									labelWidth : 70,
									flex       : 3
								},
								{
									xtype   : 'label',
									flex    : 1,
									text    : '',
									padding : '0 0 0 10px'
								}
							]
						},
						{
							padding   : '10px 0 0 0',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							defaults  : {
								readOnly   : true,
								fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
							},
							items: [
								{
									xtype      : 'textfield',
									fieldLabel : 'Type',
									anchor     : '-5',
									name       : 'type_code',
									flex       : 4
								},
								{
									xtype : 'splitter',
									width : 5,
								},
								{
									xtype  : 'textfield',
									name   : 'default_type',
									id     : 'default_type',
									hidden : true
								},
								{
									xtype  : 'textfield',
									name   : 'default_land',
									id     : 'default_land',
									hidden : true
								},
								{
									xtype  : 'textfield',
									name   : 'default_kelebihan',
									id     : 'default_kelebihan',
									hidden : true
								},
								{
										xtype        : 'combobox',
										queryMode    : 'local',
										displayField : cbf.type.d,
										valueField   : cbf.type.v,
										fieldLabel   : '',
										name         : 'type_type_id',
										readOnly     : false,
										fieldStyle   : 'background-color:#FFF !important;',
										flex         : 6,
										listeners    : {
										focus        : function () {
											var land   = Ext.getCmp('land_size');
											var kel    = Ext.getCmp('kelebihan');
											var d_land = Ext.getCmp('default_land');
											var d_kel  = Ext.getCmp('default_kelebihan');

											d_land.setValue(land.getValue());
											d_kel.setValue(kel.getValue());

										},
										change: function (el, val, prev) {
											var d = Ext.getCmp('default_type');
											d.setValue(prev);
										}
									}
								},
								{
									xtype : 'splitter',
									width : 30,
								},
								{
									xtype      : 'textfield',
									fieldLabel : 'Width',
									anchor     : '-5',
									name       : 'width',
									labelWidth : 70,
									flex       : 3
								},
								{
									xtype   : 'label',
									flex    : 1,
									text    : 'm',
									padding : '0 0 0 10px'
								},
								{
									xtype : 'splitter',
									width : 5,
								},
								{
									xtype      : 'textfield',
									fieldLabel : 'Long',
									anchor     : '-5',
									name       : 'long',
									labelWidth : 70,
									flex       : 3
								},
								{
									xtype   : 'label',
									flex    : 1,
									text    : 'm',
									padding : '0 0 0 10px'
								}
							]
						},
						{
							padding   : '10px 0 0 0',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							defaults  : {
								readOnly   : true,
								fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
							},
							items: [
								{
									xtype      : 'textfield',
									fieldLabel : 'PT Name',
									anchor     : '-5',
									name       : 'pt_code',
									flex       : 4
								},
								{
									xtype : 'splitter',
									width : 5,
								},
								{
									xtype        : 'combobox',
									queryMode    : 'local',
									displayField : cbf.pt.d,
									valueField   : cbf.pt.v,
									allowBlank   : false,
									name         : 'pt_pt_id',
									readOnly     : false,
									fieldStyle   : 'background-color:#FFF !important;',
									flex         : 6
								},
								{
									xtype : 'splitter',
									width : 30,
								},
								{
									xtype      : 'textfield',
									fieldLabel : 'Kelebihan tanah',
									anchor     : '-5',
									name       : 'kelebihan',
									id         : 'kelebihan',
									labelWidth : 70,
									flex       : 3
								},
								{
									xtype   : 'label',
									flex    : 1,
									text    : 'm2',
									padding : '0 0 0 10px'
								},
								{
									xtype : 'splitter',
									width : 5,
								},
								{
									xtype      : 'textfield',
									fieldLabel : 'Electricity',
									anchor     : '-5',
									name       : 'electricity',
									labelWidth : 70,
									flex       : 3
								},
								{
									xtype   : 'label',
									flex    : 1,
									text    : 'watt',
									padding : '0 0 0 10px'
								}
							]
						}, {
							padding   : '10px 0 0 0',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype      : 'textfield',
									fieldLabel : 'Kavling Number',
									anchor     : '-5',
									name       : 'unit_number',
									flex       : 4,
									readOnly   : true,
									fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
								},
								{
									xtype   : 'label',
									flex    : 3,
									text    : '',
									padding : '0 0 0 10px'
								}
							]
						}
					]
				},
				/* MARKETING PRICE INFORMATION*/
				{
					xtype       : 'panel',
					title       : 'MARKETING PRICE INFORMATION',
					bodyPadding : 10,
					items       : [
						{
							padding: '10px 0 0 0',
							layout: 'hbox',
							bodyStyle: 'border:0px',
							items: [
								{
									xtype        : 'datefield',
									format       : 'd-m-Y',
									submitFormat : 'Y-m-d',
									fieldLabel   : 'Rencana serah terima',
									anchor       : '-5',
									name         : 'serahterima_plan',
									value        : new Date(),
									flex         : 5,
									editable     : false
								},
								{
									xtype : 'splitter',
									width : 20,
								},
								{
									xtype   : 'label',
									flex    : 2,
									text    : 'Tunjangan uang muka',
									padding : '0 0 0 10px'
								},
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : 'Rp.',
									anchor     : '-5',
									name       : 'tunjangan_uangmuka',
									labelWidth : 20,
									flex       : 3,
									width      : 450,
									value      : 0.00,
								},
								{
									xtype: 'splitter',
									width: 20,
								},
								{
									xtype   : 'label',
									flex    : 2,
									text    : 'Harga NJOP',
									padding : '0 0 0 10px'
								},
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : 'Rp.',
									anchor     : '-5',
									labelWidth : 20,
									name       : 'hargatanah_njop',
									value      : 0.00,
									flex       : 3
								},
								{
									xtype   : 'label',
									flex    : 1,
									text    : '/m2',
									padding : '0 0 0 10px'
								}
							]
						},
						{
							padding   : '10px 0 0 0',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype : 'label',
									flex  : 2,
									text  : 'Minimum Tanda Jadi',
								},
								{
									xtype      : 'xmoneyfieldEST',
									fieldLabel : 'Rp.',
									anchor     : '-5',
									labelWidth : 20,
									name       : 'minimum_tj',
									value      : 0.00,
									flex       : 3
								},
								{
									xtype: 'label',
									flex: 2
								},
								{
									xtype          : 'checkboxfield',
									fieldLabel     : '',
									name           : 'unit_is_readysell',
									checked        : true,
									inputValue     : '1',
									uncheckedValue : '0',
									margin         : '0 5px 0 0',
									width          : 20
								},
								{
									xtype : 'label',
									flex  : 2,
									text  : 'Siap Jual'
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
							align     : "left",
							items     : [
								{
									xtype : 'label',
									flex  : 2,
									text  : 'Hold Management'
								},
								{
									xtype          : 'checkboxfield',
									anchor         : '-5',
									name           : 'is_holdmanagement',
									itemId         : 'is_holdmanagement',
									inputValue     : '1',
									uncheckedValue : '0',
									margin         : '0 5px 0 0'
								},
								{
									xtype : 'label',
									flex  : 6
								}
							]
						},
						{
							padding   : '10px 0 0 0',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype : 'label',
									flex  : 1,
									text  : 'Notes Hold Management'
								},
								{
									xtype      : 'xnotefieldEST',
									name       : 'notes_holdmanagement',
									itemId     : 'notes_holdmanagement',
									inputValue : '1',
									width      : 550,
									height     : 100,
									disabled   : true
								}
							]
						},
						{
							padding   : '10px 0 0 0',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype : 'label',
									flex  : 1,
									text  : 'Prev Hold Management'
								},
								{
									xtype    : 'xnotefieldEST',
									name     : 'prev_holdmanagement',
									itemId   : 'prev_holdmanagement',
									hidden   : false,
									width    : 550,
									height   : 100,
									disabled : true
								}
							]
						},
						{
							xtype     : 'fieldset',
							title     : 'COPY DATA',
							margin    : '10px 0 0 0',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype      : 'radiogroup',
									fieldLabel : '',
									// Arrange radio buttons into two columns, distributed vertically
									columns    : 3,
									itemId     : 'copyRg',
									flex       : 3,
									vertical   : true,
									items      : [
										{boxLabel: 'KPR -> Tunai', name: 'rb', inputValue: 'kt'},
										{boxLabel: 'Inhouse -> Tunai', name: 'rb', inputValue: 'iht'},
										{boxLabel: 'Tunai -> KPR', name: 'rb', inputValue: 'tk', checked: true},
										{boxLabel: 'Inhouse -> KPR', name: 'rb', inputValue: 'ihk'},
										{boxLabel: 'Tunai -> Inhouse', name: 'rb', inputValue: 'tih'},
										{boxLabel: 'KPR -> Inhouse', name: 'rb', inputValue: 'kih'}
									]
								}, {
									flex      : 2,
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype      : 'xmoneyfieldEST',
											fieldLabel : 'Parameter persentase harga',
											anchor     : '-5',
											name       : 'persen_copy',
											flex       : 8,
											value      : 0.00
										},
										{
											xtype   : 'label',
											flex    : 1,
											text    : '%',
											padding : '0 0 0 10px'
										},
										{
											xtype: 'splitter',
											width: 20,
										},
										{
											flex   : 4,
											xtype  : 'button',
											text   : 'Process',
											action : 'copy_data'
										}
									]
								}
							]
						},
						{
							// padding   : '10px 0 0 0',
							layout    : 'hbox',
							bodyStyle : 'border:0px',
							items     : [
								{
									xtype    : 'fieldset',
									title    : '&nbsp; ',
									margin   : '10px 0 0 0',
									flex     : 2.2,
									border   : 0,
									defaults : {
										width      : '100%',
										disabled   : true,
										fieldStyle : 'border:0;background:none;opacity:1 !important;',
										labelStyle : 'opacity:1 !important;',
										anchor     : '-5',
									},
									layout    : 'vbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype : 'textfield',
											value : 'Harga Tanah /m2'
										},
										{
											xtype      : 'textfield',
											value      : 'Harga kelebihan tanah /m2',
											fieldStyle : 'border:0;background:none;opacity:1 !important;font-size: 9px;',
											padding : '4px 0 0 0',
										},
										{
											xtype : 'textfield',
											value : 'Harga Tanah',
											padding : '4px 0 0 0',
										},
										{
											xtype      : 'textfield',
											value      : 'Harga kelebihan tanah',
											fieldStyle : 'border:0;background:none;opacity:1 !important;font-size: 10px;',
											padding : '4px 0 0 0',
										},
										{
											xtype : 'textfield',
											value : 'Harga Bangunan',
											padding : '4px 0 0 0',
										},
										{
											xtype   : 'textfield',
											itemId  : 'box_subsidi_dp',
											value   : 'Subsidi DP',
											padding : '4px 0 0 0',
										},
										{
											xtype   : 'textfield',
											itemId  : 'box_harga_interior',
											value   : 'Harga Interior',
											padding : '4px 0 0 0',
										},
										{
											layout    : 'hbox',
											width     : '100%',
											height    : 22,
											bodyStyle : 'border:1px;background:none;background-color:#ffffff;',
											disabled  : false,
											items     : [
												{
													xtype   : 'label',
													text    : '',
													width   : '100%',
													height  : 2,
													padding : '8px 0 0 0',
													border  : '0 0 1 0',
													style   : {
														borderColor : 'white',
														borderStyle : 'solid',
													},
													flex   : 12,
													margin : '0 0'
												},
												{
													xtype   : 'label',
													text    : ' ',
													padding : '0 5px',
													flex    : 1
												}
											]
										},
										{
											xtype   : 'textfield',
											value   : 'Harga Jual Dasar',
											padding : '4px 0 0 0',
										},
										{
											xtype   : 'textfield',
											value   : 'Disc Harga Dasar',
											padding : '4px 0 0 0',
										},
										{
											xtype   : 'textfield',
											value   : 'Disc Harga Tanah',
											padding : '4px 0 0 0',
										},
										{
											xtype   : 'textfield',
											value   : 'Disc Harga Bangunan',
											padding : '4px 0 0 0',
										},
										{
											layout    : 'hbox',
											width     : '100%',
											height    : 22,
											bodyStyle : 'border:1px;background:none;background-color:#ffffff;',
											disabled  : false,
											items     : [
												{
													xtype   : 'label',
													text    : '',
													width   : '100%',
													height  : 2,
													padding : '8px 0 0 0',
													border  : '0 0 1 0',
													style   : {
														borderColor : 'white',
														borderStyle : 'solid',
													},
													flex   : 12,
													margin : '0 0'
												},
												{
													xtype   : 'label',
													text    : ' ',
													padding : '0 5px',
													flex    : 1
												}
											]
										},
										{
											xtype : 'textfield',
											value : 'Harga Netto',
										},
										{
											xtype   : 'textfield',
											value   : 'PPN Tanah',
											padding : '4px 0 0 0',
										},
										{
											xtype   : 'textfield',
											value   : 'PPN Bangunan',
											padding : '4px 0 0 0',
										},
										{
											xtype   : 'textfield',
											itemId  : 'box_ppn_subsidi_dp',
											value   : 'PPN Subsidi DP',
											padding : '4px 0 0 0',
										},
										{
											xtype   : 'textfield',
											itemId  : 'box_ppn_interior',
											value   : 'PPN Interior',
											padding : '4px 0 0 0',
										},
										{
											xtype   : 'textfield',
											value   : 'PPNBM',
											padding : '4px 0 0 0',
										},
										{
											xtype   : 'textfield',
											value   : 'PPH22',
											padding : '4px 0 0 0',
										},
										{
											xtype   : 'textfield',
											value   : 'Biaya balik nama',
											padding : '4px 0 0 0',
										},
										{
											xtype   : 'textfield',
											value   : 'Biaya perolehan hak',
											padding : '4px 0 0 0',
										},
										{
											xtype   : 'textfield',
											value   : 'Biaya akta jual beli',
											padding : '4px 0 0 0',
										},
										{
											layout    : 'hbox',
											width     : '100%',
											height    : 22,
											bodyStyle : 'border:1px;background:none;background-color:#ffffff;',
											disabled  : false,
											items     : [
												{
													xtype   : 'label',
													text    : '',
													width   : '100%',
													height  : 2,
													padding : '8px 0 0 0',
													border  : '0 0 1 0',
													style   : {
														borderColor : 'white',
														borderStyle : 'solid',
													},
													flex   : 12,
													margin : '0 0'
												},
												{
													xtype   : 'label',
													text    : ' ',
													padding : '0 5px',
													flex    : 1
												}
											]
										},
										{
											xtype      : 'textfield',
											value      : 'HARGA JUAL TOTAL',
											padding    : '2x 0 0 0',
											fieldStyle : 'border:0;background:none;opacity:1 !important;font-weight:bold;font-size: 11px;'
										}

									]
								},
								me.generateFieldGroup('t', 'TUNAI'),
								me.generateFieldGroup('k', 'KPR'),
								me.generateFieldGroup('ih', 'INHOUSE')
							]
						}]
				}],
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
				items: [
					{
						xtype   : 'button',
						action  : 'save',
						itemId  : 'btnSave',
						padding : 5,
						width   : 75,
						iconCls : 'icon-save',
						text    : 'Save'
					},
					{
						xtype   : 'button',
						action  : 'nettodua',
						itemId  : 'btnNettoDua',
						padding : 5,
						width   : 90,
						iconCls : 'icon-cal',
						text    : 'Netto 2'
					},
					{
						xtype   : 'button',
						action  : 'saveToAll',
						itemId  : 'btnSaveToAll',
						padding : 5,
						width   : 100,
						iconCls : 'icon-save',
						text    : 'Save to All',
						hidden  : true
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
	},
	generateFieldGroup: function (prefixName, title) {
		var x = {
			xtype    : 'fieldset',
			title    : title,
			defaults : {
				xtype           : 'xmoneyfieldEST',
				enableKeyEvents : true,
				fieldLabel      : '',
				anchor          : '-5',
				width           : '100%',
				minValue        : 0,
				value           : 0.00,
			},
			flex      : 3,
			margin    : '10px 0 0 0',
			layout    : 'vbox',
			bodyStyle : 'border:0px',
			items     : [
				{
					name         : prefixName + '_harga_tanah_a',
					namePrefix   : prefixName,
					nameOrigin   : 'harga_tanah_a',
					decPrecision : 4
				},
				{
					name         : prefixName + '_harga_kelebihan_a',
					namePrefix   : prefixName,
					nameOrigin   : 'harga_kelebihan_a',
					decPrecision : 4,
					padding      : '5px 0 0 0',
				},
				{
					readOnly   : true,
					fieldStyle : 'background:none;background-color:#F2F2F2 !important; text-align:right;',
					name       : prefixName + '_harga_tanah_b',
					padding    : '5px 0 0 0',
				},
				{
					readOnly   : true,
					fieldStyle : 'background:none;background-color:#F2F2F2 !important; text-align:right;',
					name       : prefixName + '_harga_kelebihan_b',
					padding    : '5px 0 0 0',
				},
				{
					name       : prefixName + '_harga_bangunan',
					namePrefix : prefixName,
					nameOrigin : 'harga_bangunan',
					padding    : '5px 0 0 0',
				},
				{
					name       : prefixName + '_subsidi_dp',
					itemId     : 'box_' + prefixName + '_subsidi_dp',
					namePrefix : prefixName,
					nameOrigin : 'subsidi_dp',
					padding    : '5px 0 0 0',
				},
				{
					name       : prefixName + '_harga_interior',
					itemId     : 'box_' + prefixName + '_harga_interior',
					namePrefix : prefixName,
					nameOrigin : 'harga_interior',
					padding    : '5px 0 0 0',
				},
				{
					layout    : 'hbox',
					width     : '100%',
					xtype     : 'panel',
					height    : 22,
					bodyStyle : 'border:0;',
					items     : [
						{
							xtype   : 'label',
							text    : '',
							width   : '100%',
							height  : 2,
							padding : '8px 0 0 0',
							border  : '0 0 1 0',
							style   : {
								borderColor : 'black',
								borderStyle : 'solid',
							},
							flex   : 12,
							margin : '0 0'
						},
						{
							xtype   : 'label',
							text    : '+',
							padding : '0 5px',
							flex    : 1
						}
					]
				},
				{
					enableKeyEvents : true,
					name            : prefixName + '_harga_jual_dasar',
					namePrefix      : prefixName,
					nameOrigin      : 'harga_jual_dasar'
				},
				{
					layout   : 'hbox',
					width    : '100%',
					defaults : {
						xtype      : 'xmoneyfieldEST',
						fieldLabel : '',
						value      : 0.00,
						readOnly   : true,
						fieldStyle : 'background:none;background-color:#F2F2F2 !important; text-align:right;',
					},
					padding   : '5px 0 0 0',
					xtype     : 'panel',
					bodyStyle : 'border:0',
					items     : [
						{
							name       : prefixName + '_disc_harga_dasar',
							namePrefix : prefixName,
							nameOrigin : 'disc_harga_dasar',
							nameGroup  : 'disc',
							anchor     : '-5',
							flex       : 2
						},
						{
							xtype   : 'label',
							text    : ' % ',
							padding : '5px 0 0 3px',
							style   : 'font-size: 11px;',
							flex    : 1
						},
						{
							name       : prefixName + '_tot_disc_harga_dasar',
							namePrefix : prefixName,
							nameOrigin : 'tot_disc_harga_dasar',
							nameGroup  : 'tot_disc',
							anchor     : '-5',
							flex       : 4
						}
					]
				},
				{
					layout   : 'hbox',
					width    : '100%',
					xtype    : 'panel',
					defaults : {
						xtype      : 'xmoneyfieldEST',
						fieldLabel : '',
						value      : 0.00,
						readOnly   : true,
						fieldStyle : 'background:none;background-color:#F2F2F2 !important; text-align:right;',
					},
					padding   : '5px 0 0 0',
					bodyStyle : 'border:0',
					items     : [
						{
							name       : prefixName + '_disc_harga_tanah',
							namePrefix : prefixName,
							nameOrigin : 'disc_harga_tanah',
							nameGroup  : 'disc',
							anchor     : '-5',
							flex       : 2
						},
						{
							xtype   : 'label',
							text    : ' % ',
							padding : '5px 0 0 3px',
							style   : 'font-size: 11px;',
							flex    : 1
						},
						{
							name       : prefixName + '_tot_disc_harga_tanah',
							namePrefix : prefixName,
							nameOrigin : 'tot_disc_harga_tanah',
							nameGroup  : 'tot_disc',
							anchor     : '-5',
							flex       : 4
						}
					]
				},
				{
					layout   : 'hbox',
					width    : '100%',
					xtype    : 'panel',
					defaults : {
						xtype      : 'xmoneyfieldEST',
						fieldLabel : '',
						value      : 0.00,
						readOnly   : true,
						fieldStyle : 'background:none;background-color:#F2F2F2 !important; text-align:right;',
					},
					padding   : '5px 0 0 0',
					bodyStyle : 'border:0',
					items     : [
						{
							name       : prefixName + '_disc_harga_bangunan',
							namePrefix : prefixName,
							nameOrigin : 'disc_harga_bangunan',
							nameGroup  : 'disc',
							anchor     : '-5',
							flex       : 2
						},
						{
							xtype   : 'label',
							text    : ' % ',
							padding : '5px 0 0 3px',
							style   : 'font-size: 11px;',
							flex    : 1
						},
						{
							name       : prefixName + '_tot_disc_harga_bangunan',
							namePrefix : prefixName,
							nameOrigin : 'tot_disc_harga_bangunan',
							nameGroup  : 'tot_disc',
							anchor     : '-5',
							flex       : 4
						}
					]
				},
				{
					layout    : 'hbox',
					width     : '100%',
					height    : 22,
					xtype     : 'panel',
					bodyStyle : 'border:0;',
					items     : [
						{
							xtype   : 'label',
							text    : '',
							width   : '100%',
							height  : 2,
							padding : '8px 0 0 0',
							border  : '0 0 1 0',
							style   : {
								borderColor : 'black',
								borderStyle : 'solid',
							},
							flex   : 12,
							margin : '0 0'
						},
						{
							xtype   : 'label',
							text    : '-',
							padding : '0 5px',
							flex    : 1
						}
					]
				},
				{
					readOnly   : true,
					fieldStyle : 'background:none;background-color:#F2F2F2 !important; text-align:right;',
					name       : prefixName + '_harga_netto',
				},
				{
					layout   : 'hbox',
					width    : '100%',
					padding  : '5px 0 0 0',
					xtype    : 'panel',
					defaults : {
						xtype           : 'xmoneyfieldEST',
						fieldLabel      : '',
						enableKeyEvents : true,
						value           : 0.00,
					},
					bodyStyle : 'border:0',
					items     : [
						{
							name       : prefixName + '_ppn_tanah',
							namePrefix : prefixName,
							nameOrigin : 'ppn_tanah',
							nameGroup  : 'disc',
							anchor     : '-5',
							flex       : 2
						},
						{
							xtype   : 'label',
							text    : ' % ',
							padding : '5px 0 0 3px',
							style   : 'font-size: 11px;',
							flex    : 1
						},
						{
							name       : prefixName + '_tot_ppn_tanah',
							namePrefix : prefixName,
							nameOrigin : 'tot_ppn_tanah',
							nameGroup  : 'tot_disc',
							anchor     : '-5',
							flex       : 4
						}
					]
				},
				{
					layout   : 'hbox',
					width    : '100%',
					xtype    : 'panel',
					defaults : {
						xtype           : 'xmoneyfieldEST',
						fieldLabel      : '',
						enableKeyEvents : true,
						value           : 0.00,
					},
					padding   : '5px 0 0 0',
					bodyStyle : 'border:0',
					items     : [
						{
							name       : prefixName + '_ppn_bangunan',
							namePrefix : prefixName,
							nameOrigin : 'ppn_bangunan',
							nameGroup  : 'disc',
							anchor     : '-5',
							flex       : 2
						},
						{
							xtype   : 'label',
							text    : ' % ',
							padding : '5px 0 0 3px',
							style   : 'font-size: 11px;',
							flex    : 1
						},
						{
							name       : prefixName + '_tot_ppn_bangunan',
							namePrefix : prefixName,
							nameOrigin : 'tot_ppn_bangunan',
							nameGroup  : 'tot_disc',
							anchor     : '-5',
							flex       : 4
						}
					]
				},
				{
					layout   : 'hbox',
					width    : '100%',
					xtype    : 'panel',
					itemId   : 'box_' + prefixName + '_ppnsubsidi_dp',
					defaults : {
						xtype           : 'xmoneyfieldEST',
						fieldLabel      : '',
						enableKeyEvents : true,
						value           : 0.00,
					},
					padding   : '5px 0 0 0',
					bodyStyle : 'border:0',
					items     : [
						{
							name       : prefixName + '_ppnsubsidi_dp',
							namePrefix : prefixName,
							nameOrigin : 'ppnsubsidi_dp',
							nameGroup  : 'disc',
							anchor     : '-5',
							flex       : 2
						},
						{
							xtype   : 'label',
							text    : ' % ',
							padding : '5px 0 0 3px',
							style   : 'font-size: 11px;',
							flex    : 1
						},
						{
							name       : prefixName + '_tot_ppnsubsidi_dp',
							namePrefix : prefixName,
							nameOrigin : 'tot_ppnsubsidi_dp',
							nameGroup  : 'tot_disc',
							anchor     : '-5',
							flex       : 4
						}
					]
				},
				{
					layout   : 'hbox',
					width    : '100%',
					xtype    : 'panel',
					itemId   : 'box_' + prefixName + '_ppninterior',
					defaults : {
						xtype           : 'xmoneyfieldEST',
						fieldLabel      : '',
						enableKeyEvents : true,
						value           : 0.00,
					},
					padding   : '5px 0 0 0',
					bodyStyle : 'border:0',
					items     : [
						{
							name       : prefixName + '_ppninterior',
							namePrefix : prefixName,
							nameOrigin : 'ppninterior',
							nameGroup  : 'disc',
							anchor     : '-5',
							flex       : 2
						},
						{
							xtype   : 'label',
							text    : ' % ',
							padding : '5px 0 0 3px',
							style   : 'font-size: 11px;',
							flex    : 1
						},
						{
							name       : prefixName + '_tot_ppninterior',
							namePrefix : prefixName,
							nameOrigin : 'tot_ppninterior',
							nameGroup  : 'tot_disc',
							anchor     : '-5',
							flex       : 4
						}
					]
				},
				{
					layout   : 'hbox',
					width    : '100%',
					xtype    : 'panel',
					defaults : {
						xtype           : 'xmoneyfieldEST',
						fieldLabel      : '',
						enableKeyEvents : true,
						value           : 0.00,
					},
					padding   : '5px 0 0 0',
					bodyStyle : 'border:0',
					items     : [
						{
							name       : prefixName + '_ppnbm',
							namePrefix : prefixName,
							nameOrigin : 'ppnbm',
							nameGroup  : 'disc',
							anchor     : '-5',
							flex       : 2
						},
						{
							xtype   : 'label',
							text    : ' % ',
							padding : '5px 0 0 3px',
							style   : 'font-size: 11px;',
							flex    : 1
						},
						{
							name       : prefixName + '_tot_ppnbm',
							namePrefix : prefixName,
							nameOrigin : 'tot_ppnbm',
							nameGroup  : 'tot_disc',
							anchor     : '-5',
							flex       : 4
						}
					]
				},
				{
					layout   : 'hbox',
					width    : '100%',
					xtype    : 'panel',
					defaults : {
						xtype           : 'xmoneyfieldEST',
						fieldLabel      : '',
						enableKeyEvents : true,
						value           : 0.00,
					},
					padding   : '5px 0 0 0',
					bodyStyle : 'border:0',
					items     : [
						{
							name       : prefixName + '_pph22',
							namePrefix : prefixName,
							nameOrigin : 'pph22',
							nameGroup  : 'disc',
							anchor     : '-5',
							flex       : 2
						},
						{
							xtype   : 'label',
							text    : ' % ',
							padding : '5px 0 0 3px',
							style   : 'font-size: 11px;',
							flex    : 1
						},
						{
							name       : prefixName + '_tot_pph22',
							namePrefix : prefixName,
							nameOrigin : 'tot_pph22',
							nameGroup  : 'tot_disc',
							anchor     : '-5',
							flex       : 4
						}
					]
				},
				{
					name            : prefixName + '_harga_balik_nama',
					namePrefix      : prefixName,
					nameOrigin      : 'harga_balik_nama',
					nameGroup       : 'biaya_lain',
					enableKeyEvents : true,
					padding         : '5px 0 0 0',
					mkFlagEdit      : false
				},
				{
					name            : prefixName + '_harga_bphtb',
					namePrefix      : prefixName,
					nameOrigin      : 'harga_bphtb',
					nameGroup       : 'biaya_lain',
					padding         : '5px 0 0 0',
					enableKeyEvents : true,
				},
				{
					name            : prefixName + '_harga_bajtb',
					namePrefix      : prefixName,
					nameOrigin      : 'harga_bajtb',
					nameGroup       : 'biaya_lain',
					padding         : '5px 0 0 0',
					enableKeyEvents : true,
				},
				{
					layout    : 'hbox',
					width     : '100%',
					height    : 22,
					xtype     : 'panel',
					bodyStyle : 'border:0;',
					items     : [
						{
							xtype   : 'label',
							text    : '',
							width   : '100%',
							height  : 2,
							padding : '8px 0 0 0',
							border  : '0 0 1 0',
							style   : {
								borderColor : 'black',
								borderStyle : 'solid',
							},
							flex   : 12,
							margin : '0 0'
						},
						{
							xtype   : 'label',
							text    : '+',
							padding : '0 5px',
							flex    : 1
						}
					]
				},
				{
					readOnly   : true,
					fieldStyle : 'background:none;background-color:#F2F2F2 !important; text-align:right;',
					name       : prefixName + '_total'
				}
			]
		};
		return x;
	}
});
