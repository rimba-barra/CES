Ext.define('Erems.view.biayalegalitas.FormData', {
	extend     : 'Erems.library.template.view.FormData',
	alias      : 'widget.biayalegalitasformdata',
	frame      : true,
	autoScroll : true,
	anchorSize : 100,
	height     : 600,
	//    width: 400,
	bodyBorder  : true,
	bodyPadding : 10,
	bodyStyle   : 'border-top:none;border-left:none;border-right:none;',
	defaults    : {
		border : false,
		xtype  : 'panel',
		flex   : 1,
		layout : ''
	},
	initComponent: function () {
		var me = this;

		Ext.applyIf(me, {
			items: [
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_biayalegalitas_id',
					name   : 'biayalegalitas_id'
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_pl_id',
					name   : 'purchaseletter_id'
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_unit_id',
					name   : 'unit_id'
				},
				{
					xtype       : 'panel', bodyPadding: 10, 
					title       : 'UNIT INFORMATION', 
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
													name       : 'code',
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
													name       : 'block_code',
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
											layout: 'hbox',
											bodyStyle: 'border:0px',
											width: '100%',
											items: [
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
													xtype: 'label', 
													text: '', 
													flex: 2 
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
												{ 
													xtype : 'splitter', 
													width : 20 
												},
												{
													xtype        : 'datefield',
													fieldLabel   : 'Purchase Letter Date',
													anchor       : '-5',
													name         : 'purchase_date',
													flex         : 1,
													readOnly     : true,
													fieldStyle   : 'background:none;background-color:#F2F2F2 !important;',
													format       : 'd-m-Y',
													altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat : 'Y-m-d H:i:s.u'
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
												{ 
													xtype : 'splitter', 
													width : 20 
												},
												{
													xtype        : 'datefield',
													fieldLabel   : 'Akad Date',
													anchor       : '-5',
													name         : 'akad_date',
													flex         : 1,
													readOnly     : true,
													fieldStyle   : 'background:none;background-color:#F2F2F2 !important;',
													format       : 'd-m-Y',
													altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat : 'Y-m-d H:i:s.u'
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
													name       : 'customer_ktp',
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
													xtype      : 'maskfield',
													mask       : '##.###.###.#-###.###',
													fieldLabel : 'NPWP',
													anchor     : '-5',
													name       : 'customer_npwp',
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
													name       : 'customer_city',
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
													name       : 'customer_homephone',
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
													xtype      : 'xphonenumberfieldEST',
													fieldLabel : 'Office Phone',
													name       : 'customer_officephone',
													flex       : 1,
													readOnly   : true,
													anchor     : '-5',
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												},
												{ 
													xtype : 'splitter', 
													width : 20 
												},
												{
													xtype      : 'textfield',
													fieldLabel : 'Salesman',
													anchor     : '-5',
													name       : 'salesman_name',
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
													fieldLabel : 'Pricetype',
													anchor     : '-5',
													name       : 'pricetype',
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
													xtype      : 'xmoneyfield',
													fieldLabel : 'Harga Netto',
													anchor     : '-5',
													name       : 'harga_netto',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
												},
												{ 
													xtype : 'splitter', 
													width : 20 
												},
												{
													xtype      : 'xmoneyfield',
													fieldLabel : 'Harga Total Jual',
													anchor     : '-5',
													name       : 'harga_total_jual',
													flex       : 1,
													readOnly   : true,
													fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
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
					title       : 'BIAYA LEGAL', 
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
											width     : 600,
											items     : [
												{
													xtype       : 'fieldcontainer',
													fieldLabel  : 'Jenis Biaya',
													defaultType : 'checkboxfield',
													itemId      : 'jenisBiaya',
													items       : [
														{
															boxLabel   : 'Biaya BPHTB + BBN + AJB + PNBP + Biaya Validasi + PBB',
															name       : 'jenis_biaya_1',
															inputValue : '1',
															itemId     : 'jenis_biaya_1',
															fieldCls   : 'jenis_biaya',
															persentase : 6,
															listeners  : {
															   render : function(el) {
																	me.tooltip(el.getEl(), 'Biaya = 6 % * Harga Netto');
																}
															}
														}, 
														{
															boxLabel   : 'Biaya SKMHT + APHT',
															name       : 'jenis_biaya_2',
															inputValue : '1',
															itemId     : 'jenis_biaya_2',
															fieldCls   : 'jenis_biaya',
															amount     : 2000000,
															listeners  : {
															   render : function(el) {
																	me.tooltip(el.getEl(), 'Biaya = 2,000,000.00');
																}
															}
														}, 
														{
															boxLabel   : 'Biaya SKMHT + APHT + PNBP + PBB',
															name       : 'jenis_biaya_3',
															inputValue : '1',
															itemId     : 'jenis_biaya_3',
															fieldCls   : 'jenis_biaya',
															amount     : 2500000,
															listeners  : {
															   render : function(el) {
																	me.tooltip(el.getEl(), 'Biaya = 2,500,000.00');
																}
															}
														}, 
														{
															boxLabel   : 'Kekurangan Pajak BPHTB',
															name       : 'jenis_biaya_4',
															inputValue : '1',
															itemId     : 'jenis_biaya_4',
															fieldCls   : 'jenis_biaya',
															amount     : 3000000,
															listeners  : {
															   render : function(el) {
																	me.tooltip(el.getEl(), 'Biaya = 3,000,000.00');
																}
															}
														}, 
														{
															boxLabel   : 'Biaya Lain-lain',
															name       : 'jenis_biaya_5',
															inputValue : '1',
															itemId     : 'jenis_biaya_5',
															fieldCls   : 'jenis_biaya',
															listeners  : {
															   render : function(el) {
																	// me.tooltip(el.getEl(), 'Biaya = 3,000,000.00');
																}
															}
														}
													]
												},
											]
										},
										{
											padding   : '10px 0 0 0',
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											width     : 400,
											items     : [
												{
													xtype      : 'xmoneyfieldEST',
													fieldLabel : 'Biaya AJB',
													name       : 'biaya_ajb',
													flex       : 1,
													fieldCls   : 'biaya',
												},
												{
													xtype      : 'checkboxfield',
													fieldLabel : '',
													name       : 'is_use_biaya_ajb',
													fieldCls   : 'is_use_biaya',
													inputValue : '1',
													padding    : '3px 0 0 10px'
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
													xtype      : 'xmoneyfieldEST',
													fieldLabel : 'Biaya BPHTB',
													name       : 'biaya_bphtb',
													flex       : 1,
													fieldCls   : 'biaya',
												},
												{
													xtype      : 'checkboxfield',
													fieldLabel : '',
													name       : 'is_use_biaya_bphtb',
													fieldCls   : 'is_use_biaya',
													inputValue : '1',
													padding    : '3px 0 0 10px'
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
													xtype      : 'xmoneyfieldEST',
													fieldLabel : 'Biaya BBN',
													name       : 'biaya_bbn',
													flex       : 1,
													fieldCls   : 'biaya',
												},
												{
													xtype      : 'checkboxfield',
													fieldLabel : '',
													name       : 'is_use_biaya_bbn',
													fieldCls   : 'is_use_biaya',
													inputValue : '1',
													padding    : '3px 0 0 10px'
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
													xtype      : 'xmoneyfieldEST',
													fieldLabel : 'Persentase',
													anchor     : '-5',
													name       : 'persentase',
													flex       : 2,
													listeners  : {
														keyup : function(el, ms){
															var nilai = accounting.unformat(el.value);
															if(nilai > 100 && el.value.length > 3){
																el.setValue(100);
															}
														}
													}
												},
												{ 
													xtype  : 'label', 
													text   : '% x Harga Netto', 
													flex   : 1, 
													margin : '0 0 0 10px' 
												},
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
													name            : 'biayalegalitas_total',
													enableKeyEvents : true,
													maskRe          : /[0-9\.]/,
													flex            : 1,
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
													name            : 'biayalegalitas_time',
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
													name     : 'biayalegalitas_value',
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
													xtype : 'biayalegalitasgriddetail',
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
													flex       : 2,
													allowBlank : false,
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
	/// add by erwin 08102020
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