Ext.define('Erems.view.sppjb.FormData', {
	extend   : 'Erems.library.template.view.FormData',
	alias    : 'widget.sppjbformdata',
	requires : [
		'Erems.library.template.component.Clustercombobox', 
		'Erems.library.template.component.Notariscombobox',
        'Erems.view.sppjb.GridDocumentUpload' // added by rico 21022024
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
					itemId : 'sppjb_id',
					name   : 'sppjb_id'
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_pl_id',
					name   : 'purchaseletter_id'
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_parametersppjb_id',
					name   : 'parametersppjb_id'
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_unit_id',
					name   : 'unit_id'
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_sppjb_doc_id',
					name   : 'sppjb_doc_id'
				},
				{
					xtype : 'tabpanel',
					items : [
						{
							title : 'SPPJB',
							items : [
								{
									xtype       : 'panel', 
									bodyPadding : 10, 
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
													xtype  : 'panel', flex: 8,
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
																	xtype : 'splitter', width : 5,
																},
																{
																	xtype          : 'clustercombobox',
																	itemId         : 'fd_clustercb',
																	fieldLabel     : '',
																	anchor         : '-5',
																	name           : 'unit_cluster_id',
																	flex           : 6,
																	readOnly       : true,
																	fieldStyle     : 'background:none;background-color:#F2F2F2 !important;',
																	forceSelection : true,
																	listeners      : {
																		beforequery: function (record) {
																			record.query = new RegExp(record.query, 'i');
																			record.forceAll = true;
																		}
																	}
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
																	xtype : 'splitter', width : 5,
																}, 
																{
																	xtype          : 'blockcombobox',
																	itemId         : 'fd_blockcb',
																	fieldLabel     : '',
																	anchor         : '-5',
																	name           : 'unit_block_id',
																	flex           : 6,
																	readOnly       : true,
																	fieldStyle     : 'background:none;background-color:#F2F2F2 !important;',
																	forceSelection : true,
																	listeners      : {
																		beforequery : function (record) {
																			record.query = new RegExp(record.query, 'i');
																			record.forceAll = true;
																		}
																	}
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
																	xtype      : 'textfield',
																	name       : 'unit_unit_number',
																	readOnly   : true,
																	fieldLabel : 'Kavling / Unit No.',
																	margin     : '0 5px 0 0',
																	flex       : 6,
																	anchor     : '-5',
																	fieldStyle : 'background:none;background-color:#F2F2F2 !important;',
																},
																// {
																// 	xtype: 'combobox',
																// 	fieldLabel: 'Kavling / Unit No. ',
																// 	anchor: '-5',
																// 	name: 'unit_unit_number',
																// 	flex: 6,
																// 	readOnly: true,
																// 	fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
																// 	forceSelection: true,
																// 	listeners: {
																// 		beforequery: function (record) {
																// 			record.query = new RegExp(record.query, 'i');
																// 			record.forceAll = true;
																// 		}
																// 	}
																// }, 
																{
																	xtype : 'splitter', width : 5,
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
																{ xtype : 'label', text : '', flex : 2 }]
														}
													]
												},
												{ xtype : 'splitter', width : 30 },
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
																{ xtype : 'label', text : 'm2', flex : 1, margin : '0 0 0 10px' },
																{
																	xtype : 'splitter', width : 30,
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
																{ xtype : 'label', text : 'm', flex : 1, margin : '0 0 0 10px' }
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
																{ xtype : 'label', text : 'm2', flex : 1, margin : '0 0 0 10px' },
																{ xtype : 'splitter', width : 30 }, 
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
																{ xtype : 'label', text : 'm', flex : 1, margin : '0 0 0 10px' }
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
																{ xtype : 'label', text : 'm2', flex : 1, margin : '0 0 0 10px' },
																{ xtype : 'splitter', width : 30 }, 
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
																{ xtype : 'label', text : '', flex : 1, margin : '0 0 0 10px' }
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
																{ xtype : 'label', text : 'm2', flex : 1, margin : '0 0 0 10px' },
																{ xtype : 'splitter', width : 30 }, 
																{
																	xtype      : 'hiddenfield',
																	fieldLabel : '',
																	anchor     : '-5',
																	flex       : 6,
																	labelWidth : 30,
																	readOnly   : true,
																	fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
																},
																{ xtype : 'label', text : '', flex : 1, margin : '0 0 0 10px' }
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
																{ xtype : 'splitter', width : 20 }, 
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
																}
															]
														},
														{
															padding   : '10px 0 0 0',
															layout    : 'hbox',
															bodyStyle : 'border:0px',
															items     : [
																{
																	xtype      : 'xnumericfieldEST',
																	fieldLabel : 'KTP Number',
																	anchor     : '-5',
																	name       : 'customer_ktp',
																	flex       : 1,
																	allowBlank : false,
																	minLength  : 1,
																	maxLength  : 16
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
																	allowBlank : false
																}
															]
														},
														{
															padding   : '10px 0 0 0',
															layout    : 'hbox',
															bodyStyle : 'border:0px',
															items     : [
																{
																	xtype            : 'textfield',
																	fieldLabel       : 'SPPJB Name',
																	anchor           : '-5',
																	name             : 'sppjb_name',
																	flex             : 1,
																	allowBlank       : false,
																	enforceMaxLength : true,
																	minLength        : 3,
																	maxLength        : 150
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
																	fieldLabel : 'SPPJB Address',
																	anchor     : '-5',
																	name       : 'sppjb_address',
																	flex       : 1,
																	allowBlank : false,
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
																	readOnly   : true
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
																	fieldLabel : 'Alamat KTP',
																	anchor     : '-5',
																	name       : 'customer_ktp_address',
																	flex       : 1,
																	readOnly   : true
																}
															]
														},
														{
															padding   : '10px 0 0 0',
															layout    : 'hbox',
															bodyStyle : 'border:0px',
															items     : [
																{
																	xtype            : 'textfield',
																	fieldLabel       : 'Atas Nama',
																	anchor           : '-5',
																	name             : 'atasnama',
																	flex             : 1,
																	allowBlank       : false,
																	enforceMaxLength : true,
																	minLength        : 3,
																	maxLength        : 150
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
																	name       : 'sppjb_pendanaan',
																	flex       : 1,
																	readOnly   : true,
																	fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
																}, 
																{ xtype : 'splitter', width : 20 }, 
																{
																	xtype            : 'textfield',
																	fieldLabel       : 'Daya Listrik',
																	anchor           : '-5',
																	name             : 'unit_electricity',
																	flex             : 1,
																	allowBlank       : false,
																	maskRe           : /[0-9\.]/,
																	enforceMaxLength : true,
																	maxLength        : 13,
																	listeners        : {
																		change: function (el, v, prev) {
																			var commaPos = v.indexOf('.') + 1,
																				strLen = v.length;

																			if ((commaPos <= 0 && v.length > 10) || (commaPos > 0 && commaPos < strLen - 2)) {
																				el.setValue(prev);
																			}
																		}
																	}
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
																	fieldLabel   : 'Tanggal Akad',
																	anchor       : '-5',
																	name         : 'akad_realisasiondate',
																	flex         : 1,
																	readOnly     : true,
																	format       : 'd-m-Y',
																	altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
																	submitFormat : 'Y-m-d H:i:s.u'
																},
																{ xtype : 'splitter', width : 20 }, 
																{
																	xtype      : 'textfield',
																	fieldLabel : 'Cara Bayar',
																	anchor     : '-5',
																	name       : 'customer_pendanaan',
																	flex       : 1,
																	readOnly   : true,
																	fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
																}
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
																	fieldLabel : 'SPPJB Number',
																	anchor     : '-5',
																	name       : 'sppjb_no',
																	flex       : 1,
																	readOnly   : true,
																	fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
																}, 
																{ xtype : 'splitter', width : 20 }, 
																{
																	xtype        : 'datefield',
																	fieldLabel   : 'SPPJB Date',
																	anchor       : '-5',
																	name         : 'sppjb_date',
																	flex         : 1,
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
																	xtype          : 'combobox',
																	fieldLabel     : 'Parameter SPPJB',
																	anchor         : '-5',
																	name           : 'm_param_code',
																	readOnly       : true,
																	fieldStyle     : 'background:none;background-color:#FFF !important;',
																	forceSelection : true,
																	listeners      : {
																		beforequery: function (record) {
																			record.query = new RegExp(record.query, 'i');
																			record.forceAll = true;
																		}
																	}
																},
																{ xtype : 'splitter', width : 5 },
																{
																	xtype   : 'button',
																	text    : 'Browse',
																	itemId  : 'fd_browse_paramsppjb_btn',
																	padding : '2px 5px',
																	action  : 'browse_paramsppjb',
																	iconCls : 'icon-search',
																	style   : 'background-color:#FFC000;'
																},
																{ xtype : 'splitter', width : 42 },
																{
																	xtype        : 'datefield',
																	fieldLabel   : 'Surat Kuasa Date',
																	anchor       : '-5',
																	name         : 'suratkuasa_date',
																	flex         : 1,
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
																	fieldLabel : 'First Signature Name',
																	anchor     : '-5',
																	name       : 'm_param_name_01',
																	flex       : 1,
																	readOnly   : true,
																	fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
																}, 
																{ xtype : 'splitter', width : 20 }, 
																{
																	xtype        : 'datefield',
																	fieldLabel   : 'Hand Over Date',
																	anchor       : '-5',
																	name         : 'serahterima_date',
																	flex         : 1,
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
																	fieldLabel : 'Second Signature Name',
																	anchor     : '-5',
																	name       : 'm_param_name_02',
																	flex       : 1,
																	readOnly   : true,
																	fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
																}, 
																{ xtype : 'splitter', width : 20 }, 
																{
																	xtype        : 'datefield',
																	fieldLabel   : 'Sign Date',
																	anchor       : '-5',
																	name         : 'tandatangan_date',
																	flex         : 1,
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
																	fieldLabel : 'PJB Lunas Number',
																	anchor     : '-5',
																	name       : 'pjb_lunas_no',
																	flex       : 1,
																}, 
																{ xtype : 'splitter', width : 20 }, 
																{
																	xtype        : 'datefield',
																	fieldLabel   : 'PJB Lunas Date',
																	anchor       : '-5',
																	name         : 'pjb_lunas_date',
																	flex         : 1,
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
																	fieldLabel : 'Notaris',
																	anchor     : '-5',
																	name       : 'pjb_notaris',
																	flex       : 1,
																}, 
																{ xtype : 'splitter', width : 20 }, 
																{
																	xtype        : 'datefield',
																	fieldLabel   : 'PJB Lunas<br>Sign Date',
																	anchor       : '-5',
																	name         : 'pjb_lunas_sign_date',
																	flex         : 1,
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
																	fieldLabel : 'Akta Number',
																	anchor     : '-5',
																	name       : 'm_param_akta_no',
																	flex       : 1,
																	readOnly   : true,
																	fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
																}, 
																{ xtype : 'splitter', width : 20 }, 
																{
																	xtype        : 'datefield',
																	fieldLabel   : 'Akta Date',
																	anchor       : '-5',
																	name         : 'm_param_akta_date',
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
																	xtype        : 'datefield',
																	fieldLabel   : 'Sent Date',
																	anchor       : '-5',
																	name         : 'sent_date',
																	flex         : 1,
																	format       : 'd-m-Y',
																	altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
																	submitFormat : 'Y-m-d H:i:s.u'
																}, 
																{ xtype : 'splitter', width : 20 }, 
																{
																	xtype        : 'datefield',
																	fieldLabel   : 'Received Date',
																	anchor       : '-5',
																	name         : 'received_date',
																	flex         : 1,
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
																	xtype        : 'datefield',
																	fieldLabel   : 'Return Date',
																	anchor       : '-5',
																	name         : 'return_date',
																	flex         : 1,
																	format       : 'd-m-Y',
																	altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
																	submitFormat : 'Y-m-d H:i:s.u'
																},
																{ xtype : 'splitter', width : 20 },
																{
																	xtype      : 'xnamefieldEST',
																	fieldLabel : 'Received Name',
																	anchor     : '-5',
																	name       : 'received_name',
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
																	fieldLabel   : 'Penyelesaian Pembangunan',
																	labelWidth   : 160,
																	anchor       : '-5',
																	name         : 'finish_constr_date',
																	flex         : 1,
																	hidden       : true,
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
																	xtype      : 'xgeneralfieldEST',
																	fieldLabel : 'Kelurahan',
																	anchor     : '-5',
																	name       : 'kelurahan_unit',
																	flex       : 1,
																	maxLength  : 50
																},
																{ xtype : 'splitter', width : 20 },
																{
																	xtype      : 'xgeneralfieldEST',
																	fieldLabel : 'Kecamatan',
																	anchor     : '-5',
																	name       : 'kecamatan_unit',
																	flex       : 1,
																	maxLength  : 50
																}
															]
														},
														// start, addby: rico, addon:21/02/24
														{
															padding   : '10px 0 0 0',
															layout    : 'hbox',
															bodyStyle : 'border:0px',
															items     : [
																{
																	xtype      : 'xgeneralfieldEST',
																	fieldLabel : 'Nama Kuasa',
																	anchor     : '-5',
																	name       : 'sppjb_kuasa_name',
																	flex       : 1,
																	maxLength  : 50
																},
																{
																	xtype: 'splitter', width: 20,
																},
																{
																	xtype      : 'xgeneralfieldEST',
																	fieldLabel : 'NIK KTP Kuasa',
																	anchor     : '-5',
																	name       : 'sppjb_kuasa_ktp',
																	maskRe     : /[0-9]/,
																	flex       : 1,
																	maxLength  : 50
																},
															]
														},
														{
															padding   : '10px 0 0 0',
															layout    : 'hbox',
															bodyStyle : 'border:0px',
															items     : [
																{
																	xtype 	   : 'maskfield',
																	mask 	   : '##.###.###.#-###.###',
																	fieldLabel : 'NPWP Kuasa',
																	anchor     : '-5',
																	name       : 'sppjb_kuasa_npwp',
																	flex       : 1,
																//	maskRe     : /[0-9-.]/,
																	maxLength  : 50
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
																	fieldLabel : 'Alamat Kuasa',
																	anchor     : '-5',
																	name       : 'sppjb_kuasa_address',
																	flex       : 1,
																	maxLength  : 255
																}
															]
														},
														// end, addby: rico, addon:21/02/24
														{ xtype: 'splitter', height: 20 },
														{
															padding   : '10px 0 0 0',
															layout    : 'hbox',
															bodyStyle : 'border:0px',
															items     : [
																{
																	xtype            : 'textfield',
																	fieldLabel       : 'No. Identifikasi Rumah',
																	anchor           : '-5',
																	name             : 'nomor_identifikasi_rumah',
																	flex             : 1,
																	enforceMaxLength : true,
																	maxLength        : 255,
																	maskRe           : /[A-Za-z0-9\.\,\/\-\s]/,
																}
															]
														},
														{ xtype : 'splitter', height : 20 },
														{
															xtype       : 'fieldset',
															bodyPadding : 10,
															width       : '100%',
															title       : 'Addendum',
															items       : [
																{
																	padding   : '10px 0 0 0',
																	layout    : 'hbox',
																	bodyStyle : 'border:0px',
																	items     : [
																		{
																			xtype            : 'textfield',
																			fieldLabel       : 'Adendum Ke',
																			anchor           : '-5',
																			name             : 'adendum_ke',
																			flex             : 1,
																			maskRe           : /[A-Za-z0-9\s.]/,
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
																			xtype      : 'xnotefieldEST',
																			fieldLabel : 'Note',
																			anchor     : '-5',
																			name       : 'note',
																			flex       : 1,
																		}
																	]
																},
															]
														},
														{
															xtype       : 'fieldset',
															bodyPadding : 10,
															width       : '100%',
															title       : 'Rencana Serah Terima',
															items       : [
																{
																	xtype     : 'panel',
																	bodyStyle : 'background:none;border:0;',
																	anchor    : '100%',
																	layout    : { type : 'column' },
																	items     : [
																		{
																			xtype      : 'radiofield',
																			anchor     : '100%',
																			boxLabel   : 'Tanggal rencana serah terima rumah / kavling',
																			itemId     : 'rencana_st_tgl',
																			name       : 'radio_st_group',
																			labelWidth : 275,
																			inputValue : 'radio_tgl_st',
																			hidden     : true,
																			handler    : function (field, value) {
																				if (value) {
																					me.down('[name=serahterimaplan_month]').setDisabled(true);
																					me.down('[name=serahterimaplan_date]').setDisabled(false);
																				} else {
																					me.down('[name=serahterimaplan_month]').setDisabled(false);
																					me.down('[name=serahterimaplan_date]').setDisabled(true);
																				}
																			}
																		},
																	]
																},
																{
																	xtype     : 'panel',
																	height    : 30,
																	bodyStyle : 'background:none;border:0;',
																	anchor    : '100%',
																	layout    : { type : 'column' },
																	items     : [
																		{
																			xtype      : 'radiofield',
																			anchor     : '100%',
																			boxLabel   : 'Lama serah terima rumah / kavling (Bulan)',
																			itemId     : 'rencana_st_bln',
																			name       : 'radio_st_group',
																			labelWidth : 275,
																			inputValue : 'radio_bln_st',
																			checked    : true
																		},
																		{
																			xtype      : 'numberfield',
																			fieldLabel : ' ',
																			labelWidth : 10,
																			value      : 6,
																			name       : 'serahterimaplan_month',
																			itemId     : 'serahterimaplan_month'
																		},
																		{
																			xtype        : 'datefield',
																			fieldLabel   : ' ',
																			labelWidth   : 10,
																			name         : 'serahterimaplan_date',
																			itemId       : 'serahterimaplan_date',
																			value        : dateOneYear(),
																			format       : 'd-m-Y',
																			altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
																			submitFormat : 'Y-m-d H:i:s.u',
																			hidden       : true
																		},
																	]
																},
															]
														},
														{
															xtype       : 'fieldset',
															bodyPadding : 10,
															width       : '100%',
															title       : 'Document Upload',
															items       : [
																{
																	padding   : '10px 0 0 0',
																	layout    : 'hbox',
																	bodyStyle : 'border:0px',
																	width     : '100%',
																	items     : [
																		{
																			xtype  : 'sppjbgriddocumentupload',
																			width  : '100%',
																			itemId : 'DocumentuploadGrid'
																		}
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
							]
						},
						{
							title : 'Additional Information',
							items : [
								{
									xtype       : 'panel', 
									bodyPadding : 10, 
									title       : 'Additional Information', 
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
																	fieldLabel : 'IJB Number',
																	anchor     : '-5',
																	name       : 'ijb_no',
																	flex       : 1
																}, 
																{ xtype : 'splitter', width : 20 }, 
																{
																	xtype        : 'datefield',
																	fieldLabel   : 'IJB Date',
																	anchor       : '-5',
																	name         : 'ijb_date',
																	flex         : 1,
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
																	fieldLabel : 'IJB Name',
																	anchor     : '-5',
																	name       : 'ijb_name',
																	flex       : 1
																}, 
																{ xtype : 'splitter', width : 20 }, 
																{
																	xtype          : 'notariscombobox',
																	fieldLabel     : 'Notaris',
																	anchor         : '-5',
																	name           : 'notaris_id',
																	itemId         : 'fd_notaris_id',
																	flex           : 1,
																	forceSelection : true,
																	listeners      : {
																		beforequery: function (record) {
																			record.query = new RegExp(record.query, 'i');
																			record.forceAll = true;
																		}
																	}
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
																	fieldLabel : 'Luas Tanah',
																	anchor     : '-5',
																	name       : 'land_size_sppjb',
																	flex       : 1,
																	maskRe     : /[0-9\.]/
																},
																{ xtype : 'label', text : 'm2', flex : 1, margin : '0 0 0 10px' }
															]
														},
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
						xtype    : 'button',
						action   : 'prinout',
						itemId   : 'btnPrintout',
						padding  : 5,
						width    : 75,
						iconCls  : 'icon-print',
						text     : 'Print',
						disabled : true
					},
				]
			}
		];
		return x;
	}
});