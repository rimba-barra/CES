Ext.define('Erems.view.schedulebiayalainlain.FormData', {
	extend   : 'Erems.library.template.view.FormData',
	alias    : 'widget.schedulebiayalainlainformdata',
	requires : [
		'Erems.library.template.component.Paymenttypeallcombobox',
		'Erems.view.schedulebiayalainlain.GridDetail'
	],
	frame       : true,
	autoScroll  : true,
	anchorSize  : 100,
	height      : 500,
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
		var cbf = new Erems.template.ComboBoxFields();

		Ext.applyIf(me, {
			items: [
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_biayalainlain_id',
					name   : 'biayalainlain_id'
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_pl_id',
					name   : 'purchaseletter_id'
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_unit_id',
					name   : 'unit_unit_id'
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
									xtype        : 'combobox',
									fieldLabel   : 'Payment Flag',
									allowBlank   : false,
									flex         : 6,
									itemId       : 'cb_paymentflag_id',
									name         : 'paymentflag_id',
									displayField : 'paymentflag',
									valueField   : 'paymentflag_id',
									queryMode    : 'local',
									listeners    : {
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
				{
					xtype       : 'panel', bodyPadding: 10, 
					title       : 'UNIT INFORMATION', 
					itemId      : 'listUnitContainer',
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
									flex   : 8,
									layout : {
										type           : 'vbox',
										defaultMargins : { top: 0, right: 0, bottom: 10, left: 0 }
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
													fieldLabel : 'Kawasan / Cluster',
													anchor     : '-5',
													name       : 'unit_cluster_code',
													flex       : 5,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
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
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;',
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
													name       : 'unit_block_code',
													flex       : 5,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												}, 
												{
													xtype : 'splitter', 
													width : 5,
												}, 
												{
													xtype      : 'blockcombobox',
													itemId     : 'fd_blockcb',
													fieldLabel : '',
													anchor     : '-5',
													name       : 'unit_block_id',
													flex       : 6,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;',
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
													fieldLabel : 'PT',
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
													xtype      : 'combobox',
													fieldLabel : 'Kavling / Unit No. ',
													anchor     : '-5',
													name       : 'unit_unit_number',
													flex       : 6,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;',
												}, 
												{
													xtype : 'splitter', 
													width : 5,
												}, 
												{
													xtype   : 'button',
													text    : 'Browse Unit',
													itemId  : 'fd_browse_unit_btn',
													padding : '2px 5px',
													action  : 'browse_unit',
													iconCls : 'icon-search',
													style   : 'background-color:#FFC000;'
												},
												{	
													xtype : 'label', 
													text  : '', 
													flex  : 2 
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
									xtype  : 'panel', flex: 7,
									layout : {
										type           : 'vbox',
										defaultMargins : { top: 0, right: 0, bottom: 10, left: 0 }
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
												{ 
													xtype : 'splitter', 
													width : 30 
												},
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
												{ 
													xtype : 'splitter', 
													width : 30 
												},
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
												{ 
													xtype : 'splitter', 
													width : 30 
												},
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
										}
									]
								}
							]
						}
					]
				},

				/* CUSTOMER INFORMATION */
				{
					xtype       : 'panel', 
					bodyPadding : 10, 
					title       : 'CUSTOMER INFORMATION', 
					itemId      : 'listCustomerContainer',
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
											}, 
											{
												xtype   : 'button',
												text    : 'Browse Customer',
												itemId  : 'fd_browse_customer_btn',
												padding : '2px 5px',
												action  : 'browse_customer',
												iconCls : 'icon-search',
												style   : 'background-color:#FFC000;'
											},
											{
												xtype: 'label', flex: 1
											}, 
											{
												xtype   : 'button',
												text    : 'Create New Customer',
												itemId  : 'fd_new_customer_btn',
												padding : '2px 5px',
												action  : 'create_new_customer',
												iconCls : 'icon-add',
												style   : 'background-color:#FFC000;'
											},
											{
												xtype: 'label', flex: 1
											}]
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
													// mask       : '##.###.###.#-###.###',
													fieldLabel : 'NPWP',
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
													name       : 'customer_city_city_name',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												},
												{ 
													xtype : 'splitter', 
													width : 20 
												},
												{
													xtype      : 'xphonenumberfieldEST',
													fieldLabel : 'Phone',
													anchor     : '-5',
													name       : 'customer_home_phone',
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
												{ 
													xtype : 'splitter', 
													width : 20 
												},
												{
													xtype      : 'xphonenumberfieldEST',
													fieldLabel : 'Mobile Phone',
													anchor     : '-5',
													name       : 'customer_mobile_phone',
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
													fieldLabel : 'Office Phone',
													anchor     : '-5',
													name       : 'customer_office_phone',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												},
												{ 
													xtype : 'splitter', 
													width : 20 
												},
												{
													xtype      : 'label',
													fieldLabel : '',
													anchor     : '-5',
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
				{
					xtype       : 'panel', 
					bodyPadding : 10, 
					title       : 'BIAYA LAIN-LAIN', 
					itemId      : 'listBiayaContainer',
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
											width     : 400,
											items     : [
												{
													xtype        : 'paymenttypeallcombobox',
													fieldLabel   : 'Payment type',
													anchor       : '-5',
													name         : 'paymenttype_paymenttype_id',
													displayField : 'paymenttype',
													valueField   : 'paymenttype_id',
													flex         : 3, 
													allowBlank   : false,
													queryMode    :'local',
													listeners: {
														beforequery: function (record) {
															record.query = new RegExp(record.query, 'i');
															record.forceAll = true;
														}
													}
												},
											]
										},
										{
											xtype   : 'button',
											text    : 'Regenerate VA',
											padding : '2px 5px',
											margin  : '10px 0 0 0',
											action  : 'regenerate_va',
											iconCls : 'icon-refresh',
											style   : 'background-color:#FFC000;',
											hidden  : true
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											width     : 400,
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'VA Mandiri',
													anchor     : '-5',
													name       : 'va_no',
													maskRe     : /[0-9\.]/,
													flex       : 2,
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											width     : 400,
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'VA BCA',
													anchor     : '-5',
													name       : 'va_no_bca',
													maskRe     : /[0-9\.]/,
													flex       : 2,
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											width     : 400,
											items     : [
												{
													xtype           : 'xmoneyfield',
													fieldLabel      : 'Total Biaya',
													name            : 'biayalainlain_total',
													enableKeyEvents : true,
													maskRe          : /[0-9\.]/,
													flex            : 1,
													allowBlank		: false,
													value : 0
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											width     : 400,
											items     : [
												{
													xtype           : 'textfield',
													fieldLabel      : 'Termin',
													anchor          : '-5',
													name            : 'biayalainlain_time',
													flex            : 5,
													enableKeyEvents : true,
													maskRe          : /[0-9\.]/,
												},
												{ 
													xtype  : 'label', 
													text   : '/', 
													flex   : 1, 
													margin : '0 0 0 10px' 
												},
												{
													xtype    : 'textfield',
													anchor   : '-5',
													name     : 'biayalainlain_value',
													flex     : 4,
													readOnly : true
												},
											]
										},
										{
											xtype   : 'button',
											text    : 'Generate',
											itemId  : 'fd_generate_btn',
											padding : '2px 5px',
											action  : 'generate',
											style   : 'background-color:#FFC000;'
										},
										{
											layout    : 'hbox',
											padding   : '10px 0 0 0',
											bodyStyle : 'border:0px',
											items     : [
												{
													xtype : 'schedulebiayalainlaingriddetail',
													width : '100%',
												}
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											width     : 600,
											items     : [
												{
													xtype      : 'textfield',
													fieldLabel : 'Nilai Amount terbayar',
													labelWidth :150,
													anchor     : '-5',
													name       : 'nilai_sisa',
													readOnly   :true,
													hidden     :true
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
													fieldLabel : 'Notes',
													anchor     : '-5',
													name       : 'notes',
													itemId     : 'notes',
													allowBlank : false,
													flex       : 2,
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
	tooltip : function(el, text){
		var theTip = Ext.create('Ext.tip.Tip', {
			html   : text,
			margin : '0 0 0 200',
			shadow : false
		});
	   
		el.on('mouseover', function(){
			theTip.showAt((el.getX()+el.dom['clientWidth']-190), el.getY());
		});
	   
		el.on('mouseleave', function(){
			theTip.hide();
		});
	}
});