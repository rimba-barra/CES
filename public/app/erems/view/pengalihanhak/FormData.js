Ext.define('Erems.view.pengalihanhak.FormData', {
	extend: 'Erems.library.template.view.FormData',
	alias: 'widget.pengalihanhakformdata',
	requires: [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Citycombobox',
		// 'Erems.library.template.view.combobox.Provinsi',
		'Erems.library.template.component.Changeownershipreasoncombobox',
		'Erems.library.template.component.Purposebuycombobox',
		'Erems.view.pengalihanhak.Hgbajbgrid',
		'Erems.library.template.view.combobox.Provinsi',
		'Erems.library.template.view.combobox.City'
	],
	frame: true,
	autoScroll: true,
	anchorSize: 100,
	height: 600,
	bodyBorder: true,
	bodyPadding: 10,
	bodyStyle: 'padding:5px 5px 0',
	defaults: {
		border: false,
		xtype: 'panel',
		flex: 1,
		layout: ''
	},
	initComponent: function () {
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
					xtype: 'hiddenfield',
					itemId: 'changeownership_id',
					name: 'changeownership_id'
				},
				{
					xtype: 'hiddenfield',
					itemId: 'fdms_pl_id',
					name: 'purchaseletter_id'
				},
				{
					xtype: 'hiddenfield',
					itemId: 'fdms_unit_id',
					name: 'unit_id'
				},
				{
					xtype: 'panel',
					hidden: true,
					width: '100%',
					height: 250,
					itemId: 'ktp_panel',
					items: [
						{
							xtype: 'panel',
							bodyStyle: 'background-color:#FFFFFF;border:0px',
							layout: 'hbox',
							defaults: {
								xtype: 'textfield',
								flex: 1
							},
							items: [
								{
									xtype: 'panel',
									width: 300,
									height: 250,
									bodyStyle: 'background:none',
									itemId: 'photo_ktp',
									html: ''
								}
							]

						},
					]
				},
				{xtype: 'tabpanel', itemId:'tab_panel',
					items: [
						{title: 'Pengalihan Hak',
							items: [

								{xtype: 'panel', bodyPadding: 10, title: 'UNIT INFORMATION', collapsible: true,
									items: [
										{
											layout: 'hbox',
											padding: '10px 0 0 0',
											bodyStyle: 'border:0px',
											width: '100%',
											items: [
												{
													xtype: 'panel', flex: 8,
													layout: {
														type: 'vbox',
														defaultMargins: {top: 0, right: 0, bottom: 10, left: 0}
													},
													bodyStyle: 'border:0px',
													items: [
														{
															layout: 'hbox',
															bodyStyle: 'border:0px',
															width: '100%',
															items: [{
																	xtype: 'textfield',
																	fieldLabel: 'Kawasan / Cluster',
																	anchor: '-5',
																	name: 'cluster_code',
																	flex: 5,
																	readOnly: true,
																	fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
																}, {
																	xtype: 'splitter', width: 5,
																},
																{
																	xtype: 'clustercombobox',
																	itemId: 'fd_clustercb',
																	fieldLabel: '',
																	anchor: '-5',
																	name: 'unit_cluster_id',
																	flex: 6,
																	readOnly: true,
																	fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
																}
															]
														},
														{
															layout: 'hbox',
															bodyStyle: 'border:0px',
															width: '100%',
															items: [{
																	xtype: 'textfield',
																	fieldLabel: 'Block name',
																	anchor: '-5',
																	name: 'block_code',
																	flex: 5,
																	readOnly: true,
																	fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
																}, {
																	xtype: 'splitter', width: 5,
																}, {
																	xtype: 'blockcombobox',
																	itemId: 'fd_blockcb',
																	fieldLabel: '',
																	anchor: '-5',
																	name: 'unit_block_id',
																	flex: 6,
																	readOnly: true,
																	fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
																}]
														},
														{
															layout: 'hbox',
															bodyStyle: 'border:0px',
															width: '100%',
															items: [{
																	xtype: 'combobox',
																	fieldLabel: 'Kavling / Unit No. ',
																	anchor: '-5',
																	name: 'unit_unit_number',
																	flex: 6,
																	readOnly: true,
																	fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
																},
																{
																	xtype: 'splitter', width: 5,
																}, {
																	xtype: 'button',
																	text: 'Browse Unit',
																	itemId: 'fd_browse_unit_btn',
																	padding: '2px 5px',
																	action: 'browse_unit',
																	iconCls: 'icon-search',
																	style: 'background-color:#FFC000;'
																},
																{xtype: 'label', text: '', flex: 2}]
														}
													]
												},
												{xtype: 'splitter', width: 30},
												{
													xtype: 'panel', flex: 7,
													layout: {
														type: 'vbox',
														defaultMargins: {top: 0, right: 0, bottom: 10, left: 0}
													},
													bodyStyle: 'border:0px',
													items: [
														{
															layout: 'hbox',
															bodyStyle: 'border:0px',
															width: '100%',
															items: [{
																	xtype: 'textfield',
																	fieldLabel: 'PT Name',
																	anchor: '-5',
																	name: 'unit_pt_name',
																	flex: 1,
																	readOnly: true,
																	fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
																}]
														},
														/*{
														 layout: 'hbox',
														 bodyStyle: 'border:0px',
														 width: '100%',
														 items: [{
														 xtype: 'textfield',
														 fieldLabel: 'Product Category',
														 anchor: '-5',
														 name: 'unit_productcategory',
														 flex: 1,
														 readOnly: true,
														 fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
														 }]
														 },*/
														{
															layout: 'hbox',
															bodyStyle: 'border:0px',
															width: '100%',
															items: [{
																	xtype: 'textfield',
																	fieldLabel: 'Type',
																	anchor: '-5',
																	name: 'unit_type_name',
																	flex: 1,
																	readOnly: true,
																	fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
																}]
														},
														{
															layout: 'hbox',
															bodyStyle: 'border:0px',
															width: '100%',
															items: [{
																	xtype: 'textfield',
																	fieldLabel: 'Land Size',
																	anchor: '-5',
																	name: 'unit_land_size',
																	flex: 12,
																	readOnly: true,
																	fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
																},
																{xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'},
																{
																	xtype: 'splitter', width: 30,
																}, {
																	xtype: 'textfield',
																	fieldLabel: 'Long',
																	anchor: '-5',
																	name: 'unit_long',
																	flex: 6,
																	readOnly: true,
																	labelWidth: 30,
																	fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
																},
																{xtype: 'label', text: 'm', flex: 1, margin: '0 0 0 10px'}
															]
														},
														{
															layout: 'hbox',
															bodyStyle: 'border:0px',
															width: '100%',
															items: [{
																	xtype: 'textfield',
																	fieldLabel: 'Building Size',
																	anchor: '-5',
																	name: 'unit_building_size',
																	flex: 12,
																	readOnly: true,
																	fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
																},
																{xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'},
																{
																	xtype: 'splitter', width: 30,
																}, {
																	xtype: 'textfield',
																	fieldLabel: 'Width',
																	anchor: '-5',
																	name: 'unit_width',
																	flex: 6,
																	labelWidth: 30,
																	readOnly: true,
																	fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
																},
																{xtype: 'label', text: 'm', flex: 1, margin: '0 0 0 10px'}
															]
														},
														{
															layout: 'hbox',
															bodyStyle: 'border:0px',
															width: '79%',
															items: [{
																	xtype: 'textfield',
																	fieldLabel: 'Kelebihan',
																	anchor: '-5',
																	name: 'unit_kelebihan',
																	flex: 2,
																	readOnly: true,
																	fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
																},
																{xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'}
															]
														},
																/*{
																 layout: 'hbox',
																 bodyStyle: 'border:0px',
																 width: '100%',
																 items: [{
																 xtype: 'textfield',
																 fieldLabel: 'Kelebihan Tanah',
																 anchor: '-5',
																 name: 'unit_kelebihan',
																 flex: 12,
																 readOnly: true,
																 fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
																 },
																 {xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'},
																 {
																 xtype: 'splitter', width: 30,
																 }, {
																 xtype: 'textfield',
																 fieldLabel: 'Floor',
																 anchor: '-5',
																 name: 'unit_floor',
																 flex: 6,
																 labelWidth: 30,
																 readOnly: true,
																 fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
																 },
																 {xtype: 'label', text: '', flex: 1, margin: '0 0 0 10px'}
																 ]
																 }*/
													]
												}
											]
										}

									]
								},
								/* PURCHASE LETTER & CUSTOMER INFORMATION */
								{xtype: 'panel', bodyPadding: 10, title: 'PURCHASE LETTER & CUSTOMER INFORMATION', collapsible: true,
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
																	xtype: 'textfield',
																	fieldLabel: 'Purchase Letter No.',
																	anchor: '-5',
																	name: 'purchaseletter_no',
																	flex: 1,
																	readOnly: true,
																	fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
																}, {
																	xtype: 'splitter', width: 20,
																}, {
																	xtype: 'datefield',
																	fieldLabel: 'Purchase Letter Date',
																	anchor: '-5',
																	name: 'purchase_date',
																	flex: 1,
																	readOnly: true,
																	fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
																	format: 'd-m-Y',
																	altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
																	submitFormat: 'Y-m-d H:i:s.u'
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
																}, {
																	xtype: 'splitter', width: 20,
																}, {
																	xtype: 'datefield',
																	fieldLabel: 'Akad Date',
																	anchor: '-5',
																	name: 'akad_realisasiondate',
																	flex: 1,
																	readOnly: true,
																	fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
																	format: 'd-m-Y',
																	altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
																	submitFormat: 'Y-m-d H:i:s.u'
																}]
														},
														{
															//  bodyPadding: 10,
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [{
																	xtype: 'textfield',
																	fieldLabel: 'No. KTP',
																	anchor: '-5',
																	name: 'customer_ktp',
																	flex: 1,
																	readOnly: true,
																	fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
																}, {
																	xtype: 'splitter', width: 20,
																}, {
																	xtype: 'citycombobox',
																	anchor: '-5',
																	itemId: 'fd_city_old',
																	source: 'city',
																	flex: 1,
																	fieldLabel: 'City',
																	name: 'customer_city_id',
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
																	xtype: 'xaddressfieldEST',
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
															//  bodyPadding: 10,
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [{
																	xtype      : 'xphonenumberfieldEST',
																	fieldLabel : 'Telephone',
																	anchor     : '-5',
																	name       : 'customer_homephone',
																	flex       : 1,
																	readOnly   : true,
																	fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
																}, {
																	xtype: 'splitter', width: 20,
																}, {
																	xtype      : 'xphonenumberfieldEST',
																	fieldLabel : 'Mobile Phone',
																	anchor     : '-5',
																	name       : 'customer_mobilephone',
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
																	fieldLabel: 'Sales Price',
																	anchor: '-5',
																	name: 'harga_jual',
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
																	fieldLabel: 'SPPJB No.',
																	anchor: '-5',
																	name: 'sppjb_no',
																	flex: 1,
																	readOnly: true,
																	fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
																}, {
																	xtype: 'splitter', width: 20,
																}, {
																	xtype: 'datefield',
																	fieldLabel: 'SPPJB Date',
																	anchor: '-5',
																	name: 'sppjb_date',
																	flex: 1,
																	readOnly: true,
																	fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
																	format: 'd-m-Y',
																	altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
																	submitFormat: 'Y-m-d H:i:s.u'
																}]
														},
														{
															//  bodyPadding: 10,
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [{
																	xtype: 'textfield',
																	fieldLabel: 'Akta PPJB No.',
																	anchor: '-5',
																	name: 'aktappjb_no',
																	flex: 1,
																	readOnly: true,
																	fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
																}, {
																	xtype: 'splitter', width: 20,
																}, {
																	xtype: 'datefield',
																	fieldLabel: 'Akta PPJB Date',
																	anchor: '-5',
																	name: 'aktappjb_date',
																	flex: 1,
																	readOnly: true,
																	fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
																	format: 'd-m-Y',
																	altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
																	submitFormat: 'Y-m-d H:i:s.u'
																}]
														},
														{
															//  bodyPadding: 10,
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [{
																	xtype: 'pengalihanhakhgbajbgrid',
																	width: '100%',
																	itemId: 'MyHgbAjbGrid'
																}]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															width: '50%',
															items: [{
																	xtype: 'changeownershipreasoncombobox',
																	anchor: '-5',
																	itemId: 'fd_changeownershipreason2',
																	flex: 1,
																	fieldLabel: 'Reason Change',
																	name: 'changeownershipreason_id_01',
																	allowBlank: true,
																	enableKeyEvents: true,
																	store: '',
																	source: 'reason_change',
																	forceSelection: true,
																	listeners: {
																		beforequery: function (record) {
																			record.query = new RegExp(record.query, 'i');
																			record.forceAll = true;
																		}
																	}
																}]
														}
													]
												},
											]
										}
									]
								},
								/* NEW OWNERSHIP */
								{xtype: 'panel', bodyPadding: 10, title: 'NEW OWNERSHIP', collapsible: true,
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
																	xtype: 'checkboxfield',
																	fieldLabel: 'PT / Badan Hukum',
																	anchor: '-5',
																	name: 'is_badan_hukum',
																	inputValue: '1',
																	uncheckedValue: '0',
																	// flex: 1
																}, {
																	xtype: 'splitter', width: 20,
																}, {
																	xtype: 'textfield',
																	fieldLabel: 'Nama Customer',
																	anchor: '-5',
																	name: 'customer_name_badan_hukum',
																	flex: 1,
																	disabled: true,
																	allowBlank: true,
																	enforceMaxLength: true,
																	maxLength: 50,
																	maskRe: /[A-Za-z\s.]/
																			// readOnly: true,
																			// fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
																}]
														},
														{
//															xtype: 'textfield',
															xtype: 'hiddenfield',
															itemId: 'fd_ktp_text',
															name: 'file_ktp_name'
														},
														{
															xtype: 'form',
															itemId: 'formku3',
															bodyStyle: 'background:none;border:0',
															layout: 'hbox',
															width: '100%',
															items: [
																{
																	xtype: 'filefield',
																	itemId: 'fd_ktp',
																	name: 'ktp_browse',
																	fieldLabel: 'KTP',
																	emptyText: 'Select an file',
																	buttonText: 'Browse'
																}]
														},
														{
															padding   : '10px 0 0 0',
															layout    : 'hbox',
															bodyStyle : 'border:0px',
															items     : [
																{
																	xtype      : 'xnumericfieldEST',
																	fieldLabel : 'No. KTP',
																	anchor     : '-5',
																	name       : 'ktp',
																	flex       : 1,
																	allowBlank : false,
																	maxLength  : 16
																}, 
																{
																	xtype: 'splitter', width: 20,
																}, 
																{
																	xtype      : 'textfield',
																	fieldLabel : 'Pengalihan Hak No.',
																	anchor     : '-5',
																	name       : 'changeownership_no',
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
																	fieldLabel: 'New Owner',
																	anchor: '-5',
																	name: 'name',
																	flex: 1,
																	allowBlank: false,
																	maskRe: /[A-Za-z\s.]/,
																	enforceMaxLength: true,
																	maxLength: 50
																}, {
																	xtype: 'splitter', width: 20,
																},
																{
																	xtype: 'datefield',
																	fieldLabel: 'Pengalihan Hak Date',
																	anchor: '-5',
																	name: 'changeownership_date',
																	flex: 1,
																	//allowBlank: false,
																	format: 'd-m-Y',
																	altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
																	submitFormat: 'Y-m-d H:i:s.u'
																}]
														},
														{
															//  bodyPadding: 10,
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [{
																	xtype: 'textfield',
																	fieldLabel: 'Tempat Lahir',
																	anchor: '-5',
																	name: 'birthplace',
																	flex: 1,
																	maskRe: /[A-Za-z\s.-]/,
																	enforceMaxLength: true,
																	maxLength: 50
																}, {
																	xtype: 'splitter', width: 20,
																},
																{
																	xtype: 'datefield',
																	fieldLabel: 'Tanggal Lahir',
																	anchor: '-5',
																	name: 'birthdate',
																	flex: 1,
																	format: 'd-m-Y',
																	altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
																	submitFormat: 'Y-m-d H:i:s.u'
																}]
														},
														{
															//  bodyPadding: 10,
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype: 'datefield',
																	fieldLabel: 'Rencana Pengalihan Hak Date',
																	anchor: '-5',
																	name: 'plan_changeownership_date',
																	flex: 1,
																	labelWidth: 200,
																	//allowBlank: false,
																	format: 'd-m-Y',
																	altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
																	submitFormat: 'Y-m-d'
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
																	name       : 'address',
																	flex       : 1,
																	allowBlank : false,
																}]
														},
														{
															padding   : '10px 0 0 0',
															layout    : 'hbox',
															bodyStyle : 'border:0px',
															items     : [
																{
																	xtype      : 'xnumericfieldEST',
																	fieldLabel : 'RT',
																	anchor     : '-5',
																	name       : 'koresponden_rt',
																	flex       : 1,
																	maxLength  : 5
																}, 
																{
																	xtype: 'splitter', width: 20,
																}, 
																{
																	xtype      : 'xnumericfieldEST',
																	fieldLabel : 'RW',
																	anchor     : '-5',
																	name       : 'koresponden_rw',
																	flex       : 1,
																	maxLength  : 5
																}, 
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
																	name       : 'koresponden_kelurahan',
																	flex       : 1,
																	maxLength  : 100
																}, 
																{
																	xtype: 'splitter', width: 20,
																}, 
																{
																	xtype      : 'xgeneralfieldEST',
																	fieldLabel : 'Kecamatan',
																	anchor     : '-5',
																	name       : 'koresponden_kecamatan',
																	flex       : 1,
																	maxLength  : 100
																}, 
															]
														},
														{
															padding   : '10px 0 0 0',
															layout    : 'hbox',
															bodyStyle : 'border:0px;',
															items     : [
																{
																	// editable     : false,
																	xtype          : 'citycombobox',
																	fieldLabel     : 'Kotamadya/ Kabupaten',
																	anchor         : '-5',
																	name           : 'koresponden_city_id',
																	queryMode      : 'local',
																	flex           : 1,
																	bodyStyle      : 'margin-top:0px;',
																	displayField   : 'city_name',
																	valueField     : 'city_id',
																	source         : 'city',
																	forceSelection : true,
																	listeners      : {
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
																	xtype        : 'combobox',
																	fieldLabel   : 'Propinsi',
																	anchor       : '-5',
																	name         : 'koresponden_province_id',
																	displayField : 'province_name',
																	valueField   : 'province_id',
																	source       : 'province',
																	queryMode    : 'local',
																	flex         : 1,
																	editable     : false
																},
															]
														},
														{
															padding   : '10px 0 0 0',
															layout    : 'hbox',
															bodyStyle : 'border:0px',
															items     : [
						                                        {
						                                            xtype      : 'xnumericfieldEST',
						                                            fieldLabel : 'Kode Pos',
						                                            name       : 'koresponden_zipcode',
						                                            maxLength  : 10
						                                        },
															]
														},
														{
															padding   : '10px 0 0 0',
															layout    : 'hbox',
															bodyStyle : 'border:0px',
															items     : [{
																	xtype      : 'xaddressfieldEST',
																	fieldLabel : 'Alamat KTP',
																	anchor     : '-5',
																	name       : 'ktp_address',
																	flex       : 1,
																	allowBlank : false,
																}]
														},
														{
															padding   : '10px 0 0 0',
															layout    : 'hbox',
															bodyStyle : 'border:0px',
															items     : [
																{
																	xtype      : 'xnumericfieldEST',
																	fieldLabel : 'RT',
																	anchor     : '-5',
																	name       : 'ktpesponden_rt',
																	flex       : 1,
																	maxLength  : 5
																}, 
																{
																	xtype: 'splitter', width: 20,
																}, 
																{
																	xtype      : 'xnumericfieldEST',
																	fieldLabel : 'RW',
																	anchor     : '-5',
																	name       : 'ktp_rw',
																	flex       : 1,
																	maxLength  : 5
																}, 
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
																	name       : 'ktp_kelurahan',
																	flex       : 1,
																	maxLength  : 100
																}, 
																{
																	xtype: 'splitter', width: 20,
																}, 
																{
																	xtype      : 'xgeneralfieldEST',
																	fieldLabel : 'Kecamatan',
																	anchor     : '-5',
																	name       : 'ktp_kecamatan',
																	flex       : 1,
																	maxLength  : 100
																}, 
															]
														},
														{
															padding   : '10px 0 0 0',
															layout    : 'hbox',
															bodyStyle : 'border:0px;',
															items     : [
																{
																	// editable       : false,
																	xtype          : 'citycombobox',
																	fieldLabel     : 'Kotamadya/ Kabupaten',
																	anchor         : '-5',
																	name           : 'ktp_city_id',
																	queryMode      : 'local',
																	flex           : 1,
																	bodyStyle      : 'margin-top:0px;',
																	displayField   : 'city_name',
																	valueField     : 'city_id',
																	source         : 'city',
																	forceSelection : true,
																	listeners      : {
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
																	xtype        : 'combobox',
																	fieldLabel   : 'Propinsi',
																	anchor       : '-5',
																	name         : 'ktp_province_id',
																	displayField : 'province_name',
																	valueField   : 'province_id',
																	source       : 'province',
																	queryMode    : 'local',
																	flex         : 1,
																	editable     : false
																},
															]
														},
														{
															padding   : '10px 0 0 0',
															layout    : 'hbox',
															bodyStyle : 'border:0px',
															items     : [
						                                        {
						                                            xtype      : 'xnumericfieldEST',
						                                            fieldLabel : 'Kode Pos',
						                                            name       : 'ktp_zipcode',
						                                            maxLength  : 10
						                                        },
															]
														},
														{
															padding   : '10px 0 0 0',
															layout    : 'hbox',
															bodyStyle : 'border:0px',
															items     : [
																{
																	xtype      : 'xaddressfieldEST',
																	fieldLabel : 'Alamat Surat Menyurat',
																	anchor     : '-5',
																	name       : 'alamat_surat_menyurat',
																	flex       : 1,
																}
															]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [{
																	xtype: 'textfield',
																	fieldLabel: 'Nomor NPWP',
																	anchor: '-5',
																	name: 'npwp_no',
																	flex: 1,
																	maskRe: /[0-9\s.-]/,
																	enforceMaxLength: true,
																	maxLength: 15
																}, {
																	xtype: 'splitter', width: 20,
																}, {
																	xtype: 'textfield',
																	fieldLabel: 'Email',
																	anchor: '-5',
																	name: 'email',
																	vtype: 'email',
																	flex: 1,
																	enforceMaxLength: true,
																	maxLength: 30,
																	listeners: {
																		'blur': function (thisField) {
																			if (!thisField.isValid()) {
																				this.setValue("");
																			}
																		}
																	}
																}]
														},
														{
															//  bodyPadding: 10,
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [{
																	xtype      : 'xphonenumberfieldEST',
																	fieldLabel : 'Telephone',
																	anchor     : '-5',
																	name       : 'telephone',
																	flex       : 1,
																	allowBlank : false,
																}, {
																	xtype: 'splitter', width: 20,
																}, {
																	xtype      : 'xphonenumberfieldEST',
																	fieldLabel : 'Mobile Phone',
																	anchor     : '-5',
																	name       : 'mobilephone',
																	flex       : 1,
																	allowBlank : false,
																}]
														},
														{
															//  bodyPadding: 10,
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [{
																	xtype: 'textfield',
																	fieldLabel: 'Pekerjaan',
																	anchor: '-5',
																	name: 'pekerjaan',
																	flex: 1,
																	enforceMaxLength: true,
																	maxLength: 30,
																	maskRe: /[A-Za-z\s.]/
																}, {
																	xtype: 'splitter', width: 20,
																}, {
																	xtype: 'textfield',
																	fieldLabel: 'Sumber Dana',
																	anchor: '-5',
																	name: 'sumber_dana',
																	flex: 1,
																	enforceMaxLength: true,
																	maxLength: 50,
																	maskRe: /[A-Za-z\s.]/
																}]
														},
														{
															//  bodyPadding: 10,
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [{
																	xtype      : 'xphonenumberfieldEST',
																	fieldLabel : 'Fax',
																	anchor     : '-5',
																	name       : 'fax',
																	flex       : 1,
																}, {
																	xtype: 'splitter', width: 20,
																}, {
																	xtype: 'citycombobox',
																	anchor: '-5',
																	itemId: 'fd_city',
																	flex: 1,
																	fieldLabel: 'City',
																	name: 'city_id',
																	store: '',
																	source: 'city',
																	forceSelection: true,
																	listeners: {
																		beforequery: function (record) {
																			record.query = new RegExp(record.query, 'i');
																			record.forceAll = true;
																		}
																	}
																}]
														},
														{
															//  bodyPadding: 10,
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [{
																	xtype: 'changeownershipreasoncombobox',
																	anchor: '-5',
																	itemId: 'fd_changeownershipreason',
																	flex: 1,
																	fieldLabel: 'Reason Change',
																	name: 'changeownershipreason_id',
																	allowBlank: false,
																	enableKeyEvents: true,
																	store: '',
																	source: 'reason_change',
																	forceSelection: true,
																	listeners: {
																		beforequery: function (record) {
																			record.query = new RegExp(record.query, 'i');
																			record.forceAll = true;
																		}
																	}
																}, {
																	xtype: 'splitter', width: 20,
																}, 
																{
																	xtype          : 'xnumericfieldEST',
																	fieldLabel     : 'Biaya Pengalihan HAK',
																	anchor         : '-5',
																	name           : 'biaya',
																	currencyFormat : true,
																	flex           : 1,
																	allowBlank     : false,
																}
															]
														},
														{
															// padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															width: '49%',
															items: [{
																	xtype: 'Purposebuycombobox',
																	anchor: '-5',
																	itemId: 'fd_purposebuy',
																	flex: 1,
																	fieldLabel: 'Purpose Buy',
																	name: 'purposebuy_id',
																	allowBlank: true,
																	enableKeyEvents: true,
																	store: '',
																	source: 'purposebuy',
																	forceSelection: true,
																	listeners: {
																		beforequery: function (record) {
																			record.query = new RegExp(record.query, 'i');
																			record.forceAll = true;
																		}
																	}
																}]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype      : 'xnumericfieldEST',
																	fieldLabel : 'Porsi Kepemilikkan',
																	anchor     : '-5',
																	name       : 'porsi_kepemilikkan',
																	flex       : 0.3,
																	maxLength  : 3,
																},
																{xtype: 'label', text: '%', flex: 1, margin: '2px 0 0 5px'} 
															]
														},
														{
															padding   : '10px 0 0 0',
															layout    : 'hbox',
															bodyStyle : 'border:0px',
															items     : [{
																	xtype      : 'xnotefieldEST',
																	fieldLabel : 'Note',
																	anchor     : '-5',
																	name       : 'description',
																	flex       : 1,
																	allowBlank : false,
																}]
														},
														//Rizal 30 April 2019
														{
															padding   : '10px 0 0 0',
															layout    : 'hbox',
															bodyStyle : 'border:0px',
															items     : [
																{
																	xtype      : 'xgeneralfieldEST',
																	fieldLabel : 'Nomor Setor Pajak',
																	anchor     : '-5',
																	name       : 'nomor_setor_pajak',
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
																	xtype      : 'xgeneralfieldEST',
																	fieldLabel : 'PPJB Penegasan',
																	anchor     : '-5',
																	name       : 'ppjb_penegasan',
																	flex       : 1,
																}
															]
														},

														{
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype: 'fieldset',
																	title: 'Parameter SPPJB',
																	width: '100%',
																	margin: '10px 0 0 0',
																	bodyStyle: 'border:0px',
																	items: [
																		{
																			layout: 'hbox',
																			bodyStyle: 'border:0px',
																			items: [
																				{
																					xtype: 'hiddenfield',
																					fieldLabel: 'Parameter SPPJB',
																					anchor: '-5',
																					name: 'parametersppjb_id',
																					//flex: 1,
																					readOnly: true,
																				},
																				{
																					xtype: 'textfield',
																					fieldLabel: 'Parameter SPPJB',
																					anchor: '-5',
																					name: 'm_param_code',
																					//flex: 1,
																					readOnly: true,
																					fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
																				},
																				{
																					xtype: 'splitter', width: 5,
																				},
																				{
																					xtype: 'button',
																					text: 'Browse',
																					itemId: 'fd_browse_paramsppjb_btn',
																					padding: '2px 5px',
																					action: 'browse_paramsppjb',
																					iconCls: 'icon-search',
																					style: 'background-color:#FFC000;'
																				},
																			]
																		},
																		{
																			padding: '10px 0 0 0',
																			layout: 'hbox',
																			bodyStyle: 'border:0px',
																			items: [
																				{
																					xtype: 'textfield',
																					fieldLabel: 'First Signature Name',
																					anchor: '-5',
																					name: 'm_param_name_01',
																					flex: 1,
																					readOnly: true,
																					fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
																				}, {
																					xtype: 'splitter', width: 20,
																				}, {
																					xtype: 'textfield',
																					fieldLabel: 'Akta Number',
																					anchor: '-5',
																					name: 'm_param_akta_no',
																					flex: 1,
																					readOnly: true,
																					fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
																				}
																			]
																		},
																		{
																			padding: '10px 0 0 0',
																			layout: 'hbox',
																			bodyStyle: 'border:0px',
																			items: [
																				{
																					xtype: 'textfield',
																					fieldLabel: 'Second Signature Name',
																					anchor: '-5',
																					name: 'm_param_name_02',
																					flex: 1,
																					readOnly: true,
																					fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
																				}, {
																					xtype: 'splitter', width: 20,
																				}, {
																					xtype: 'datefield',
																					fieldLabel: 'Akta Date',
																					anchor: '-5',
																					name: 'm_param_akta_date',
																					flex: 1,
																					readOnly: true,
																					fieldStyle: 'background:none;background-color:#F2F2F2 !important;',
																					format: 'd-m-Y',
																					altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
																					submitFormat: 'Y-m-d H:i:s.u'
																				}
																			]
																		}
																	]
																}
															]
														},
													]
												}
											]
										}
									]
								}
							]
						},
						{title: 'Kelengkapan Berkas (1/2)',
							items: [
								{xtype: 'panel', bodyPadding: 10, title: 'Kelengkapan Berkas', collapsible: true,
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
																	xtype: 'textfield',
																	fieldLabel: 'Harga (NJOP)',
																	anchor: '-5',
																	name: 'njop',
																	currencyFormat: true,
																	flex: 1,
																	maskRe: /[0-9\.]/,
																}, {
																	xtype: 'splitter', width: 20,
																}, {
																	xtype: 'textfield',
																	fieldLabel: 'Harga Real Transaksi',
																	anchor: '-5',
																	name: 'harga_real_transaksi',
																	currencyFormat: true,
																	flex: 1,
																	maskRe: /[0-9\.]/,
																	enableKeyEvents: true,
																}]
														},
														{
															//  bodyPadding: 10,
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [{
																	xtype: 'radiogroup',
																	fieldLabel: 'Status Pengalihan Hak',
																	name: 'group_changeownership_status',
																	width: '60%',
																	labelWidth: 130,
																	items: [
																		{
																			padding: '0 0 0 10px',
																			xtype: 'radiofield',
																			boxLabel: 'Normal',
																			name: 'changeownership_status',
																			inputValue: 'Normal',
																			itemId: 'changeownership_status_normal'
																		},
																		{
																			padding: '0 0 0 10px',
																			xtype: 'radiofield',
																			boxLabel: 'Ortu Anak',
																			name: 'changeownership_status',
																			inputValue: 'Ortu Anak',
																			itemId: 'changeownership_status_ortu_anak'
																		},
																		{
																			padding: '0 0 0 10px',
																			xtype: 'radiofield',
																			boxLabel: 'Khusus',
																			name: 'changeownership_status',
																			inputValue: 'Khusus',
																			itemId: 'changeownership_status_khusus'
																		}
																	]
																}]
														},
														{
															//  bodyPadding: 10,
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [{
																	xtype: 'textfield',
																	fieldLabel: 'PPH Final',
																	anchor: '-5',
																	name: 'pph_final',
																	currencyFormat: true,
																	flex: 1,
																	maskRe: /[0-9\.]/,
																}, {
																	xtype: 'splitter', width: 20,
																}, {
																	xtype: 'datefield',
																	fieldLabel: 'Tgl. Jam Pelaksanaan PH',
																	anchor: '-5',
																	name: 'changeownership_pelaksanaan_date',
																	flex: 1,
																	format: 'd-m-Y H:i:s',
																	altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
																	submitFormat: 'Y-m-d H:i:s.u'
																}]
														},
														{
															//  bodyPadding: 10,
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [{
																	xtype: 'radiogroup',
																	fieldLabel: 'Pelaporan Pajak',
																	name: 'group_pelaporan_pajak',
																	width: '50%',
																	labelWidth: 130,
																	items: [
																		{
																			padding: '0 0 0 10px',
																			xtype: 'radiofield',
																			boxLabel: 'Sunset',
																			name: 'pelaporan_pajak',
																			inputValue: 'Sunset',
																			itemId: 'changeownership_status_sunset'
																		},
																		{
																			padding: '0 0 0 10px',
																			xtype: 'radiofield',
																			boxLabel: 'Tidak Sunset',
																			name: 'pelaporan_pajak',
																			inputValue: 'Tidak Sunset',
																			itemId: 'changeownership_status_tidak_sunset'
																		}
																	]
																}]
														}
													]
												}
											]
										}
									]
								},
								{xtype: 'panel', bodyPadding: 10, title: 'DATA PENJUAL', collapsible: true,
									width: '100%',
									items: [
										{
											xtype: 'panel',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											padding: '10px 0 0 0',
											items: [
												{
													xtype: 'textfield',
													fieldLabel: 'Nama Suami / Istri',
													name: 'nama_suami_istri',
													flex: 1,
													maskRe: /[A-Za-z0-9\s]/
												}
											]
										},
										{
											xtype: 'panel',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [
												{
													xtype: 'checkboxgroup',
													width: '100%',
													fieldLabel: '',
													columns: 7,
													items: [
														{
															xtype: 'checkboxfield',
															boxLabel: 'KTP Suami',
															name: 'penjual_ktp_suami',
															inputValue: '1',
															uncheckedValue: '0'
														},
														{
															xtype: 'checkboxfield',
															boxLabel: 'KTP Istri',
															name: 'penjual_ktp_istri',
															inputValue: '1',
															uncheckedValue: '0'
														},
														{
															xtype: 'checkboxfield',
															boxLabel: 'KSK / KK',
															name: 'penjual_ksk_kk',
															inputValue: '1',
															uncheckedValue: '0'
														},
														{
															xtype: 'checkboxfield',
															boxLabel: 'GANTI NAMA',
															name: 'penjual_ganti_nama',
															inputValue: '1',
															uncheckedValue: '0'
														},
														{
															xtype: 'checkboxfield',
															boxLabel: 'SK WNI',
															name: 'penjual_sk_wni',
															inputValue: '1',
															uncheckedValue: '0'
														},
														{
															xtype: 'checkboxfield',
															boxLabel: 'AKTA NIKAH',
															name: 'penjual_akta_nikah',
															inputValue: '1',
															uncheckedValue: '0'
														},
														{
															xtype: 'checkboxfield',
															boxLabel: 'AKTA CERAI',
															name: 'penjual_akta_cerai',
															inputValue: '1',
															uncheckedValue: '0'
														}
													]
												}
											]
										},
										{
											xtype: 'panel',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											padding: '10px 0 0 0',
											items: [
												{
													xtype: 'checkboxgroup',
													width: '100%',
													fieldLabel: '',
													columns: 4,
													items: [
														{
															xtype: 'checkboxfield',
															boxLabel: 'AKTA Kematian',
															name: 'penjual_akta_kematian',
															inputValue: '1',
															uncheckedValue: '0'
														},
														{
															xtype: 'checkboxfield',
															boxLabel: 'AKTA Waris',
															name: 'penjual_akta_waris',
															inputValue: '1',
															uncheckedValue: '0'
														},
														{
															xtype: 'checkboxfield',
															boxLabel: 'NPWP',
															name: 'penjual_akta_npwp',
															inputValue: '1',
															uncheckedValue: '0'
														},
														{
															xtype: 'checkboxfield',
															boxLabel: 'Surat Ket. Belum Menikah',
															name: 'penjual_sk_belum_nikah',
															inputValue: '1',
															uncheckedValue: '0'
														}
													]
												}
											]
										},
										{
											xtype: 'panel',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											padding: '10px 0 0 0',
											items: [
												{
													xtype: 'checkboxgroup',
													width: '100%',
													fieldLabel: '',
													columns: 6,
													items: [
														{
															xtype: 'checkboxfield',
															boxLabel: 'SPT (Asli)',
															name: 'penjual_spt_asli',
															inputValue: '1',
															uncheckedValue: '0'
														},
														{
															xtype: 'checkboxfield',
															boxLabel: 'SPPJB (Asli)',
															name: 'penjual_sppjb_asli',
															inputValue: '1',
															uncheckedValue: '0'
														},
														{
															xtype: 'checkboxfield',
															boxLabel: 'BAST (Asli)',
															name: 'penjual_bast_asli',
															inputValue: '1',
															uncheckedValue: '0'
														},
														{
															xtype: 'checkboxfield',
															boxLabel: 'SKL (Asli)',
															name: 'penjual_skl_asli',
															inputValue: '1',
															uncheckedValue: '0'
														},
														{
															xtype: 'checkboxfield',
															boxLabel: 'LAIN-LAIN',
															name: 'penjual_lain_lain',
															inputValue: '1',
															uncheckedValue: '0',
															enforceMaxLength: true,
															maxLength: 30,
															maskRe: /[A-Za-z\s.]/
														},
														{
															xtype: 'textfield',
															fieldLabel: '',
															anchor: '-5',
															name: 'penjual_lain_lain_keterangan',
															flex: 1
														}
													]
												}
											]
										},
										{
											xtype: 'panel',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											padding: '10px 0 0 4px',
											items: [
												{
													xtype: 'checkboxfield',
													boxLabel: 'PBB dgn',
													name: 'penjual_pbb',
													inputValue: '1',
													uncheckedValue: '0',
												}, {
													xtype: 'splitter', width: 20,
												}, {
													xtype: 'textfield',
													fieldLabel: 'Keterangan',
													anchor: '-5',
													name: 'penjual_pbb_keterangan',
													flex: 1,
													enforceMaxLength: true,
													maxLength: 30,
													maskRe: /[A-Za-z\s.]/
												}, {
													xtype: 'splitter', width: 20,
												}, {
													xtype: 'checkboxfield',
													boxLabel: 'Print OUT PBB<br><font size="-3">(Kwitansi Retribusi Asli) Harus sudah lunas s/d bulan transaksi PH</font>',
													name: 'penjual_printout_pbb',
													inputValue: '1',
													uncheckedValue: '0',
												}
											]
										},
										{
											xtype: 'panel',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											padding: '10px 0 0 4px',
											items: [
												{
													xtype: 'checkboxfield',
													boxLabel: 'RETRIBUSI',
													name: 'penjual_retribusi',
													inputValue: '1',
													uncheckedValue: '0',
												}, {
													xtype: 'splitter', width: 20,
												}, {
													xtype: 'textfield',
													fieldLabel: 'Keterangan',
													anchor: '-5',
													name: 'penjual_retribusi_keterangan',
													flex: 1
												}
											]
										},
										{
											xtype: 'panel',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											padding: '10px 0 0 4px',
											items: [
												{
													xtype: 'checkboxfield',
													boxLabel: 'KUITANSI ASLI',
													name: 'penjual_kuitansi_asli',
													inputValue: '1',
													uncheckedValue: '0',
													enforceMaxLength: true,
													maxLength: 30,
													maskRe: /[A-Za-z\s.]/
												}, {
													xtype: 'splitter', width: 20,
												}, {
													xtype: 'textfield',
													labelWidth: 230,
													fieldLabel: '(Bukti Pembayaran ke PT (TJ, DP, Etc))',
													anchor: '-5',
													name: 'penjual_kuitansi_asli_keterangan',
													flex: 1
												}
											]
										},
										{
											xtype: 'panel',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											padding: '10px 0 0 0',
											items: [
												{
													xtype: 'checkboxgroup',
													width: '100%',
													fieldLabel: '',
													columns: 5,
													items: [
														{
															xtype: 'checkboxfield',
															boxLabel: 'Pinjam Pakai (Asli)',
															name: 'penjual_pinjam_pakai',
															inputValue: '1',
															uncheckedValue: '0'
														},
														{
															xtype: 'checkboxfield',
															boxLabel: 'Sertifikat (Asli)',
															name: 'penjual_sertifikat',
															inputValue: '1',
															uncheckedValue: '0'
														},
														{
															xtype: 'checkboxfield',
															boxLabel: 'IJB (Salinan Asli)',
															name: 'penjual_ijb',
															inputValue: '1',
															uncheckedValue: '0'
														},
														{
															xtype: 'checkboxfield',
															boxLabel: 'AJB (Salinan Asli)',
															name: 'penjual_ajb',
															inputValue: '1',
															uncheckedValue: '0'
														},
														{
															xtype: 'checkboxfield',
															boxLabel: 'Surat Kuasa<br>(Salinan Asli)',
															name: 'penjual_surat_kuasa',
															inputValue: '1',
															uncheckedValue: '0'
														}
													]
												}
											]
										}
									]
								}
								//Rizal 30 April 2019

								, {xtype: 'panel', bodyPadding: 10, title: 'Notaris', collapsible: true,
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
																	xtype: 'textfield',
																	fieldLabel: 'Nomor Kuasa',
																	anchor: '-5',
																	name: 'nomor_kuasa',
																	flex: 1,
																	enforceMaxLength: true,
																	maxLength: 30,
																	maskRe: /[A-Za-z0-9\s.]/
																}, {
																	xtype: 'splitter', width: 20,
																}, {
																	xtype: 'textfield',
																	fieldLabel: 'Nama Notaris',
																	anchor: '-5',
																	name: 'nama_notaris',
																	flex: 1,
																	enforceMaxLength: true,
																	maxLength: 30,
																	maskRe: /[A-Za-z\s.]/
																}]
														},

														{
															//  bodyPadding: 10,
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [{
																	xtype: 'datefield',
																	fieldLabel: 'Tgl. Akta',
																	anchor: '-5',
																	name: 'tanggal_akta',
																	flex: 1,
																	format: 'd-m-Y',
																	altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
																	submitFormat: 'Y-m-d'
																}]
														},
													]
												}
											]
										}
									]
								},
										//
							]
						},
						{title: 'Kelengkapan Berkas (2/2)',
							items: [
								{xtype: 'panel', bodyPadding: 10, title: 'DATA PEMBELI', collapsible: true,
									width: '100%',
									items: [
										{
											xtype: 'panel',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											items: [
												{
													xtype: 'checkboxgroup',
													width: '100%',
													fieldLabel: '',
													columns: 7,
													items: [
														{
															xtype: 'checkboxfield',
															boxLabel: 'KTP Suami',
															name: 'pembeli_ktp_suami',
															inputValue: '1',
															uncheckedValue: '0'
														},
														{
															xtype: 'checkboxfield',
															boxLabel: 'KTP Istri',
															name: 'pembeli_ktp_istri',
															inputValue: '1',
															uncheckedValue: '0'
														},
														{
															xtype: 'checkboxfield',
															boxLabel: 'KSK / KK',
															name: 'pembeli_ksk_kk',
															inputValue: '1',
															uncheckedValue: '0'
														},
														{
															xtype: 'checkboxfield',
															boxLabel: 'Ganti Nama',
															name: 'pembeli_ganti_nama',
															inputValue: '1',
															uncheckedValue: '0'
														},
														{
															xtype: 'checkboxfield',
															boxLabel: 'SK WNI',
															name: 'pembeli_sk_wni',
															inputValue: '1',
															uncheckedValue: '0'
														},
														{
															xtype: 'checkboxfield',
															boxLabel: 'AKTA NIKAH',
															name: 'pembeli_akta_nikah',
															inputValue: '1',
															uncheckedValue: '0'
														},
														{
															xtype: 'checkboxfield',
															boxLabel: 'AKTA CERAI',
															name: 'pembeli_akta_cerai',
															inputValue: '1',
															uncheckedValue: '0'
														}
													]
												}
											]
										},
										{
											xtype: 'panel',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											padding: '10px 0 0 0',
											items: [
												{
													xtype: 'checkboxgroup',
													width: '100%',
													fieldLabel: '',
													columns: 4,
													items: [
														{
															xtype: 'checkboxfield',
															boxLabel: 'AKTA Kematian',
															name: 'pembeli_akta_kematian',
															inputValue: '1',
															uncheckedValue: '0'
														},
														{
															xtype: 'checkboxfield',
															boxLabel: 'AKTA Waris',
															name: 'pembeli_akta_waris',
															inputValue: '1',
															uncheckedValue: '0'
														},
														{
															xtype: 'checkboxfield',
															boxLabel: 'NPWP',
															name: 'pembeli_npwp',
															inputValue: '1',
															uncheckedValue: '0'
														},
														{
															xtype: 'checkboxfield',
															boxLabel: 'Surat Ket. Belum Menikah',
															name: 'pembeli_sk_belum_menikah',
															inputValue: '1',
															uncheckedValue: '0'
														}
													]
												}
											]
										},
										{
											xtype: 'panel',
											layout: 'hbox',
											bodyStyle: 'border:0px',
											padding: '10px 0 0 4px',
											items: [
												{
													xtype: 'checkboxfield',
													boxLabel: 'Lain-lain',
													name: 'pembeli_lain_lain',
													inputValue: '1',
													uncheckedValue: '0',
													enforceMaxLength: true,
													maxLength: 30,
													maskRe: /[A-Za-z\s.]/
												}, {
													xtype: 'splitter', width: 20,
												}, {
													xtype: 'textfield',
													fieldLabel: 'Keterangan',
													anchor: '-5',
													name: 'pembeli_lain_lain_keterangan',
													flex: 1,
													enforceMaxLength: true,
													maxLength: 30,
													maskRe: /[A-Za-z\s.]/
												}
											]
										},
									]
								},
								{xtype: 'panel', bodyPadding: 10, title: 'NOTE', collapsible: true,
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
															padding   : '10px 0 0 0',
															layout    : 'hbox',
															bodyStyle : 'border:0px',
															items     : [
																{
																	xtype      : 'xnotefieldEST',
																	fieldLabel : 'Catatan',
																	anchor     : '-5',
																	name       : 'pembeli_catatan',
																	flex       : 1,
																}
															]
														}
													]
												}
											]
										}
									]
								},
								{xtype: 'panel', bodyPadding: 10, title: 'KONTAK', collapsible: true,
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
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [{
																	xtype: 'textfield',
																	fieldLabel: 'Penjual',
																	anchor: '-5',
																	name: 'penjual_nama',
																	flex: 1,
																	enforceMaxLength: true,
																	maxLength: 30,
																	maskRe: /[A-Za-z\s.]/
																}, {
																	xtype: 'splitter', width: 20,
																}, {
																	xtype: 'textfield',
																	fieldLabel: 'Pembeli',
																	anchor: '-5',
																	name: 'pembeli_nama',
																	flex: 1,
																	enforceMaxLength: true,
																	maxLength: 30,
																	maskRe: /[A-Za-z\s.]/
																}]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [{
																	xtype: 'textfield',
																	fieldLabel: 'Alamat',
																	anchor: '-5',
																	name: 'penjual_alamat',
																	flex: 1,
																	enforceMaxLength: true,
																	maxLength: 255
																}, {
																	xtype: 'splitter', width: 20,
																}, {
																	xtype: 'textfield',
																	fieldLabel: 'Alamat',
																	anchor: '-5',
																	name: 'pembeli_alamat',
																	flex: 1,
																	enforceMaxLength: true,
																	maxLength: 255
																}]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [{
																	xtype      : 'xgeneralfieldEST',
																	fieldLabel : 'Kota',
																	anchor     : '-5',
																	name       : 'penjual_kota',
																	flex       : 1,
																	maxLength  : 30,
																}, {
																	xtype: 'splitter', width: 20,
																}, {
																	xtype      : 'xgeneralfieldEST',
																	fieldLabel : 'Kota',
																	anchor     : '-5',
																	name       : 'pembeli_kota',
																	flex       : 1,
																	maxLength  : 30,
																}]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [{
																	xtype      : 'xphonenumberfieldEST',
																	fieldLabel : 'No. Telp',
																	anchor     : '-5',
																	name       : 'penjual_telpon',
																	flex       : 1,
																}, {
																	xtype: 'splitter', width: 20,
																}, {
																	xtype      : 'xphonenumberfieldEST',
																	fieldLabel : 'No. Telp',
																	anchor     : '-5',
																	name       : 'pembeli_telpon',
																	flex       : 1,
																}]
														}
													]
												}
											]
										}
									]
								},
								{xtype: 'panel', bodyPadding: 10, title: 'INFORMATION', collapsible: true,
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
													bodyStyle: 'border:0px',
													items: [
														{
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	xtype: 'fieldset',
																	title: 'Yang Menyerahkan',
																	width: '100%',
																	margin: '10px 0 0 0',
																	bodyStyle: 'border:0px',
																	items: [
																		{
																			layout: 'hbox',
																			bodyStyle: 'border:0px',
																			items: [
																				{
																					xtype: 'textfield',
																					fieldLabel: 'Nama',
																					name: 'menyerahkan_nama',
																					flex: 1,
																					enforceMaxLength: true,
																					maxLength: 30,
																					maskRe: /[A-Za-z\s.]/
																				},
																			]
																		},
																		{
																			padding: '10px 0 0 0',
																			layout: 'hbox',
																			bodyStyle: 'border:0px',
																			items: [
																				{
																					xtype: 'textfield',
																					fieldLabel: 'Selaku',
																					name: 'menyerahkan_selaku',
																					flex: 1,
																					enforceMaxLength: true,
																					maxLength: 30,
																					maskRe: /[A-Za-z\s.]/
																				},
																			]
																		},
																		{
																			padding: '10px 0 0 0',
																			layout: 'hbox',
																			bodyStyle: 'border:0px',
																			items: [
																				{
																					xtype      : 'xphonenumberfieldEST',
																					fieldLabel : 'No. Telp',
																					name       : 'menyerahkan_telpon',
																					flex       : 1,
																				},
																			]
																		}
																	]
																}
															]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	//  bodyPadding: 10,
																	xtype: 'fieldset',
																	title: 'Penerima (CS)',
																	flex: 2,
																	margin: '10px 0 0 0',
																	layout: 'vbox',
																	bodyStyle: 'border:0px',
																	items: [
																		{
																			layout: 'hbox',
																			bodyStyle: 'border:0px',
																			flex: 7,
																			items: [
																				{
																					xtype: 'datefield',
																					fieldLabel: 'Tanggal',
																					anchor: '-5',
																					name: 'penerima_date',
																					flex: 1,
																					format: 'd-m-Y',
																					altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
																					submitFormat: 'Y-m-d H:i:s.u'
																				}
																			]
																		},
																		{
																			padding: '10px 0 0 0',
																			layout: 'hbox',
																			bodyStyle: 'border:0px',
																			flex: 7,
																			items: [
																				{
																					xtype      : 'xnamefieldEST',
																					fieldLabel : 'Nama',
																					anchor     : '-5',
																					name       : 'penerima_name',
																					flex       : 1,
																				}
																			]
																		},
																	]
																},
																{
																	//  bodyPadding: 10,
																	xtype: 'fieldset',
																	title: 'Pembuat PH',
																	flex: 2,
																	margin: '10px 0 0 0',
																	layout: 'vbox',
																	bodyStyle: 'border:0px',
																	items: [
																		{
																			layout: 'hbox',
																			bodyStyle: 'border:0px',
																			flex: 7,
																			items: [
																				{
																					xtype: 'datefield',
																					fieldLabel: 'Tanggal',
																					anchor: '-5',
																					name: 'pembuat_ph_date',
																					flex: 1,
																					format: 'd-m-Y',
																					altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
																					submitFormat: 'Y-m-d H:i:s.u'
																				}
																			]
																		},
																		{
																			padding: '10px 0 0 0',
																			layout: 'hbox',
																			bodyStyle: 'border:0px',
																			flex: 7,
																			items: [
																				{
																					xtype      : 'xnamefieldEST',
																					fieldLabel : 'Nama',
																					anchor     : '-5',
																					name       : 'pembuat_ph_name',
																					flex       : 1,
																				}
																			]
																		}
																	]
																}
															]
														},
														{
															padding: '10px 0 0 0',
															layout: 'hbox',
															bodyStyle: 'border:0px',
															items: [
																{
																	//  bodyPadding: 10,
																	xtype: 'fieldset',
																	title: 'Pelaksana PH',
																	flex: 2,
																	margin: '10px 0 0 0',
																	layout: 'vbox',
																	bodyStyle: 'border:0px',
																	items: [
																		{
																			layout: 'hbox',
																			bodyStyle: 'border:0px',
																			flex: 7,
																			items: [
																				{
																					xtype: 'datefield',
																					fieldLabel: 'Tanggal',
																					anchor: '-5',
																					name: 'pelaksana_ph_date',
																					flex: 1,
																					format: 'd-m-Y',
																					altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
																					submitFormat: 'Y-m-d H:i:s.u'
																				}
																			]
																		},
																		{
																			padding: '10px 0 0 0',
																			layout: 'hbox',
																			bodyStyle: 'border:0px',
																			flex: 7,
																			items: [
																				{
																					xtype      : 'xnamefieldEST',
																					fieldLabel : 'Nama',
																					anchor     : '-5',
																					name       : 'pelaksana_ph_name',
																					flex       : 1,
																				}
																			]
																		},
																	]
																},
																{
																	//  bodyPadding: 10,
																	xtype: 'fieldset',
																	title: 'Pemeriksa PH',
																	flex: 2,
																	margin: '10px 0 0 0',
																	layout: 'vbox',
																	bodyStyle: 'border:0px',
																	items: [
																		{
																			layout: 'hbox',
																			bodyStyle: 'border:0px',
																			flex: 7,
																			items: [
																				{
																					xtype: 'datefield',
																					fieldLabel: 'Tanggal',
																					anchor: '-5',
																					name: 'pemeriksa_ph_date',
																					flex: 1,
																					format: 'd-m-Y',
																					altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
																					submitFormat: 'Y-m-d H:i:s.u'
																				}
																			]
																		},
																		{
																			padding: '10px 0 0 0',
																			layout: 'hbox',
																			bodyStyle: 'border:0px',
																			flex: 7,
																			items: [
																				{
																					xtype      : 'xnamefieldEST',
																					fieldLabel : 'Nama',
																					anchor     : '-5',
																					name       : 'pemeriksa_ph_name',
																					flex       : 1,
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
						text: 'Cancel',
						handler: function () {
							this.up('window').close();
						}
					},
					{
						xtype: 'button',
						action: 'prinout',
						itemId: 'btnPrintout',
						padding: 5,
						width: 75,
						iconCls: 'icon-print',
						text: 'Print',
						disabled: true
					},
					//Rizal 6 Mei 2019
					,
							{
								xtype: 'button',
								action: 'printoutphak',
								itemId: 'btnPrintoutpHak',
								padding: 5,
								width: 115,
								iconCls: 'icon-print',
								text: 'Print Pengajuan',
								disabled: true
							},
							//
				]
			}
		];
		return x;
	}

});