Ext.define('Erems.view.verificationapproval.FormData', {
	extend      : 'Erems.library.template.view.FormData',
	alias       : 'widget.verificationapprovalformdata',
	requires    : [],
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
				{xtype: 'hiddenfield', name: 'verification_approval_id'},
				{xtype: 'hiddenfield', name: 'purchaseletter_id'},
				{xtype: 'hiddenfield', name: 'request_by_1_name'},
				{xtype: 'hiddenfield', name: 'request_by_2_name'},
				{xtype: 'hiddenfield', name: 'request_by_2_position'},
				{xtype: 'hiddenfield', name: 'approved_by_name'},
				{xtype: 'hiddenfield', name: 'verification_code'},
				me.form_unit_information(),
				me.form_purchaseletter_information(),
				me.form_verification_approval(),
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
								defaultMargins : {top: 0, right: 0, bottom: 10, left: 0}
							},
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
									items     : [{
											xtype      : 'textfield',
											fieldLabel : 'PT',
											anchor     : '-5',
											name       : 'unit_pt_name',
											flex       : 1,
											readOnly   : true,
										}]
								},
								{
									layout    : 'hbox',
									bodyStyle : 'border:0px',
									width     : '100%',
									items     : [{
											xtype      : 'combobox',
											fieldLabel : 'Kavling / Unit No. ',
											anchor     : '-5',
											name       : 'unit_unit_number',
											flex       : 6,
											readOnly   : true,
										}, 
										{
											xtype : 'splitter', 
											width : 5,
										}, {
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
							xtype  : 'panel', 
							flex   : 7,
							layout : {
								type           : 'vbox',
								defaultMargins : {top : 0, right : 0, bottom : 10, left : 0}
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
										}, 
										{
											xtype : 'splitter', 
											width : 20,
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
										}, 
										{
											xtype : 'splitter', 
											width : 20
										},
										{
											xtype      : 'textfield',
											fieldLabel : 'KTP Number',
											anchor     : '-5',
											name       : 'customer_ktp',
											flex       : 1,
											readOnly   : true,
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
										}, 
										{
											xtype : 'splitter', 
											width : 20
										},
										{
											xtype      : 'textfield',
											fieldLabel : 'Email',
											anchor     : '-5',
											name       : 'customer_email',
											flex       : 1,
											readOnly   : true,
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
										}, 
										{
											xtype : 'splitter', 
											width : 20
										},
										{
											xtype      : 'xphonenumberfieldEST',
											fieldLabel : 'Phone',
											anchor     : '-5',
											name       : 'customer_phone',
											flex       : 1,
											readOnly   : true,
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
											fieldLabel : 'Mobile Phone',
											anchor     : '-5',
											name       : 'customer_mobile_phone',
											flex       : 1,
											readOnly   : true,
										}, 
										{
											xtype : 'splitter', 
											width : 20
										},
										{
											xtype      : 'xphonenumberfieldEST',
											fieldLabel : 'Office Phone',
											anchor     : '-5',
											name       : 'customer_office_phone',
											flex       : 1,
											readOnly   : true,
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
											name       : 'purchaseletter_pricetype',
											flex       : 1,
											readOnly   : true,
										}, 
										{
											xtype : 'splitter', 
											width : 20
										},
										{
											xtype      : 'textfield',
											fieldLabel : 'Salesman',
											anchor     : '-5',
											name       : 'purchaseletter_salesman',
											flex       : 1,
											readOnly   : true,
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
											name       : 'purchaseletter_harga_netto',
											flex       : 1,
											readOnly   : true,
											fieldStyle : 'background:none;background-color:#EBEBE4;'
										},
										{
												xtype : 'splitter', 
												width : 20
										},
										{
											xtype      : 'xmoneyfield',
											fieldLabel : 'Harga Total Jual',
											anchor     : '-5',
											name       : 'purchaseletter_harga_total_jual',
											flex       : 1,
											readOnly   : true,
											fieldStyle : 'background:none;background-color:#EBEBE4;'
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
										}, 
										{
											xtype : 'splitter', 
											width : 20
										},
										{
											xtype      : 'textfield',
											fieldLabel : 'Bank',
											anchor     : '-5',
											name       : 'bank_bank_name',
											flex       : 1,
											readOnly   : true,
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
											flex       : 1,
											readOnly   : true,
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
	form_verification_approval : function(){
        var cbf = new Erems.template.ComboBoxFields();

        var obj = {
            xtype       : 'panel', 
            bodyPadding : 10, 
            title       : 'Verification Approval', 
            collapsible : true,
            items       : [
                {
                    xtype: 'container',
                    layout   : 'hbox',
                    margin   : '10px 0 0 0',
                    defaults : {
                        xtype  : 'container',
                        layout : 'vbox',
                        flex   : 1,
                        width  : '100%'
                    },
                    items     : [
                        {
                            margin   : '0 20px 0 0',
                            defaults : {
                                xtype  : 'container',
                                layout : 'hbox',
                                width  : '100%',
                                margin : '0 0 10px 0'
                            },
                            items: [
                                {
                                    defaults: {
                                        xtype : 'textfield',
                                        width : '100%'
                                    },
                                    items: [
                                        {
											xtype        : 'datefield',
											name         : 'verification_approval_date',
											fieldLabel   : 'Tanggal Pengajuan',
											labelWidth   : 120,
											flex         : 1,
											allowBlank   : false,
											editable     : false,
											value        : new Date(),
											// maskRe    : /[0-9\-]/,
											format       : 'd-m-Y',
											altFormats   : 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
											submitFormat : 'Y-m-d H:i:s.u',
											width        : 50,
                                        },
                                        {
											xtype : 'label',
											text  : '',
											width : 100
                                        },
                                        { xtype: 'splitter', width: 20 },
                                        {
											name       : 'verification_approval_no',
											fieldLabel : 'Nomor',
											labelWidth : 50,
											readOnly   : true,
											flex       : 1,
											width      : 250,
                                        }
                                    ]
                                },
                                {
                                    defaults: {
                                        xtype : 'combobox',
                                        width : '100%'
                                    },
                                    items: [
                                        {
											name         : 'request_by_1',
											fieldLabel   : 'Diajukan Oleh 1',
											displayField : 'request_by_1_name',
											valueField   : 'request_by_1',
											allowBlank   : false,
											labelWidth   : 120,
											flex         : 1,
											width        : 100,
											queryMode    : 'local',
											renderTo     : Ext.getBody(),
											listeners    : {
										        beforequery: function (record) {
										            record.query = new RegExp(record.query, 'i');
										            record.forceAll = true;
										        }
										    }
                                        },
                                        { xtype: 'splitter', width: 20 },
                                        {
											xtype : 'label',
											text  : '',
											width : 330
                                        }
                                    ]
                                },

                                {
                                    defaults: {
                                        xtype : 'combobox',
                                        width : '100%'
                                    },
                                    items: [
	                                    {
                                            name         : 'request_by_2',
                                            fieldLabel   : 'Diajukan Oleh 2',
                                            displayField : 'request_by_2_name',
                                            valueField   : 'request_by_2',
											allowBlank   : false,
                                            labelWidth   : 120,
                                            flex         : 1,
                                            width        : 150,
											queryMode    : 'local',
											renderTo     : Ext.getBody(),
											listeners    : {
										        beforequery: function (record) {
										            record.query = new RegExp(record.query, 'i');
										            record.forceAll = true;
										        }
										    }
	                                    },
                                        { xtype: 'splitter', width: 20 },
                                        {
											xtype : 'label',
											text  : '',
											width : 330
                                        }
                                    ]
                                },
                                {
                                    defaults: {
                                        xtype : 'combobox',
                                        width : '100%'
                                    },
                                    items: [
	                                    {
                                            name         : 'approved_by',
                                            fieldLabel   : 'Disetujui Oleh',
                                            displayField : 'approved_by_name',
                                            valueField   : 'approved_by',
											allowBlank   : false,
                                            labelWidth   : 120,
                                            flex         : 1,
											queryMode    : 'local',
											renderTo     : Ext.getBody(),
											listeners    : {
										        beforequery: function (record) {
										            record.query = new RegExp(record.query, 'i');
										            record.forceAll = true;
										        }
										    }
	                                    },
                                        { xtype: 'splitter', width: 20 },
                                        {
											xtype : 'label',
											text  : '',
											width : 330
                                        }
                                    ]
                                },
                                {
                                    defaults: {
                                        xtype : 'combobox',
                                        width : '100%'
                                    },
                                    items: [
	                                    {
                                            name         : 'verification_id',
                                            fieldLabel   : 'Jenis Persetujuan',
                                            displayField : cbf.verification.d,
                                            valueField   : cbf.verification.v,
											allowBlank   : false,
                                            labelWidth   : 120,
                                            flex         : 1,
											queryMode    : 'local',
											renderTo     : Ext.getBody(),
											listeners    : {
										        beforequery: function (record) {
										            record.query = new RegExp(record.query, 'i');
										            record.forceAll = true;
										        }
										    }
	                                    },
                                        { xtype: 'splitter', width: 20 },
                                        {
											xtype : 'label',
											text  : '',
											width : 300
                                        }
                                    ]
                                },
                                {
                                    defaults: {
                                        xtype : 'combobox',
                                        width : '100%'
                                    },
                                    items: [
	                                    {
                                            name         : 'verification_detail_id',
                                            fieldLabel   : 'Judul Persetujuan',
                                            displayField : cbf.verification_detail.d,
                                            valueField   : cbf.verification_detail.v,
											allowBlank   : false,
                                            labelWidth   : 120,
                                            flex         : 1,
											queryMode    : 'local',
											renderTo     : Ext.getBody(),
											listeners    : {
										        beforequery: function (record) {
										            record.query = new RegExp(record.query, 'i');
										            record.forceAll = true;
										        }
										    }
	                                    },
                                        { xtype: 'splitter', width: 20 },
                                        {
											xtype : 'label',
											text  : '',
											width : 300
                                        }
                                    ]
                                },
                                {
                                    defaults: {
                                        width : '100%'
                                    },
                                    items: [
	                                    {
											xtype : 'label',
											text  : 'Ketentuan (2)',
											width : 300,
											flex  : 1
	                                    },
                                        { xtype: 'splitter', width: 20 },
                                        {
											xtype : 'label',
											text  : 'Alasan (1)',
											width : 300,
											flex  : 1
                                        }
                                    ]
                                },
                                {
                                    defaults: {
                                    	xtype : 'xnotefieldEST',
                                        width : '100%'
                                    },
                                    items: [
	                                    {
                                            fieldLabel : '',
                                            name       : 'ketentuan',
                                            flex       : 1,
                                            height     : 500
	                                    },
                                        { xtype: 'splitter', width: 3 },
                                        {
											fieldLabel : '',
											name       : 'alasan',
											flex       : 1,
											height     : 500
                                        }
                                    ]
                                },
                                {
                                    defaults: {
                                        width : '100%'
                                    },
                                    items: [
	                                    {
											xtype : 'label',
											text  : '1) Diisi detail perlakuan khususnya apa dan sampai ke nilai2/jadwal perubahannya yang disetujui project.',
											flex  : 1
	                                    },
                                    ]
                                },
                                {
                                    defaults: {
                                        width : '100%'
                                    },
                                    items: [
	                                    {
											xtype : 'label',
											text  : '2) Diisi ketentuan umumnya apa, ditambahkan jadwal pembayaran sebelumnya (atau bisa dibuat lampiran).',
											flex  : 1
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
});