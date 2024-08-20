Ext.define('Erems.view.netpresentvalue.FormData', {
	extend      : 'Erems.library.template.view.FormData',
	alias       : 'widget.netpresentvalueformdata',
	requires    : ['Erems.view.netpresentvalue.GridDetailStandard', 'Erems.view.netpresentvalue.GridDetailRealisasi'],
	frame       : true,
	autoScroll  : true,
	anchorSize  : 100,
	height      : 650,
	bodyBorder  : true,
	bodyPadding : 10,
	bodyStyle   : 'padding:5px 5px 0',
	defaults    : {
		border : false,
		xtype  : 'panel',
		flex   : 1,
		layout : ''
	},
	initComponent: function () {
		var me = this;
		Ext.applyIf(me, {
			defaults: {
				labelSeparator : ' ',
				labelClsExtra  : 'small',
				fieldStyle     : 'margin-bottom:3px;',
				anchor         : '100%'
			},
			items: [
				{xtype: 'hiddenfield', name: 'npv_id'},
				{xtype: 'hiddenfield', name: 'purchaseletter_id'},
				me.form_unit_information(),
				me.form_purchaseletter_information(),
				me.form_npv(),
			],
			dockedItems: me.generateDockedItem()
		});
		me.callParent(arguments);
	},
	form_unit_information : function(){
		var obj = {
			xtype       : 'panel', 
			bodyPadding : 10, 
			title       : 'UNIT INFORMATION', 
			collapsible : true,
			width       : '100%',
			items       : [
				{
					xtype     : 'panel',
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
								defaultMargins : {top: 0, right: 0, bottom: 10, left: 0}
							},
							maxWidth  : 445,
							bodyStyle : 'border:0px',
							items     : [
								{
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									width     : '100%',
									items     : [{
											xtype      : 'textfield',
											fieldLabel : 'Kawasan / Cluster',
											anchor     : '-5',
											name       : 'code',
											flex       : 5,
											readOnly   : true,
											labelWidth : 120,
										}, 
										{
											xtype : 'splitter', 
											width : 5,
										},
										{
											xtype      : 'clustercombobox',
											itemId     : 'fd_clustercb',
											fieldLabel : '',
											anchor     : '-5',
											name       : 'unit_cluster_id',
											flex       : 6,
											readOnly   : true,
										}
									]
								},
								{
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									width     : '100%',
									items     : [{
											xtype      : 'textfield',
											fieldLabel : 'Block name',
											anchor     : '-5',
											name       : 'block_code',
											flex       : 5,
											readOnly   : true,
											labelWidth : 120,
										}, 
										{
											xtype : 'splitter', 
											width : 5,
										}, {
											xtype      : 'blockcombobox',
											itemId     : 'fd_blockcb',
											fieldLabel : '',
											anchor     : '-5',
											name       : 'unit_block_id',
											flex       : 6,
											readOnly   : true,
										}]
								},
								{
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									width     : '100%',
									items     : [
										{
											xtype      : 'textfield',
											fieldLabel : 'PT',
											anchor     : '-5',
											name       : 'unit_pt_name',
											flex       : 1,
											readOnly   : true,
											labelWidth : 120,
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
											labelWidth : 120,
										}, 
										{
											xtype : 'splitter', 
											width : 5,
										}, 
										{
											xtype   : 'button',
											text    : 'Browse',
											itemId  : 'fd_browse_unit_btn',
											padding : '2px 5px',
											action  : 'browse_unit',
											iconCls : 'icon-search',
											style   : 'background-color:#FFC000;'
										},
										{
											xtype : 'label', 
											text  : '', 
											flex  : 2,
										}
									]
								}
							]
						},
						{
							xtype : 'splitter', 
							width : 30
						},
						{
							xtype  : 'panel', 
							flex   : 7,
							layout : {
								type           : 'vbox',
								defaultMargins : {top : 0, right : 0, bottom : 10, left : 0}
							},
							maxWidth  : 450,
							bodyStyle : 'border:0px',
							items     : [
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
											labelWidth : 120,
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
											labelWidth : 120,
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
											labelWidth : 120,
										},
										{
											xtype  : 'label', 
											text   : 'm2', 
											flex   : 1, 
											margin : '0 0 0 10px'
										},
										{
											xtype : 'splitter', 
											width : 30,
										}, 
										{
											xtype      : 'textfield',
											fieldLabel : 'Long',
											anchor     : '-5',
											name       : 'unit_long',
											flex       : 6,
											readOnly   : true,
											labelWidth : 30,
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
											labelWidth : 120,
										},
										{
											xtype  : 'label', 
											text   : 'm2', 
											flex   : 1, 
											margin : '0 0 0 10px'
										},
										{
											xtype : 'splitter', 
											width : 30,
										}, 
										{
											xtype      : 'textfield',
											fieldLabel : 'Width',
											anchor     : '-5',
											name       : 'unit_width',
											flex       : 6,
											labelWidth : 30,
											readOnly   : true,
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
											labelWidth : 120,
										},
										{
											xtype  : 'label', 
											text   : 'm2', 
											flex   : 1, 
											margin : '0 0 0 10px'
										},
										{
											xtype : 'splitter', 
											width : 30,
										}, 
										{
											xtype      : 'textfield',
											fieldLabel : 'Floor',
											anchor     : '-5',
											name       : 'unit_floor',
											flex       : 6,
											labelWidth : 30,
											readOnly   : true,
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
		};
		return obj;
	},
	form_purchaseletter_information : function(){
		var obj = {
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
					width     : '100%',
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
											labelWidth : 120,
										}, 
										{
											xtype : 'splitter', 
											width : 30,
										}, 
										{
											xtype        : 'datefield',
											fieldLabel   : 'Purchase Letter Date',
											anchor       : '-5',
											name         : 'purchase_date',
											flex         : 1,
											readOnly     : true,
											format       : 'd-m-Y',
											altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
											submitFormat : 'Y-m-d H:i:s.u',
											labelWidth   : 120,
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
											labelWidth : 120,
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
											fieldLabel : 'KTP Number',
											anchor     : '-5',
											name       : 'customer_ktp',
											flex       : 1,
											readOnly   : true,
											labelWidth : 120,
										}, 
										{
											xtype : 'splitter', 
											width : 30
										},
										{
											xtype      : 'textfield',
											fieldLabel : 'NPWP',
											anchor     : '-5',
											name       : 'customer_npwp',
											flex       : 1,
											readOnly   : true,
											labelWidth : 120,
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
											fieldLabel : 'Pricetype',
											anchor     : '-5',
											name       : 'pricetype',
											flex       : 1,
											readOnly   : true,
											labelWidth : 120,
										}, 
										{
											xtype : 'splitter', 
											width : 30
										},
										{
											xtype      : 'xmoneyfield',
											fieldLabel : 'Harga Netto',
											anchor     : '-5',
											name       : 'harga_netto',
											flex       : 1,
											readOnly   : true,
											fieldStyle : 'background:none;background-color:#EBEBE4;',
											labelWidth : 120,
										}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype      : 'xmoneyfield',
											fieldLabel : 'Harga Total Jual',
											anchor     : '-5',
											name       : 'harga_total_jual',
											flex       : 1,
											readOnly   : true,
											fieldStyle : 'background:none;background-color:#EBEBE4;',
											labelWidth : 120,
										},
										{
												xtype : 'splitter', 
												width : 30
										},
										{
											xtype      : 'xmoneyfield',
											fieldLabel : 'Total Payment',
											anchor     : '-5',
											name       : 'total_payment',
											flex       : 1,
											readOnly   : true,
											fieldStyle : 'background:none;background-color:#EBEBE4;',
											labelWidth : 120,
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
											fieldLabel : '% Pembayaran',
											anchor     : '-5',
											name       : 'persen_pembayaran',
											flex       : 1,
											readOnly   : true,
											labelWidth : 120,
										}, 
										{
											xtype : 'splitter', 
											width : 30
										},
										{
											xtype      : 'xmoneyfield',
											fieldLabel : 'Discount Collection',
											anchor     : '-5',
											name       : 'disc_collection',
											flex       : 1,
											readOnly   : true,
											fieldStyle : 'background:none;background-color:#EBEBE4;',
											labelWidth : 120,
										}
									]
								},
							]
						},
					]
				}
			]
		};

		return obj;
	},
	form_npv : function(){
		var me = this;
		var obj = {
			xtype       : 'panel', 
			bodyPadding : 10, 
			title       : 'Net Present Value (NPV)', 
			collapsible : true,
			width       : '100%',
			items       : [
				{
					xtype     : 'panel',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					width     : '100%',
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
											fieldLabel : 'Nomor',
											anchor     : '-5',
											name       : 'npv_no',
											flex       : 1,
											readOnly   : true,
											labelWidth : 120,
										}, 
										{
											xtype : 'splitter', 
											width : 30,
										}, 
										{
											xtype        : 'datefield',
											fieldLabel   : 'Tanggal',
											anchor       : '-5',
											name         : 'npv_date',
											flex         : 1,
											allowBlank   : false,
											editable     : false,
											value        : new Date(),
											format       : 'd-m-Y',
											altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
											submitFormat : 'Y-m-d H:i:s.u',
											labelWidth   : 120,
											maxWidth     : 250,
										},
										{
											xtype : 'label',
											text  : '',
											width : 195
										}
									]
								},
								{	
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype      : 'xmoneyfield',
											fieldLabel : 'Harga Baru',
											anchor     : '-5',
											name       : 'harga_total_jual_new',
											flex       : 1,
											allowBlank : false,
											labelWidth : 120,
										},
										{ xtype: 'splitter', width: 30 },
										{
											xtype : 'label',
											text  : '',
											width : 445
										}
									]
								},
								{
									xtype     : 'panel',
									padding   : '10px 0 0 0',
									bodyStyle : 'border:1px solid #b5b8c8;',
									width     : '100%',
									items     : [
										{
											padding   : '10px 10px 0 10px',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype : 'label',
													text  : 'NPV',
													style : 'font-weight : bold;',
													width : '100%'
												}, 
											]
										},
										{	
											padding   : '0 10px 10px 10px',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'xmoneyfield',
													fieldLabel : 'Standard',
													anchor     : '-5',
													name       : 'npv_standard',
													flex       : 1,
													labelWidth : 110,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#EBEBE4;',
												},
												{ xtype: 'splitter', width: 30 },
												{
													xtype      : 'xmoneyfield',
													fieldLabel : 'Realisasi',
													anchor     : '-5',
													name       : 'npv_realisasi',
													flex       : 1,
													labelWidth : 120,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#EBEBE4;',
												},
											]
										},
										{	
											padding   : '0 10px 10px 10px',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype      : 'xmoneyfield',
													fieldLabel : 'Nilai (%)',
													anchor     : '-5',
													name       : 'npv_nilai_persen',
													flex       : 1,
													labelWidth : 110,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#EBEBE4;',listeners  : {
		  												render : function(el) {
		  													me.tooltipDewe(el.getEl(), '((NPV Realisasi - NPV Standard) / NPV Standard) * 100');
		  												}
													}
												},
												{ xtype: 'splitter', width: 30 },
												{
													xtype : 'label',
													text  : '',
													width : 435
												}
											]
										},
									]
								},
								{	
									padding   : '0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									width     : '100%',
									items     : [
										{
											xtype     : 'panel',
											padding   : '10px 0 0 0',
											bodyStyle : 'border:1px solid #b5b8c8;',
											width     : '54%',
											items     : [
												{
													xtype   : 'label',
													padding : '10px 0 0 10px',
													text    : 'Standard',
													style   : 'font-weight : bold;',
												},
												{
													xtype     : 'container',
													bodyStyle : 'border:0px',
													items     : [
														{
															xtype  : 'netpresentvaluegriddetailstandard',
															margin : '5px'
														}
													]
												}
											]
										},
										{ xtype: 'splitter', width: '1' },
										{
											xtype     : 'panel',
											padding   : '10px 0 0 0',
											bodyStyle : 'border:1px solid #b5b8c8;',
											width     : '45.7%',
											items     : [
												{
													xtype   : 'label',
													padding : '10px 0 0 10px',
													text    : 'Realisasi',
													style   : 'font-weight : bold;',
												},
												{
													xtype     : 'container',
													bodyStyle : 'border:0px',
													items     : [
														{
															xtype  : 'netpresentvaluegriddetailrealisasi',
															margin : '5px'
														}
													]
												}
											]
										}
									]
								},
								// Selisih standard dan realisasi
								{	
									itemId    : 'col_selisih_std_realisasi',
									layout    : 'hbox',
									bodyStyle : 'border:1px solid #b5b8c8;',
									padding   : '10px 0 0 0',
									width     : '100%',
									items     : [
										{
											xtype     : 'panel',
											bodyStyle : 'border:0px',
											width     : '54%',
											items     : [
												{
													xtype      : 'xmoneyfield',
													fieldLabel : 'Selisih Standard',
													anchor     : '-5',
													name       : 'selisih_standard',
													flex       : 1,
													labelWidth : 120,
													width      : 400,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#EBEBE4;',
													padding    : '10px',
													listeners  : {
		  												render : function(el) {
		  													me.tooltipDewe(el.getEl(), 'Total Standard - NPV Standard');
		  												}
													}
												},
												{
													xtype      : 'xmoneyfield',
													fieldLabel : 'Selisih Standard (%)',
													anchor     : '-5',
													name       : 'selisih_standard_persen',
													flex       : 1,
													labelWidth : 120,
													width      : 400,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#EBEBE4;',
													padding    : '0 10px 10px 10px',
													listeners  : {
		  												render : function(el) {
		  													me.tooltipDewe(el.getEl(), '(Selisih Standard / Total Standard) * 100');
		  												}
													}
												},
											]
										},
										{ xtype: 'splitter', width: '1' },
										{
											xtype     : 'panel',
											bodyStyle : 'border:0px',
											width     : '45.7%',
											items     : [
												{
													xtype      : 'xmoneyfield',
													fieldLabel : 'Selisih Realisasi',
													anchor     : '-5',
													name       : 'selisih_realisasi',
													flex       : 1,
													labelWidth : 120,
													width      : 350,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#EBEBE4;',
													padding    : '10px',
													listeners  : {
		  												render : function(el) {
		  													me.tooltipDewe(el.getEl(), 'Total Realisasi - NPV Realisasi');
		  												}
													}
												},
												{
													xtype      : 'xmoneyfield',
													fieldLabel : 'Selisih Realisasi (%)',
													anchor     : '-5',
													name       : 'selisih_realisasi_persen',
													flex       : 1,
													labelWidth : 120,
													width      : 350,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#EBEBE4;',
													padding    : '0 10px 10px 10px',
													listeners  : {
		  												render : function(el) {
		  													me.tooltipDewe(el.getEl(), '(Selisih Realisasi / Total Realisasi) * 100');
		  												}
													}
												},
											]
										}
									]
								},
								// --- //
								{
									xtype     : 'panel',
									padding   : '10px 0 0 0',
									bodyStyle : 'border:0px;',
									width     : '100%',
									items     : [
										{
											xtype   : 'button',
											action  : 'test_hitung_npv',
											itemId  : 'test_hitung_npv',
											hidden  : false,
											margin  : '0 5px 0 0',
											padding : '5px 515px 5px 515px',
											width   : '100%',
											text    : 'Test Hitung NPV',
						                },
									]
								},
								// Selisih Perubahan //
								{
									itemId    : 'col_selisih_perubahan',
									xtype     : 'panel',
									padding   : '10px 0 0 0',
									bodyStyle : 'border:1px solid #b5b8c8;',
									items     : [
										{
											xtype   : 'label',
											padding : '10px 0 0 10px',
											text    : 'Seleisih Harga Total Jual vs NPV Realisasi',
											style   : 'font-weight : bold;',
										},
										{
											xtype      : 'xmoneyfield',
											fieldLabel : 'Selisih Perubahan',
											anchor     : '-5',
											name       : 'selisih_perubahan',
											flex       : 1,
											labelWidth : 120,
											width      : 350,
											readOnly   : true,
											fieldStyle : 'background:none;background-color:#EBEBE4;',
											padding    : '10px',
											listeners  : {
  												render : function(el) {
  													me.tooltipDewe(el.getEl(), ' NPV Realisasi - NPV Standard');
  												}
											}
										},
										{
											xtype      : 'xmoneyfield',
											fieldLabel : 'Selisih Perubahan (%)',
											anchor     : '-5',
											name       : 'selisih_perubahan_persen',
											flex       : 1,
											labelWidth : 120,
											width      : 350,
											readOnly   : true,
											fieldStyle : 'background:none;background-color:#EBEBE4;',
											padding    : '0 10px 10px 10px',
											listeners  : {
  												render : function(el) {
  													me.tooltipDewe(el.getEl(), '(Selisih Perubahan / NPV Standard) * 100');
  												}
											}
										},
									]
								},
								// --- //
								{
									xtype     : 'panel',
									padding   : '10px 0 0 0',
									bodyStyle : 'border:0px;',
									width     : '100%',
									items     : [
										{
											xtype      : 'xnotefieldEST',
											fieldLabel : 'Notes',
											anchor     : '-5',
											name       : 'notes',
											flex       : 1,
											labelWidth : 120,
											width      : 1120
						                },
									]
								},
							]
						}
					]
				}
			]
		};

		return obj;
	},
	tooltipDewe : function(el, text){
        var theTip = Ext.create('Ext.tip.Tip', {
            html   : text,
            margin : '0 0 0 200',
            shadow : false
        });
       
        el.on('mousemove', function(ms, q){
            theTip.showAt(ms.browserEvent.x-220, el.getY()-el.dom['clientHeight']);
        });
       
        el.on('mouseleave', function(){
            theTip.hide();
        });
    }
});