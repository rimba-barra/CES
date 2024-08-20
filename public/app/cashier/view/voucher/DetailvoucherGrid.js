
Ext.define('Cashier.view.voucher.DetailvoucherGrid', {
    extend: 'Cashier.library.template.view.GridDS2',
    alias: 'widget.detailvouchergrid',
    storeConfig: {
        id: 'DetailVoucherGridStore',
        idProperty: 'voucherdetail_id',
        extraParams: {
            mode_read: 'generatetemplatecoa',
            template_id: 0
        }
    },
    height: 180,
    bindPrefixName: 'Voucher',
    itemId: 'Vouchercoadetail',
    title: 'Coa Detail',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
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
                {
                    xtype: 'gridcolumn',
                    width: 80,
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'receipt_no',
                    hideable: false,
                    text: '#Receipt',
                    flex: 2
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'remarks',
                    titleAlign: 'center',
                    align: 'left',
                    flex: 7,
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    titleAlign: 'center',
                    align: 'center',
//                    dataIndex: 'subgl_code', //comment on 14/12/2018 semy, balik ke multi subdetail
                    dataIndex: 'kelsub_description',
                    hideable: false,
                    text: 'Sub'
                    ,renderer : function (value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('description_sub') + '" data-qwidth="500px"';
                        return value;
                    }
                },
                {
                    xtype: 'gridcolumn',
                    titleAlign: 'center',
                    align: 'center',
                    dataIndex: 'coa_coa',
                    hideable: false,
                    text: 'COA'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'coa_name',
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Coa Description'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'amount',
                    titleAlign: 'center',
                    align: 'right',
                    style: 'text-align:left',
                    renderer: function (v) {
                        return Ext.util.Format.currency(v, ' ', EREMS_GLOBAL_PRECISION);
                    },
                    hideable: false,
                    header: 'Total Amount',
//                    summaryType: 'sum',
//                    summaryRenderer: function (value, summaryData, dataIndex) {
//                        var summaryvalue = Ext.util.Format.number(value, '0,000.00');
//                        return  summaryvalue;
//                    }
//


                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'cashflowtype_cashflowtype',
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Cash Flow',
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'kasbondept_no',
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Kasbon No',
                    width: 200
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'exclude_kwitansi',
                    titleAlign: 'center',
                    align: 'center',
                    hideable: true,
                    hidden:true,
                    text: 'Exclude in Kwitansi',
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'coa_coa_id_cf',
                    titleAlign: 'center',
                    align: 'center',
                    hideable: true,
                    hidden:true,
                    text: 'coa_id_cf',
                },
                me.generateActionColumn()
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
                        text: 'Generate Detail',
                        itemId: 'btnGenerate',
                        action: 'generate',
                        iconCls: 'icon-print',
                        disabled: true,
                    },
                    {
                        text: 'Calculate Tax',
                        itemId: 'btnGenerateTax',
                        action: 'generatetax',
                        iconCls: 'icon-print',
                    },
                    {
                        xtype: 'button',
                        action: 'create',
                        hidden: false,
                        // disabled:true,
                        itemId: 'btnCreate',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Add New',
                        bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        xtype: 'button',
                        action: 'createcopy',
                        hidden: false,
                        disabled: true,
                        itemId: 'btnCreateCopy',
                        margin: '0 5 0 0',
                        iconCls: 'icon-edit',
                        text: 'Add Copy',
                        bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
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
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                    {
                        xtype: 'button',
                        action: 'uploaddetail',
                        disabled: false,
                        itemId: 'btnUploadDetail',
//                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-excel',
                        text: 'Upload Detail'
                    },
                    {
                        xtype: 'button',
                        action: 'trackingvoucher',
                        // disabled: true,
                        itemId: 'btnTracking',
                        iconCls: 'icon-search',
                        text: 'Log',
                        disabled: true,
                    }
                ]
            },
//            {
//                xtype: 'pagingtoolbar',
//                dock: 'bottom',
//                width: 360,
//                displayInfo: true,
//                store: this.getStore(),
//                hideRefresh: true,
//                listeners: {
//                    afterrender: function (tbar) {
//                        if (tbar.hideRefresh) {
//                            tbar.down('#refresh').hide();
//                        }
//                    }
//
//                }
//            }
        ];
        return dockedItems;
    },
});


