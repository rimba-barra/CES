Ext.define('Cashier.view.bankloan.Griddetail', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.bankloangriddetail',
    store: 'Bankloandetail',
    bindPrefixName: 'BankloanDetail',
    itemId: 'Bankloandetail',
    title: 'Detail Bank Loan',
    newButtonLabel: 'Add New',
    height: 500,
    initComponent: function () {
    	var me = this;
    	Ext.applyIf(me, {
    		contextMenu: me.generateContextMenu(),
    		dockedItems: me.generateDockedItems(),
    		viewConfig: {

    		},
    		selModel: Ext.create('Ext.selection.CheckboxModel', {

    		}),
    		features: [
    			{
    				ftype: 'summary',
    			}
    		],
    		columns: [
    			{
    				xtype: 'rownumberer',
                    width: 35,
    			},
    			// me.generateActionColumn(),
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_loans_name',
                    width: 70,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'loans_name',
                    hideable: false,
                    text: 'Jenis Loan',
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kategori_loans_name',
                    width: 100,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'kategori_loans_name',
                    hideable: false,
                    text: 'Kategori Loan',
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_currency_name',
                    width: 70,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'currency_name',
                    hideable: false,
                    text: 'Mata Uang',
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kode_kreditur',
                    width: 70,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'kode_kreditur',
                    hideable: false,
                    text: 'Kode Sub Acc',
                },
    			{
    				xtype: 'gridcolumn',
    				itemId: 'colms_nama_kreditur',
    				width: 100,
    				titleAlign: 'left',
    				align: 'left',
    				dataIndex: 'nama_kreditur',
    				hideable: false,
    				text: 'Nama Kreditur'
    			},
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_jenis_pinjaman_name',
                    width: 70,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'jenis_pinjaman_name',
                    hideable: false,
                    text: 'Jenis Kredit',
                },
    			{
    				xtype: 'gridcolumn',
    				itemId: 'colms_saldo_hutang',
    				width: 120,
    				titleAlign: 'right',
    				align: 'right',
    				dataIndex: 'saldo_hutang',
    				hideable: false,
    				text: 'Saldo Hutang',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
    			},
    			{
    				xtype: 'gridcolumn',
    				itemId: 'colms_saldo_beban_bunga',
    				width: 120,
    				titleAlign: 'right',
    				align: 'right',
    				dataIndex: 'saldo_beban_bunga',
    				hideable: false,
    				text: 'Saldo Beban Bunga',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    hidden: true,
    			},
    			{
    				xtype: 'gridcolumn',
    				itemId: 'colms_kategori_bunga',
    				width: 100,
    				titleAlign: 'left',
    				align: 'left',
    				dataIndex: 'kategori_bunga_name',
    				hideable: false,
    				text: 'Kategori Bunga'
    			},
    			{
    				xtype: 'gridcolumn',
    				itemId: 'colms_tingkat_biaya_bunga',
    				width: 100,
    				titleAlign: 'left',
    				align: 'left',
    				dataIndex: 'tingkat_biaya_bunga_name',
    				hideable: false,
    				text: 'Tingkat Bunga'
    			},
    			{
    				xtype: 'gridcolumn',
    				itemId: 'colms_tenor',
    				width: 80,
    				titleAlign: 'left',
    				align: 'left',
    				dataIndex: 'tenor_string',
    				hideable: false,
    				text: 'Tenor'
    			},
    			{
    				xtype: 'gridcolumn',
    				itemId: 'colms_duedate',
    				width: 100,
    				titleAlign: 'left',
    				align: 'left',
    				dataIndex: 'duedate',
    				hideable: false,
    				text: 'Duedate',
                    renderer: Ext.util.Format.dateRenderer('M Y')
    			},
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_jt_1_tahun',
                    width: 120,
                    titleAlign: 'right',
                    align: 'right',
                    dataIndex: 'jt_1_tahun',
                    hideable: false,
                    text: 'Tahun ke-1',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_jt_2_tahun',
                    width: 120,
                    titleAlign: 'right',
                    align: 'right',
                    dataIndex: 'jt_2_tahun',
                    hideable: false,
                    text: 'Tahun ke-2',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_jt_3_tahun',
                    width: 120,
                    titleAlign: 'right',
                    align: 'right',
                    dataIndex: 'jt_3_tahun',
                    hideable: false,
                    text: 'Tahun ke-3',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_jt_4_tahun',
                    width: 120,
                    titleAlign: 'right',
                    align: 'right',
                    dataIndex: 'jt_4_tahun',
                    hideable: false,
                    text: 'Tahun ke-4',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_jt_5_tahun',
                    width: 120,
                    titleAlign: 'right',
                    align: 'right',
                    dataIndex: 'jt_5_tahun',
                    hideable: false,
                    text: 'Tahun ke-5',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_jt_6_tahun',
                    width: 120,
                    titleAlign: 'right',
                    align: 'right',
                    dataIndex: 'jt_6_tahun',
                    hideable: false,
                    text: 'Tahun ke-6',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_jt_7_tahun',
                    width: 120,
                    titleAlign: 'right',
                    align: 'right',
                    dataIndex: 'jt_7_tahun',
                    hideable: false,
                    text: 'Tahun ke-7',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_jt_8_tahun',
                    width: 120,
                    titleAlign: 'right',
                    align: 'right',
                    dataIndex: 'jt_8_tahun',
                    hideable: false,
                    text: 'Tahun ke-8',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_jt_9_tahun',
                    width: 120,
                    titleAlign: 'right',
                    align: 'right',
                    dataIndex: 'jt_9_tahun',
                    hideable: false,
                    text: 'Tahun ke-9',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_jt_10_tahun',
                    width: 120,
                    titleAlign: 'right',
                    align: 'right',
                    dataIndex: 'jt_10_tahun',
                    hideable: false,
                    text: 'Tahun ke-10',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_jt_total',
                    width: 120,
                    titleAlign: 'right',
                    align: 'right',
                    dataIndex: 'jt_total',
                    hideable: false,
                    text: 'Total',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
    			{
    				xtype: 'gridcolumn',
    				itemId: 'colms_saldo_kas_setara_kas',
    				width: 120,
    				titleAlign: 'right',
    				align: 'right',
    				dataIndex: 'saldo_kas_setara_kas',
    				hideable: false,
    				text: 'Saldo Kas Setara Kas',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    hidden: true,
    			},
    			{
    				xtype: 'gridcolumn',
    				itemId: 'colms_saldo_restricted_fund',
    				width: 120,
    				titleAlign: 'right',
    				align: 'right',
    				dataIndex: 'saldo_restricted_fund',
    				hideable: false,
    				text: 'Saldo Restricted Fund',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                    hidden: true,
    			},

    		]
    	});

        me.callParent(arguments);
    	
    },
    viewConfig: {forceFit: true},
    generateDockedItems: function () {
    	var me = this;
    	var dockedItems = [
    		{
    			xtype: 'toolbar',
    			dock: 'top',
    			height: 28,
    			items: [
                    {
                        text: 'Generate',
                        itemId: 'btnGenerate',
                        action: 'generate',
                        iconCls: 'icon-refresh',
                        bindAction: me.bindPrefixName + 'Generate',
                        margin: '0 5 0 0',
                    },
                    {
                        text: 'Add new',
                        itemId: 'btnAdd',
                        action: 'create',
                        iconCls: 'icon-add',
                        bindAction: me.bindPrefixName + 'Create',
                        id: 'btnAddNewDetailBankloan',
                        margin: '0 5 0 0',
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        hidden: false,
                        itemId: 'btnEdit',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Edit',
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        xtype: 'button',
                        action: 'destroy',
                        disabled: true,
                        margin: '0 5 0 0',
                        hidden: false,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                    {
                        xtype: 'button',
                        action: 'read',
                        text: 'View',
                        iconCls: 'icon-search',
                        className:'view',
                        bindAction: me.bindPrefixName + 'Read',
                        altText: 'View',
                        tooltip: 'View',
                        itemId: 'btnView',
                        margin: '0 5 0 0',
                    }
    			],
    		}
    	];
        return dockedItems;
    	
    },
    generateActionColumn: function () {
	    var me = this;
	    var ac = {
	        xtype: 'actioncolumn',
	        width: 50,
	        hidden: false,
	        resizable: false,
	        align: 'right',
	        items: [
	            {
	                defaultIcon: 'icon-edit',
	                iconCls: ' ux-actioncolumn icon-edit act-update',
	                action: 'update',
	                altText: 'Edit',
	                tooltip: 'Edit',
                    itemId: 'btnEdit'
	            },
	            {
	                defaultIcon: 'icon-delete',
	                action: 'destroy',
	                iconCls: 'ux-actioncolumn icon-delete act-destroy',
	                altText: 'Delete',
	                tooltip: 'Delete',
                    itemId: 'btnDelete'
	            }
	        ]
	    }

	    return ac;
    	
    }
});