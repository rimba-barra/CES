Ext.define('Erems.view.complaint.FormData', {
	extend   : 'Erems.library.template.view.FormData',
	alias    : 'widget.complaintformdata',
	itemId   : 'complaintFormData',
	requires : [
		'Erems.library.template.component.Clustercombobox',
		'Erems.library.template.component.Citycombobox',
		'Erems.library.template.component.Citraclubcombobox',
		'Erems.library.template.component.Garansicombobox',
		'Erems.view.complaint.DetailGridUtility',
		'Erems.view.complaint.DetailGridSurat',
		'Erems.view.complaint.DetailGrid',
		'Erems.view.complaint.DetailGridDokumen',
		'Erems.view.complaint.DetailGridHistory'
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

		Ext.applyIf(me, {
			items: [
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
					xtype  : 'hiddenfield',
					itemId : 'fdms_aftersales_id',
					name   : 'aftersales_id'
				},
				{
					xtype  : 'hiddenfield',
					itemId : 'fdms_pinjampakai_config',
					name   : 'pinjampakai_config'
				},
				me.purchaseletterInformation(),
				me.customerInformation(),
				me.collectionInformation(),
				me.legalInformation(),
				me.constructionInformation(),
				me.aftersalesInformation(),
				me.complaintInformation()
			],
			dockedItems: me.generateDockedItem()
		});

		me.callParent(arguments);
	},
	purchaseletterInformation : function(){
		var x = {
			xtype       : 'panel',
			bodyPadding : 10,
			title       : 'PURCHASE LETTER INFORMATION',
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
								defaultMargins : {top: 0, right: 0, bottom: 10, left: 0}
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
											fieldLabel : 'Purchase Letter No.',
											anchor     : '-5',
											name       : 'purchaseletter_no',
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
											fieldLabel : 'Kawasan / Cluster',
											anchor     : '-5',
											name       : 'cluster_code',
											flex       : 5,
											readOnly   : true,
											fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
										},
										{
											xtype: 'splitter', width: 5,
										},
										{
											xtype      : 'textfield',
											fieldLabel : '',
											anchor     : '-5',
											name       : 'cluster',
											flex       : 6,
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
											fieldLabel : 'Block name',
											anchor     : '-5',
											name       : 'block_code',
											flex       : 5,
											readOnly   : true,
											fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
										},
										{
											xtype: 'splitter', width: 5,
										},
										{
											xtype      : 'blockcombobox',
											fieldLabel : '',
											anchor     : '-5',
											name       : 'block',
											flex       : 6,
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
											name       : 'unit_number',
											flex       : 6,
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
											xtype        : 'datefield',
											fieldLabel   : 'Rencana S.T.',
											anchor       : '-5',
											name         : 'rencana_serahterima_date',
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
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									width     : '100%',
									items     : [
										{
											xtype          : 'checkboxfield',
											boxLabel       : 'Pengalihan Hak',
											name           : 'pengalihan_hak',
											inputValue     : '1',
											uncheckedValue : '0',
											readOnly       : true
										}
									]
								},
							]
						},
						{xtype: 'splitter', width: 30},
						{
							xtype  : 'panel',
							flex   : 7,
							layout : {
								type           : 'vbox',
								defaultMargins : {top: 0, right: 0, bottom: 10, left: 0}
							},
							bodyStyle : 'border:0px',
							items     : [
								{
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									width     : '100%',
									items     : [
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
										{xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'},
										{
											xtype: 'splitter', width: 30,
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
										{xtype: 'label', text: 'm', flex: 1, margin: '0 0 0 10px'}
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
										{xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'},
										{
											xtype: 'splitter', width: 30,
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
										{xtype: 'label', text: 'm', flex: 1, margin: '0 0 0 10px'}
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
										{xtype: 'label', text: 'm2', flex: 1, margin: '0 0 0 10px'},
										{
											xtype: 'splitter', width: 30,
										},
										{
											xtype      : 'label',
											fieldLabel : ' ',
											anchor     : '-5',
											flex       : 6,
											labelWidth : 30,
											readOnly   : true,
											fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
										},
										{xtype: 'label', text: '', flex: 1, margin: '0 0 0 10px'}
									]
								},
								{
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									width     : '100%',
									items     : [
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
								}
							]
						}

					]
				},
				{
					xtype     : 'panel',
					layout    : 'hbox',
					bodyStyle : 'border:0px',
					items     : [
						{
							xtype      : 'xnotefieldEST',
							padding    : '0 0 10px 0',
							fieldLabel : 'Notes',
							anchor     : '-5',
							name       : 'notes',
							flex       : 1,
							readOnly   : true,
							fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
						}
					]
				}

			]
		};

		return x;
	},
	customerInformation : function(){
		var x = {
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
											xtype      : 'textfield',
											fieldLabel : 'Customer ID',
											anchor     : '-5',
											name       : 'customer_id',
											width      : '30%',
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
											fieldLabel : 'Alamat Koresponden',
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
											xtype      : 'xaddressfieldEST',
											fieldLabel : 'Alamat KTP',
											anchor     : '-5',
											name       : 'customer_ktp_address',
											flex       : 1,
											readOnly   : true,
											fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
										}
									]
								},
								{
									padding   : '10px 0 0 110px',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype      : 'textfield',
											fieldLabel : 'City',
											anchor     : '-5',
											name       : 'customer_city_name',
											flex       : 1,
											readOnly   : true,
											fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
										},
										{xtype : 'splitter', width : 20},
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
									padding   : '10px 0 0 110px',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype      : 'xphonenumberfieldEST',
											fieldLabel : 'Homephone',
											name       : 'customer_homephone',
											flex       : 1,
											readOnly   : true,
											anchor     : '-5',
											fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
										},
										{xtype : 'splitter', width : 20},
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
									padding   : '10px 0 0 110px',
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
										{xtype : 'splitter', width : 20},
										{
											xtype      : 'xphonenumberfieldEST',
											fieldLabel : 'Fax',
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
											xtype: 'textfield',
											fieldLabel: 'Email Address',
											anchor: '-5',
											name: 'customer_email',
											width: '50%',
											readOnly: true,
											fieldStyle: 'background:none;background-color:#F2F2F2 !important;'
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
											name       : 'cutomer_KTP_number',
											width      : '50%',
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
		};

		return x;
	},
	collectionInformation : function(){
		var me = this;
		var x = {
			xtype       : 'panel',
			bodyPadding : 10,
			title       : 'COLLECTION INFORMATION',
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
											xtype      : 'xmoneyfieldEST',
											fieldLabel : 'Harga Jual',
											name       : 'harga_jual',
											anchor     : '-5',
											width      : '48.5%',
											readOnly   : true,
											fieldCls   : 'readonly',
											listeners  : {
												change: function () {
													me.down('[name=' + this.getName() + ']').setValue(accounting.formatMoney(this.getValue()));
												}
											}
										},
										{xtype : 'splitter', width : 20},
										{
											xtype      : 'xmoneyfieldEST',
											fieldLabel : 'Harga Netto',
											name       : 'harga_netto',
											anchor     : '-5',
											width      : '48.5%',
											readOnly   : true,
											fieldCls   : 'readonly',
											listeners  : {
												change: function () {
													me.down('[name=' + this.getName() + ']').setValue(accounting.formatMoney(this.getValue()));
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
											xtype      : 'xmoneyfieldEST',
											fieldLabel : 'Pembayaran',
											name       : 'total_payment',
											anchor     : '-5',
											width      : '40%',
											readOnly   : true,
											fieldCls   : 'readonly',
											listeners  : {
												change: function () {
													me.down('[name=' + this.getName() + ']').setValue(accounting.formatMoney(this.getValue()));
												}
											}
										},
										{xtype : 'splitter', width : 5},
										{
											xtype        : 'xmoneyfieldEST',
											fieldLabel   : '',
											name         : 'progress_pembayaran',
											anchor       : '-5',
											width        : 40,
											readOnly     : true,
											fieldCls     : 'readonly',
											change: function () {
												me.down('[name=' + this.getName() + ']').setValue(accounting.formatMoney(this.getValue()));
											}
										},
										{xtype : 'label', text : '%', margin : '0 0 0 5px'},
										{xtype : 'splitter', width : 20},
										{
											xtype      : 'xmoneyfieldEST',
											fieldLabel : 'Uang Muka',
											name       : 'uangmuka_value',
											anchor     : '-5',
											flex       : 1,
											readOnly   : true,
											fieldCls   : 'readonly',
											listeners  : {
												change: function () {
													me.down('[name=' + this.getName() + ']').setValue(accounting.formatMoney(this.getValue()));
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
											xtype      : 'xmoneyfieldEST',
											fieldLabel : 'Sisa Pembayaran',
											name       : 'sisa_pembayaran',
											anchor     : '-5',
											width      : '48.5%',
											readOnly   : true,
											fieldCls   : 'readonly',
											listeners  : {
												change: function () {
													me.down('[name=' + this.getName() + ']').setValue(accounting.formatMoney(this.getValue()));
												}
											}
										},
										{xtype : 'splitter', width : 20},
										{
											xtype      : 'xmoneyfieldEST',
											fieldLabel : 'Sisa Denda',
											name       : 'total_remaining_denda',
											anchor     : '-5',
											flex       : 1,
											readOnly   : true,
											fieldCls   : 'readonly',
											listeners  : {
												change: function () {
													me.down('[name=' + this.getName() + ']').setValue(accounting.formatMoney(this.getValue()));
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
											fieldLabel : 'Status Jual',
											name       : 'pricetype',
											anchor     : '-5',
											readOnly   : true,
											fieldCls   : 'readonly',
											width      : '48.5%',
										}
									]
								},
								{
									padding: '10px 0 0 0',
									layout: 'hbox',
									bodyStyle: 'border:0px',
									items: [
										{
											xtype      : 'xmoneyfieldEST',
											fieldLabel : 'KPR ACC',
											name       : 'kpr_value_approve',
											anchor     : '-5',
											flex       : 1,
											readOnly   : true,
											fieldCls   : 'readonly',
											listeners  : {
												change: function () {
													me.down('[name=' + this.getName() + ']').setValue(accounting.formatMoney(this.getValue()));
												}
											}
										},
										{xtype : 'splitter', width : 20},
										{
											xtype      : 'textfield',
											fieldLabel : 'Bank Name',
											anchor     : '-5',
											name       : 'bank_name',
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
											xtype        : 'datefield',
											fieldLabel   : 'KPR ACC Date',
											anchor       : '-5',
											name         : 'kpapprove_date',
											flex         : 1,
											readOnly     : true,
											fieldStyle   : 'background:none;background-color:#F2F2F2 !important;',
											format       : 'd-m-Y',
											altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
											submitFormat : 'Y-m-d H:i:s.u'
										},
										{xtype : 'splitter', width : 20},
										{
											xtype        : 'datefield',
											fieldLabel   : 'Akad Date',
											anchor       : '-5',
											name         : 'akad_realisasiondate',
											flex         : 1,
											readOnly     : true,
											fieldStyle   : 'background:none;background-color:#F2F2F2 !important;',
											format       : 'd-m-Y',
											altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
											submitFormat : 'Y-m-d H:i:s.u'
										}
									]
								}
							]
						}
					]
				}
			]
		};

		return x;
	},
	legalInformation : function(){
		var x = {
			xtype       : 'panel',
			bodyPadding : 10,
			title       : 'LEGAL INFORMATION',
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
											fieldLabel : 'SPPJB No',
											anchor     : '-5',
											name       : 'sppjb_no',
											flex       : 1,
											readOnly   : true,
											fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
										},
										{xtype : 'splitter', width : 20},
										{
											xtype        : 'datefield',
											fieldLabel   : 'SPPJB Date',
											anchor       : '-5',
											name         : 'sppjb_date',
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
											fieldLabel   : 'SPPJB Sign Date',
											anchor       : '-5',
											name         : 'tandatangan_date',
											width        : '48.5%',
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
											fieldLabel : 'Akta PPJB No',
											anchor     : '-5',
											name       : 'aktappjb_no',
											flex       : 1,
											readOnly   : true,
											fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
										},
										{xtype : 'splitter', width : 20},
										{
											xtype        : 'datefield',
											fieldLabel   : 'Akta PPJB Date',
											anchor       : '-5',
											name         : 'aktappjb_date',
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
											fieldLabel : 'IMB No',
											anchor     : '-5',
											name       : 'imb_no',
											flex       : 1,
											readOnly   : true,
											fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
										},
										{xtype : 'splitter', width : 20},
										{
											xtype        : 'datefield',
											fieldLabel   : 'IMB Date',
											anchor       : '-5',
											name         : 'imb_date',
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
									padding   : '10px 0 0 110px',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype      : 'checkboxgroup',
											width      : '50%',
											fieldLabel : '',
											items      : [
												{
													xtype          : 'checkboxfield',
													boxLabel       : 'AJB',
													name           : 'is_ajb',
													inputValue     : '1',
													uncheckedValue : '0',
													readOnly       : true
												},
												{
													xtype          : 'checkboxfield',
													boxLabel       : 'HGB',
													name           : 'is_hgb',
													inputValue     : '1',
													uncheckedValue : '0',
													readOnly       : true
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
		};

		return x;
	},
	constructionInformation : function(){
		var x = {
			xtype       : 'panel',
			bodyPadding : 10,
			title       : 'CONSTRUCTION INFORMATION',
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
											fieldLabel : 'Progress',
											anchor     : '-5',
											name       : 'progress_contruction',
											width      : '30%',
											readOnly   : true,
											fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
										},
										{xtype : 'label', text : '%', margin : '0 0 0 5px'},
										{xtype : 'splitter', width : 40},
										{
											xtype      : 'textfield',
											fieldLabel : 'Contractor',
											anchor     : '-5',
											name       : 'contractorname',
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
											xtype        : 'datefield',
											fieldLabel   : 'Serah Terima 1',
											anchor       : '-5',
											name         : 'serahterima1_date',
											width        : '35%',
											readOnly     : true,
											format       : 'd-m-Y',
											altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
											submitFormat : 'Y-m-d H:i:s.u'
										},
										{xtype : 'splitter', width : 20},
										{
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											width     : '100%',
											flex      : 4,
											items     : [
												{
													xtype        : 'datefield',
													fieldLabel   : 'Check List 1',
													anchor       : '-5',
													name         : 'checklist1_date',
													flex         : 2,
													format       : 'd-m-Y',
													altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat : 'Y-m-d H:i:s.u'
												},
												{xtype : 'splitter', width : 40},
												{
													xtype        : 'datefield',
													fieldLabel   : 'Re-Check List 1',
													anchor       : '-5',
													name         : 'recheck1_date',
													flex         : 2,
													format       : 'd-m-Y',
													altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat : 'Y-m-d H:i:s.u'
												}
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
											xtype        : 'datefield',
											fieldLabel   : 'Serah Terima 2',
											anchor       : '-5',
											name         : 'serahterima2_date',
											width        : '35%',
											readOnly     : true,
											format       : 'd-m-Y',
											altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
											submitFormat : 'Y-m-d H:i:s.u'
										},
										{xtype : 'splitter', width : 20},
										{
											layout    : 'hbox',
											bodyStyle : 'border:0px',
											width     : '100%',
											flex      : 4,
											items     : [
												{
													xtype        : 'datefield',
													fieldLabel   : 'Check List 2',
													anchor       : '-5',
													name         : 'checklist2_date',
													flex         : 2,
													format       : 'd-m-Y',
													altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat : 'Y-m-d H:i:s.u'
												},
												{xtype : 'splitter', width : 40},
												{
													xtype        : 'datefield',
													fieldLabel   : 'Re-Check List 2',
													anchor       : '-5',
													name         : 'recheck2_date',
													flex         : 2,
													format       : 'd-m-Y',
													altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
													submitFormat : 'Y-m-d H:i:s.u'
												}
											]
										}
									]
								},
								{
									padding   : '10px 0 0 110px',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype          : 'checkboxfield',
											anchor         : '100%',
											fieldLabel     : '',
											boxLabel       : 'Rubah design',
											name           : 'is_rubah_design',
											inputValue     : '1',
											uncheckedValue : '0',
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
											fieldLabel : 'Serah Terima 1 Note',
											anchor     : '-5',
											name       : 'serahterima1_note',
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
											xtype      : 'xnotefieldEST',
											fieldLabel : 'Serah Terima 2 Note',
											anchor     : '-5',
											name       : 'serahterima2_note',
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
											xtype  : 'complaintdetailgridutility',
											width  : '100%',
											itemId : 'MyDetailGridUtility'
										}
									]
								}
							]
						}
					]
				}
			]
		};

		return x;
	},
	aftersalesInformation : function(){
		var me = this;
		var x = {
			xtype       : 'panel',
			bodyPadding : 10,
			title       : 'AFTER SALES INFORMATION',
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
											fieldLabel : 'No. Berita Acara S.T.',
											labelWidth : '65%',
											anchor     : '-5',
											name       : 'bast_no',
											flex       : 1,
											readOnly   : false,
										},
										{xtype : 'splitter', width : 20},
										{xtype : 'label', text : '', name : 'text_nilaidenda', flex : 1, margin : '0 0 0 10px', style : {color : 'red'}}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype : 'fieldset',
											width : '100%',
											title : 'UPLOAD DOKUMEN',
											items : [
												{
													layout    : 'hbox',
													bodyStyle : 'border:0px',
													items     : [
														{
															xtype  : 'complaintdetailgriddokumen',
															width  : '100%',
															itemId : 'DetailGridDokumen'
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
									items     : [
										{
											xtype            : 'datefield',
											fieldLabel       : 'Serah Terima Date',
											anchor           : '-5',
											name             : 'serahterima_date',
											flex             : 1,
											format           : 'd-m-Y',
											altFormats       : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
											submitFormat     : 'Y-m-d H:i:s.u',
											maskRe           : /[0-9-]/,
											enforceMaxLength : true,
											maxLength        : 10,
											listeners        : {
												blur : function (field) {
													var today = new Date();
													if (!field.isValid()) {
														Ext.Msg.alert('Info', 'Date is invalid!');
														field.setValue(today);
													}
												}
											}
										},
										{xtype : 'splitter', width : 20},
										{
											xtype      : 'xphonenumberfieldEST',
											fieldLabel : 'Nomor yg bisa dihubungi',
											name       : 'phone_no',
											flex       : 1,
											anchor     : '-5',
										}
									]
								},
								{
									padding   : '0px',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype  : 'label',
											text   : '* Purchaseletter Terblokir. Mohon untuk tidak melakukan serah terima ke customer',
											name   : 'is_blokir',
											hidden : true,
											flex   : 1,
											margin : '0px',
											style  : {
												color       : 'red',
												'font-size' : '10px'
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
											fieldLabel : 'Addby Tgl ST',
											anchor     : '-5',
											name       : 'addbyst',
											flex       : 1,
											readOnly   : true,
										},
										{xtype : 'splitter', width : 20},
										{
											xtype            : 'datefield',
											fieldLabel       : 'Tanggal Datang',
											anchor           : '-5',
											name             : 'datang_date',
											flex             : 1,
											format           : 'd-m-Y',
											altFormats       : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
											submitFormat     : 'Y-m-d H:i:s.u',
											maskRe           : /[0-9-]/,
											enforceMaxLength : true,
											maxLength        : 10,
											listeners        : {
												blur: function (field) {
													var today = new Date();
													if (!field.isValid()) {
														Ext.Msg.alert('Info', 'Date is invalid!');
														field.setValue(today);
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
											fieldLabel   : 'Addon Tgl ST',
											anchor       : '-5',
											name         : 'addonst',
											flex         : 1,
											format       : 'd-m-Y',
											altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
											submitFormat : 'Y-m-d',
											readOnly     : true,
										},
										{xtype : 'splitter', width : 10},
										{xtype : 'label', text : '', name : 'text_salesforce', flex : 1, margin : '0 0 0 10px', style : {color: 'red'}}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype      : 'xnotefieldEST',
											fieldLabel : 'Alasan Percepatan ST',
											anchor     : '-5',
											name       : 'reasonst',
											flex       : 1,
											readOnly   : true,
										},
										{xtype : 'splitter', width : 10},
										{xtype : 'label', text : '', name : 'text_salesforce', flex : 1, margin : '0 0 0 10px', style : {color: 'red'}}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype      : 'radiogroup',
											columns    : 3,
											flex       : 1,
											fieldLabel : 'Status Serah Terima',
											name       : 'group_receive_status',
											items      : [
												{
													xtype      : 'radiofield',
													boxLabel   : 'Sendiri',
													name       : 'receive_status',
													inputValue : '1',
													itemId     : 'receive_status_1',
													checked    : true
												},
												{
													xtype      : 'radiofield',
													boxLabel   : 'Sepihak',
													name       : 'receive_status',
													inputValue : '2',
													itemId     : 'receive_status_2'
												},
												{
													xtype      : 'radiofield',
													boxLabel   : 'Surat Kuasa',
													name       : 'receive_status',
													inputValue : '3',
													itemId     : 'receive_status_3'
												}
											]
										}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									width     : '48.5%',
									items     : [
										{
											xtype      : 'radiogroup',
											flex       : 1,
											fieldLabel : 'Status Hunian',
											name       : 'group_hunian_status',
											items      : [
												{
													xtype      : 'radiofield',
													boxLabel   : 'Sudah Dihuni',
													name       : 'hunian_status',
													inputValue : '1',
													itemId     : 'receive_status_1',
													checked    : true
												},
												{
													xtype      : 'radiofield',
													boxLabel   : 'Belum Dihuni',
													name       : 'hunian_status',
													inputValue : '2',
													itemId     : 'receive_status_2'
												}
											]
										}]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									width     : '65%',
									items     : [
										{
											xtype            : 'datefield',
											fieldLabel       : 'Tanggal Pinjam Pakai',
											labelWidth       : '60%',
											anchor           : '-5',
											name             : 'pinjampakai_date',
											flex             : 1,
											format           : 'd-m-Y',
											altFormats       : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
											submitFormat     : 'Y-m-d H:i:s.u',
											maskRe           : /[0-9-]/,
											enforceMaxLength : true,
											maxLength        : 10,
											listeners        : {
												blur: function (field) {
													var today = new Date();
													if (!field.isValid()) {
														Ext.Msg.alert('Info', 'Date is invalid!');
														field.setValue(today);
													}
												}
											}
										},
										{xtype : 'splitter', width : 10},
										{
											boxLabel: 'Pinjam Pakai',
											xtype          : 'checkboxfield',
											name           : 'pinjampakai_status',
											inputValue     : '1',
											uncheckedValue : '0',
											listeners      : {
												change : function () {
													var txt = me.down('[name=pinjampakai_date]');
													if (this.checked) {
														txt.allowBlank = false;
													} else {
														txt.allowBlank = true;
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
											xtype      : 'textfield',
											fieldLabel : 'Status Unit Salesforce SH1',
											labelWidth : '65%',
											anchor     : '-5',
											name       : 'status_salesforce',
											flex       : 1,
											readOnly   : true
										},
										{xtype : 'splitter', width : 20},
										{xtype : 'label', text : '', name : 'text_salesforce', flex : 1, margin : '0 0 0 10px', style : {color : 'red'}}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype      : 'textfield',
											fieldLabel : 'Status Unit Salesforce SH2',
											labelWidth : '65%',
											anchor     : '-5',
											name       : 'status_salesforce_sh2',
											itemId     : 'status_salesforce_sh2',
											flex       : 1,
											readOnly   : true
										},
										{xtype : 'splitter', width : 20},
										{xtype : 'label', text : '', name : 'text_salesforce', flex : 1, margin : '0 0 0 10px', style : {color : 'red'}}
									]
								}, {
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype  : 'box',
											autoEl : {
												tag  : 'a',
												href : '#',
												html : '[ Download Log Salesforce ]'
											},
											listeners : {
												render : function (component) {
													component.getEl().on('click', function (e) {
														var mea = _Apps.getController('Complaint');
														mea.downloadLog("salesforce");
													});
												}
											}
										},
										{xtype : 'splitter', width : 10},
										{
											xtype  : 'box',
											autoEl : {
												tag  : 'a',
												href : '#',
												html : '[ Download Log EMS ]'
											},
											listeners : {
												render : function (component) {
													component.getEl().on('click', function (e) {
														var mea = _Apps.getController('Complaint');
														mea.downloadLog("ems");
													});
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
											xtype      : 'xnotefieldEST',
											fieldLabel : 'Note Salesforce',
											labelWidth : '22%',
											anchor     : '-5',
											name       : 'progress_salesforce',
											flex       : 1,
											readOnly   : true,
											fieldStyle : 'background-color:#FF0000;color: #FFFFFF;'
										}
									]
								},
								{
									padding   : '10px 0 0 0',
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype : 'fieldset',
											width : '100%',
											title : 'DATA SURAT / TELPON KE CUSTOMER',
											items : [
												{
													layout    : 'hbox',
													bodyStyle : 'border:0px',
													items     : [
														{
															xtype  : 'complaintdetailgridsurat',
															width  : '100%',
															itemId : 'MyDetailGridSurat'
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
									items     : [
										{
											xtype : 'fieldset',
											width : '100%',
											title : 'HISTORY RENCANA SERAH TERIMA',
											items : [
												{
													layout    : 'hbox',
													bodyStyle : 'border:0px',
													items     : [
														{
															xtype  : 'complaintdetailgridhistory',
															width  : '100%',
															itemId : 'MyDetailGridHistory'
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
									items     : [
										{
											xtype : 'fieldset',
											width : '100%',
											title : 'GARANSI',
											items : [
												{
													layout    : 'hbox',
													bodyStyle : 'border:0px',
													width     : '100%',
													items     : [
														{
															xtype          : 'garansicombobox',
															fieldLabel     : 'SIPIL',
															cbflag         : 'sipil',
															anchor         : '-5',
															name           : 'guaranteetype_sipil_id',
															flex           : 2,
															forceSelection : true,
															listeners      : {
																beforequery : function (record) {
																	record.query = new RegExp(record.query, 'i');
																	record.forceAll = true;
																}
															}
														},
														{xtype : 'splitter', width : 10},
														{
															xtype        : 'datefield',
															fieldLabel   : '',
															anchor       : '-5',
															name         : 'garansi_sipil_date',
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
													width     : '100%',
													items     : [
														{
															xtype          : 'garansicombobox',
															fieldLabel     : 'BOCOR',
															cbflag         : 'bocor',
															anchor         : '-5',
															name           : 'guaranteetype_bocor_id',
															flex           : 2,
															forceSelection : true,
															listeners      : {
																beforequery : function (record) {
																	record.query = new RegExp(record.query, 'i');
																	record.forceAll = true;
																}
															}
														},
														{xtype : 'splitter', width : 10},
														{
															xtype        : 'datefield',
															fieldLabel   : '',
															anchor       : '-5',
															name         : 'garansi_bocor_date',
															flex         : 1,
															format       : 'd-m-Y',
															altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
															submitFormat : 'Y-m-d H:i:s.u'
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
		};

		return x;
	},
	complaintInformation : function(){
		var x = {
			xtype       : 'panel',
			bodyPadding : 10,
			title       : 'DETAIL COMPLAINT & PERBAIKAN',
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
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									items     : [
										{
											xtype  : 'complaintdetailgrid',
											width  : '100%',
											itemId : 'MyDetailGrid'
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
											fieldLabel : 'Catatan',
											anchor     : '-5',
											name       : 'note',
											flex       : 1,
										}
									]
								},
								{
									xtype      : 'hiddenfield',
									fieldLabel : 'IS SEND EMS',
									anchor     : '-5',
									name       : 'is_sent_ems',
									flex       : 1,
								}
							]
						}
					]
				}
			]
		};

		return x;
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
						action  : 'sync',
						itemId  : 'btnSync',
						padding : 5,
						width   : 95,
						iconCls : 'icon-refresh',
						text    : 'Sync EMS',
						hidden  : true
					}
				]
			}
		];
		return x;
	},
});
