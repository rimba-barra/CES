Ext.define('Cashier.view.bankloan.FormDataDetail', {
	extend: 'Cashier.library.template.view.FormData',
	alias: 'widget.bankloandetailformdata',
	frame: true,
	autoScroll: true,
	anchorSize: 100,
	height: 600,
	bodyBorder: true,
	bodyPadding: true,
	uniquename: '_bankloandetail',
	bodyStyle: 'border-top:none;border-left:none;border-right:none;',
	initComponent: function () {
		var me = this;
        var date = new Date();

        var year = [];
        for (var i = (date.getFullYear()-5); i <= date.getFullYear(); i++) {
            year.push(
                {'tahun_id' : i, 'txt': i}
            );
        }

		Ext.applyIf(me, {
			defaults: {
				labelSeparator: ' ',
				labelClsExtra: 'small',
				fieldStyle: 'margin-bottom:3px',
				anchor: '100%'
			},
			items: [
				{
					xtype: 'hiddenfield',
					id: 'hideparam' + me.uniquename,
					name: 'hideparam',
					value: 'default'
				},
                {
                    xtype: 'hiddenfield',
                    name: 'statedata',
                    id: 'statedata' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'bank_loan_id',
                    id: 'bank_loan_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'bank_loan_detail_id',
                    id: 'bank_loan_detail_id' + me.uniquename,
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'button',
                            action: 'copy',
                            itemId: 'btnCopy',
                            padding: 5,
                            // width: 75,
                            iconCls: 'icon-copy',
                            text: 'Copy dari bulan sebelumnya'
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [
                		{
                            xtype: 'ptcustomcombobox',
                			fieldLabel: 'Company',
                			itemId: 'fdd_projectpt_id_detail' + me.uniquename,
                			id: 'projectpt_id_detail',
                			name: 'projectpt_id_detail',
                			emptyText: 'Company',
                			readOnly: true,
                			allowBlank: false,
                			// enforceMaxLength: true,
                			enableKeyEvents : true,
                			forceSelection: true,
                			rowdata: null,
                            width: '100%',
                            labelWidth: 250,
                		},
                    ]
                },
        		{
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'combobox',
                    		fieldLabel: 'Periode',
                            name: 'bulan_detail',
                            queryMode: 'local',
                            valueField: 'bulan_id',
                            value: (date.getMonth()+1),
                            forceSelection: true,
                            displayField: 'txt',
                            width: '50%',
                            enforceMaxLength: true,
                            store: new Ext.data.JsonStore({
                                fields: ['bulan_id', 'txt'],
                                data: [
                                    {bulan_id: 1, txt: 'Januari'},
                                    {bulan_id: 2, txt: 'Februari'},
                                    {bulan_id: 3, txt: 'Maret'},
                                    {bulan_id: 4, txt: 'April'},
                                    {bulan_id: 5, txt: 'Mei'},
                                    {bulan_id: 6, txt: 'Juni'},
                                    {bulan_id: 7, txt: 'Juli'},
                                    {bulan_id: 8, txt: 'Agustus'},
                                    {bulan_id: 9, txt: 'September'},
                                    {bulan_id: 10, txt: 'Oktober'},
                                    {bulan_id: 11, txt: 'November'},
                                    {bulan_id: 12, txt: 'Desember'},
                                ]
                            }),
                            autoSelect:true,
                            /*listeners: {
                                afterrender: function() {
                                this.setValue(this.value);    
                                }
                            },*/
                            readOnly: true,
                            allowBlank: false,
                            labelWidth: 250,
                        },
                        {
                            xtype: 'splitter',
                            width: '5'
                        },
                        {
                            xtype: 'combobox',
                            name: 'tahun_detail',
                            queryMode: 'local',
                            valueField: 'tahun_id',
                            value: date.getFullYear(),
                            forceSelection: true,
                            displayField: 'txt',
                            width: '45%',
                            enforceMaxLength: true,
                            store: new Ext.data.JsonStore({
                                fields: ['tahun_id', 'txt'],
                                data: year
                            }),
                            autoSelect:true,
                            /*listeners: {
                                afterrender: function() {
                                this.setValue(this.value);    
                                }
                            },*/
                            readOnly: true,
                            allowBlank: false,
                        },
                    ],
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'jenisloanscombobox',
                            fieldLabel: 'Jenis Loans',
                            itemId: 'fdd_jenis_loans' + me.uniquename,
                            name: 'jenis_loans_id',
                            emptyText: 'Jenis Loans',
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            width: '100%',
                            labelWidth: 250,
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'kategoriloanscombobox',
                            fieldLabel: 'Kategori Loans',
                            itemId: 'fdd_kategori_loans' + me.uniquename,
                            name: 'kategori_loans_id',
                            emptyText: 'Kategori Loans',
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            width: '100%',
                            labelWidth: 250,
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'currencyV2combobox',
                            fieldLabel: 'Mata Uang',
                            itemId: 'fdd_currency_id' + me.uniquename,
                            name: 'currency_id',
                            width: 350,
                            emptyText: 'Pilih Mata Uang',
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            width: '100%',
                            labelWidth: 250,
                        },
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'krediturcombobox',
                            fieldLabel: 'Nama Kreditur Induk',
                            itemId: 'fdd_kreditur' + me.uniquename,
                            name: 'kreditur_id',
                            emptyText: 'Nama Kreditur Induk',
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            width: '100%',
                            labelWidth: 250,
                        },
                    ]
                },
                {
                	xtype: 'fieldcontainer',
                	layout: 'hbox',
                	items: [
	                	{
	                		xtype: 'textfield',
                			fieldLabel: 'Kode Sub Acc',
	                		name: 'kode_kreditur',
	                		itemId: 'fdd_kode_kreditur' + me.uniquename,
	                		id: 'kode_kreditur' + me.uniquename,
	                		readOnly: false,
	                		allowBlank: true,
	                		enforceMaxLength: true,
	                		width: '100%',
	                		emptyText: 'Kode Sub Acc',
                            labelWidth: 250,
	                	}
                	]
                },
                {
                	xtype: 'fieldcontainer',
                	layout: 'hbox',
                	items: [
	                	{
	                		xtype: 'textfield',
                			fieldLabel: 'Nama Kreditur',
	                		name: 'nama_kreditur',
	                		itemId: 'fdd_nama_kreditur' + me.uniquename,
	                		id: 'nama_kreditur' + me.uniquename,
	                		readOnly: false,
	                		allowBlank: true,
	                		enforceMaxLength: true,
	                		width: '100%',
	                		emptyText: 'Nama Kreditur',
                            labelWidth: 250,
	                	}
                	]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'jenispinjamancombobox',
                            fieldLabel: 'Jenis Kredit',
                            itemId: 'fdd_jenis_pinjaman' + me.uniquename,
                            name: 'jenis_pinjaman_id',
                            emptyText: 'Jenis Kredit',
                            readOnly: false,
                            allowBlank: false,
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            width: '100%',
                            labelWidth: 250,
                        },
                    ]
                },
                {
                	xtype: 'fieldcontainer',
                	layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                	items: [
	                	{
	                		xtype: 'xmoneyfield',
                            anchor: '50%',
	                		itemId: 'fdd_saldo_hutang' + me.uniquename,
	                		id: 'saldo_hutang' + me.uniquename,
	                		name: 'saldo_hutang',
                			fieldLabel: 'Saldo Hutang',
	                		emptyText: 'Saldo Hutang',
                            value: 0,
	                		width: '100%',
                            hideTrigger: true,
                            keyNavEnabled: false,
	                		enforceMaxLength: true,
                            mouseWheelEnabled: false,
	                		readOnly: false,
	                		allowBlank: false,
                            enableKeyEvents: true,
                            rowdata: null,
                            labelWidth: 250,
                            maskRe: /[0-9\-\.]/,
	                	}
                	]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'xmoneyfield',
                            anchor: '50%',
                            itemId: 'fdd_saldo_beban_bunga_pl' + me.uniquename,
                            id: 'saldo_beban_bunga_pl' + me.uniquename,
                            name: 'saldo_beban_bunga_pl',
                            fieldLabel: 'Saldo Beban Bunga (PL)',
                            emptyText: 'Saldo Beban Bunga (PL)',
                            value: 0,
                            width: '100%',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            enforceMaxLength: true,
                            mouseWheelEnabled: false,
                            readOnly: false,
                            allowBlank: false,
                            enableKeyEvents: true,
                            rowdata: null,
                            labelWidth: 250,
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'xmoneyfield',
                            anchor: '50%',
                            itemId: 'fdd_saldo_beban_bunga_kapitalisasi' + me.uniquename,
                            id: 'saldo_beban_bunga_kapitalisasi' + me.uniquename,
                            name: 'saldo_beban_bunga_kapitalisasi',
                            fieldLabel: 'Saldo Beban Bunga (Kapitalisasi)',
                            emptyText: 'Saldo Beban Bunga (Kapitalisasi)',
                            value: 0,
                            width: '100%',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            enforceMaxLength: true,
                            mouseWheelEnabled: false,
                            readOnly: false,
                            // allowBlank: false,
                            enableKeyEvents: true,
                            rowdata: null,
                            labelWidth: 250,
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'xmoneyfield',
                            anchor: '50%',
                            itemId: 'fdd_saldo_beban_bunga_bank_total' + me.uniquename,
                            id: 'saldo_beban_bunga_bank_total' + me.uniquename,
                            name: 'saldo_beban_bunga_bank_total',
                            fieldLabel: 'Total Saldo Beban Bunga',
                            emptyText: 'Total Saldo Beban Bunga',
                            value: 0,
                            width: '100%',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            enforceMaxLength: true,
                            mouseWheelEnabled: false,
                            readOnly: true,
                            allowBlank: false,
                            enableKeyEvents: true,
                            rowdata: null,
                            labelWidth: 250,
                            fieldStyle: 'background-color:#eee;background-image: none;text-align:right;'
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                    items: [
                        {
                            xtype: 'xmoneyfield',
                            anchor: '50%',
                            itemId: 'fdd_saldo_beban_bunga' + me.uniquename,
                            id: 'saldo_beban_bunga' + me.uniquename,
                            name: 'saldo_beban_bunga',
                            fieldLabel: 'Saldo Beban Bunga (Total Seluruh PT)',
                            emptyText: 'Saldo Beban Bunga (Total Seluruh PT)',
                            value: 0,
                            width: '100%',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            enforceMaxLength: true,
                            mouseWheelEnabled: false,
                            readOnly: true,
                            allowBlank: false,
                            enableKeyEvents: true,
                            rowdata: null,
                            labelWidth: 250,
                        }
                    ]
                },
                {
                	xtype: 'fieldcontainer',
                	layout: 'hbox',
                	items: [
		                {
		                    xtype: 'kategoribungacombobox',
		                    fieldLabel: 'Kategori Bunga',
		                    itemId: 'fdd_kategori_bunga' + me.uniquename,
		                    name: 'kategori_bunga_id',
		                    emptyText: '',
		                    readOnly: false,
		                    allowBlank: false,
		                    enforceMaxLength: true,
		                    enableKeyEvents: true,
		                    rowdata: null,
		                    emptyText: 'Kategori Bunga',
                            labelWidth: 250,
		                },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
		                {
		                    xtype: 'benchmarkingcombobox',
		                    fieldLabel: '',
		                    itemId: 'fdd_benchmarking' + me.uniquename,
		                    name: 'benchmarking_id',
		                    emptyText: '',
		                    readOnly: false,
		                    enforceMaxLength: true,
		                    enableKeyEvents: true,
		                    rowdata: null,
		                    hidden: true,
		                    emptyText: '-'
		                },
                        {
                            xtype: 'label',
                            id: 'label_plus',
                            itemId: 'label_plus',
                            text: '+',
                            margin: '0 0 0 5',
                            hidden: true,
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
	                	{
	                		xtype: 'numberfield',
	                		name: 'persentase',
	                		itemId: 'fdd_persentase' + me.uniquename,
	                		id: 'persentase' + me.uniquename,
	                		readOnly: false,
	                		enforceMaxLength: true,
	                		emptyText: '-',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                			hidden: true,
                			value: 0
	                	},
                        {
                            xtype: 'label',
                            name: 'persentase_label',
                            forId: 'persentase' + me.uniquename,
                            text: '%',
                            margin: '0 0 0 5',
                            hidden: true,
                        },
                	]
                },
                {
                	xtype: 'fieldcontainer',
                	layout: 'hbox',
                	items: [
	                	{
	                		xtype: 'numberfield',
	                		fieldLabel: 'Tingkat Bunga',
	                		name: 'tingkat_biaya_bunga',
	                		itemId: 'fdd_tingkat_biaya_bunga' + me.uniquename,
	                		id: 'tingkat_biaya_bunga' + me.uniquename,
	                		readOnly: false,
	                		allowBlank: false,
	                		enforceMaxLength: true,
	                		emptyText: '',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            labelWidth: 250,
	                	},
                        {
                            xtype: 'label',
                            text: '%',
                            margin: '0 0 0 5',
                        },
                        {
                            xtype: 'splitter',
                            width: '6'
                        },
	                	{
	                		xtype: 'checkboxfield',
                            fieldLabel: '',
                            name: 'is_lunas',
                            itemId: 'fdd_is_lunas' + me.uniquename,
                            id: 'is_lunas' + me.uniquename,
                            boxLabel: 'Lunas',
                            boxLabelCls: 'x-form-cb-label small',
                            inputValue: '1',
                            uncheckedValue: '0',
                            checked: false
                        },
                	]
                },
                {
                	xtype: 'fieldcontainer',
                	layout: 'hbox',
                	items: [
	                	{
	                		xtype: 'numberfield',
	                		fieldLabel: 'Tenor',
	                		name: 'tenor',
	                		itemId: 'fdd_tenor' + me.uniquename,
	                		id: 'tenor' + me.uniquename,
	                		readOnly: false,
	                		allowBlank: false,
	                		enforceMaxLength: true,
                            width: '50%',
	                		emptyText: '',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            labelWidth: 250,
	                	},
                        {
                            xtype: 'splitter',
                            width: '5'
                        },
                        {
                            xtype: 'combobox',
                            name: 'tenor_type',
                            fieldLabel: '',
                            queryMode: 'local',
                            valueField: 'tenor_type',
                            value: 'Tahun',
                            forceSelection: true,
                            displayField: 'txt',
                            width: '45%',
                            enforceMaxLength: true,
                            store: new Ext.data.JsonStore({
                                fields: ['tenor_type', 'txt'],
                                data: [
                                    {tenor_type: 'Tahun', txt: 'Tahun'},
                                    {tenor_type: 'Bulan', txt: 'Bulan'},
                                ]
                            }),
                            autoSelect:true,
                            readOnly: false,
                            allowBlank: false,
                            listeners: {
                                afterrender: function() {
                                	this.setValue(this.value);    
                                }
                            },
                        },
                	]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Start Date',
                            itemId: 'fdd_startdate' + me.uniquename,
                            id: 'startdate' + me.uniquename,
                            name: 'startdate',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: '100%',
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            allowBlank: false,
                            labelWidth: 250,
                        }
                    ]
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'datefield',
                            fieldLabel: 'Due Date',
                            itemId: 'fdd_duedate' + me.uniquename,
                            id: 'duedate' + me.uniquename,
                            name: 'duedate',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            width: '100%',
                            enforceMaxLength: true,
                            enableKeyEvents: true,
                            rowdata: null,
                            allowBlank: false,
                            labelWidth: 250,
                        }
                    ]
                },
                {
                    xtype: 'label',
                    text: 'Jadwal Angsuran Jatuh Tempo dalam',
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin: '0 0 0 70',
                    items: [
                        {
                            xtype: 'xmoneyfield',
                            anchor: '50%',
                            itemId: 'fdd_jt_1_tahun' + me.uniquename,
                            id: 'jt_1_tahun' + me.uniquename,
                            name: 'jt_1_tahun',
                            fieldLabel: 'Tahun ke-1',
                            emptyText: 'Tahun ke-1',
                            value: 0,
                            width: '40%',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: true,
                            readOnly: false,
                            allowBlank: false,
                            enableKeyEvents: true,
                            rowdata: null,
                            maskRe: /[0-9\-\.]/,
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'xmoneyfield',
                            anchor: '50%',
                            itemId: 'fdd_jt_6_tahun' + me.uniquename,
                            id: 'jt_6_tahun' + me.uniquename,
                            name: 'jt_6_tahun',
                            fieldLabel: 'Tahun ke-6',
                            emptyText: 'Tahun ke-6',
                            value: 0,
                            width: '40%',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: true,
                            readOnly: false,
                            allowBlank: false,
                            enableKeyEvents: true,
                            rowdata: null,
                            maskRe: /[0-9\-\.]/,
                        },
                    ],
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin: '0 0 0 70',
                    items: [
                        {
                            xtype: 'xmoneyfield',
                            anchor: '50%',
                            itemId: 'fdd_jt_2_tahun' + me.uniquename,
                            id: 'jt_2_tahun' + me.uniquename,
                            name: 'jt_2_tahun',
                            fieldLabel: 'Tahun ke-2',
                            emptyText: 'Tahun ke-2',
                            value: 0,
                            width: '40%',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: true,
                            readOnly: false,
                            allowBlank: false,
                            enableKeyEvents: true,
                            rowdata: null,
                            maskRe: /[0-9\-\.]/,
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'xmoneyfield',
                            anchor: '50%',
                            itemId: 'fdd_jt_7_tahun' + me.uniquename,
                            id: 'jt_7_tahun' + me.uniquename,
                            name: 'jt_7_tahun',
                            fieldLabel: 'Tahun ke-7',
                            emptyText: 'Tahun ke-7',
                            value: 0,
                            width: '40%',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: true,
                            readOnly: false,
                            allowBlank: false,
                            enableKeyEvents: true,
                            rowdata: null,
                            maskRe: /[0-9\-\.]/,
                        },
                    ],
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin: '0 0 0 70',
                    items: [
                        {
                            xtype: 'xmoneyfield',
                            anchor: '50%',
                            itemId: 'fdd_jt_3_tahun' + me.uniquename,
                            id: 'jt_3_tahun' + me.uniquename,
                            name: 'jt_3_tahun',
                            fieldLabel: 'Tahun ke-3',
                            emptyText: 'Tahun ke-3',
                            value: 0,
                            width: '40%',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: true,
                            readOnly: false,
                            allowBlank: false,
                            enableKeyEvents: true,
                            rowdata: null,
                            maskRe: /[0-9\-\.]/,
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'xmoneyfield',
                            anchor: '50%',
                            itemId: 'fdd_jt_8_tahun' + me.uniquename,
                            id: 'jt_8_tahun' + me.uniquename,
                            name: 'jt_8_tahun',
                            fieldLabel: 'Tahun ke-8',
                            emptyText: 'Tahun ke-8',
                            value: 0,
                            width: '40%',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: true,
                            readOnly: false,
                            allowBlank: false,
                            enableKeyEvents: true,
                            rowdata: null,
                            maskRe: /[0-9\-\.]/,
                        },
                    ],
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin: '0 0 0 70',
                    items: [
                        {
                            xtype: 'xmoneyfield',
                            anchor: '50%',
                            itemId: 'fdd_jt_4_tahun' + me.uniquename,
                            id: 'jt_4_tahun' + me.uniquename,
                            name: 'jt_4_tahun',
                            fieldLabel: 'Tahun ke-4',
                            emptyText: 'Tahun ke-4',
                            value: 0,
                            width: '40%',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: true,
                            readOnly: false,
                            allowBlank: false,
                            enableKeyEvents: true,
                            rowdata: null,
                            maskRe: /[0-9\-\.]/,
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'xmoneyfield',
                            anchor: '50%',
                            itemId: 'fdd_jt_9_tahun' + me.uniquename,
                            id: 'jt_9_tahun' + me.uniquename,
                            name: 'jt_9_tahun',
                            fieldLabel: 'Tahun ke-9',
                            emptyText: 'Tahun ke-9',
                            value: 0,
                            width: '40%',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: true,
                            readOnly: false,
                            allowBlank: false,
                            enableKeyEvents: true,
                            rowdata: null,
                            maskRe: /[0-9\-\.]/,
                        },
                    ],
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin: '0 0 0 70',
                    items: [
                        {
                            xtype: 'xmoneyfield',
                            anchor: '50%',
                            itemId: 'fdd_jt_5_tahun' + me.uniquename,
                            id: 'jt_5_tahun' + me.uniquename,
                            name: 'jt_5_tahun',
                            fieldLabel: 'Tahun ke-5',
                            emptyText: 'Tahun ke-5',
                            value: 0,
                            width: '40%',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: true,
                            readOnly: false,
                            allowBlank: false,
                            enableKeyEvents: true,
                            rowdata: null,
                            maskRe: /[0-9\-\.]/,
                        },
                        {
                            xtype: 'splitter',
                            width: '10'
                        },
                        {
                            xtype: 'xmoneyfield',
                            anchor: '50%',
                            itemId: 'fdd_jt_10_tahun' + me.uniquename,
                            id: 'jt_10_tahun' + me.uniquename,
                            name: 'jt_10_tahun',
                            fieldLabel: 'Tahun ke-10',
                            emptyText: 'Tahun ke-10',
                            value: 0,
                            width: '40%',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: true,
                            readOnly: false,
                            allowBlank: false,
                            enableKeyEvents: true,
                            rowdata: null,
                            maskRe: /[0-9\-\.]/,
                        },
                    ],
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    margin: '0 0 10 70',
                    items: [
                        {
                            xtype: 'xmoneyfield',
                            anchor: '50%',
                            itemId: 'fdd_jt_total' + me.uniquename,
                            id: 'jt_total' + me.uniquename,
                            name: 'jt_total',
                            fieldLabel: 'Total',
                            emptyText: 'auto calculate dari Tahun ke-1 s/d Tahun ke-10',
                            value: 0,
                            width: '81.5%',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
                            enforceMaxLength: true,
                            readOnly: true,
                            allowBlank: false,
                            enableKeyEvents: true,
                            rowdata: null,
                            fieldStyle: 'background-color:#eee;background-image: none;text-align:right;',
                            maskRe: /[0-9\-\.]/,
                        },
                    ],
                },
                {
                	xtype: 'fieldcontainer',
                	layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                	items: [
	                	{
	                		xtype: 'xmoneyfield',
                            anchor: '50%',
	                		itemId: 'fdd_saldo_kas_setara_kas' + me.uniquename,
	                		id: 'saldo_kas_setara_kas' + me.uniquename,
	                		name: 'saldo_kas_setara_kas',
                			fieldLabel: 'Saldo Kas Setara Kas (Total Seluruh PT)',
	                		emptyText: 'Saldo Kas Setara Kas',
                            value: 0,
	                		width: '100%',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
	                		enforceMaxLength: true,
	                		readOnly: false,
	                		allowBlank: false,
                            enableKeyEvents: true,
                            rowdata: null,
                            labelWidth: 250,
	                	}
                	]
                },
                {
                	xtype: 'fieldcontainer',
                	layout: 'hbox',
                    align: 'right',
                    bodyBorder: false,
                    defaults: {
                        layout: 'fit'
                    },
                	items: [
	                	{
	                		xtype: 'xmoneyfield',
                            anchor: '50%',
	                		itemId: 'fdd_saldo_restricted_fund' + me.uniquename,
	                		id: 'saldo_restricted_fund' + me.uniquename,
	                		name: 'saldo_restricted_fund',
                			fieldLabel: 'Saldo Restricted Fund (Total Seluruh PT)',
	                		emptyText: 'Saldo Restricted Fund',
                            value: 0,
	                		width: '100%',
                            hideTrigger: true,
                            keyNavEnabled: false,
                            mouseWheelEnabled: false,
	                		enforceMaxLength: true,
	                		readOnly: false,
	                		allowBlank: false,
                            enableKeyEvents: true,
                            rowdata: null,
                            labelWidth: 250,
	                	}
                	]
                },
			],
			dockedItems: me.generateDockedItems()
		});
		
		me.callParent(arguments);
	},
	generateDockedItems: function () {
		var x = [
		{
			xtype: 'toolbar',
			dock: 'bottom',
			ui: 'footer',
			padding: '0 0 0 0',
			layout: {
				padding: 6,
				type: 'hbox',
			},
			items: [                           
			{
				xtype: 'fieldcontainer',
				layout: 'hbox',
				align: 'right',
				bodyBorder: false,
				defaults: {
					layout: 'fit'
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
					xtype: 'splitter',
					width: '10'
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
				]
			},
			]
		}
		];
		return x;
		
	}
});