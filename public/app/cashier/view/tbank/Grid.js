Ext.define('Cashier.view.tbank.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.tbankgrid',
    store: 'Tbank',
    bindPrefixName: 'Tbank',
    itemId: 'Tbank',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer',
                    text: 'No.',
                    width: 40,
                    titleAlign: 'center',
                    align: 'center',
                },
//                {
//                    xtype: 'gridcolumn',
//                    itemId: 'colms_projectcode',
//                    dataIndex: 'projectcode',
//                    width: 100,
//                    titleAlign: 'center',
//                    align: 'left',
//                    hideable: false,
//                    text: 'Project Code'
//                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_projectname',
                    dataIndex: 'projectname',
                    width: 150,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Project Name'
                },
//                {
//                    xtype: 'gridcolumn',
//                    itemId: 'colms_ptcode',
//                    dataIndex: 'ptcode',
//                    width: 100,
//                    titleAlign: 'center',
//                    align: 'left',
//                    hideable: false,
//                    text: 'Pt Code'
//                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname',
                    dataIndex: 'ptname',
                    width: 150,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Pt Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_department',
                    dataIndex: 'deptcode',
                    width: 70,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Dept.'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_chequegiro_status',
                    dataIndex: 'chequegiro_status',
                    width: 90,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Status',
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_is_posting',
                    dataIndex: 'is_posting',
                    width: 60,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Status ',
                    renderer: function (value) {
                        if (value == '0') {
                            return 'Open';
                        } else if (value == '1') {
                            return 'Approve';
                        } else if (value == '2') {
                            return 'Close';
                        }
                    }
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'dataflowid',
                    dataIndex: 'dataflow',
                    titleAlign: 'center',
                    align: 'center',
                    width: 60,
                    hideable: false,
                    text: 'Dataflow'
                },
                {
                    xtype: 'booleancolumn',
                    itemId: 'colms_is_posting_gl',
                    dataIndex: 'is_posting_gl',
                    trueText: '&#10003;',
                    falseText: '&#9747;',
                    titleAlign: 'center',
                    align: 'center',
                    width: 30,
                    hideable: false,
                    text: 'GL'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_accept_date',
                    dataIndex: 'accept_date',
                    type: 'string',
                    width: 100,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Accept Date',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_transno',
                    dataIndex: 'transno',
                    width: 50,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Sort'
                },
//                {
//                    xtype: 'gridcolumn',
//                    itemId: 'colms_prefix',
//                    dataIndex: 'prefix',
//                    width: 120,
//                    titleAlign: 'center',
//                    align: 'left',
//                    hideable: false,
//                    text: 'Prefix'
//                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_voucher_no',
                    dataIndex: 'voucher_no',
                    width: 90,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Voucher No.'
                },
//                {
//                    xtype: 'gridcolumn',
//                    itemId: 'colms_coa',
//                    dataIndex: 'coa',
//                    width: 100,
//                    titleAlign: 'center',
//                    align: 'center',
//                    hideable: false,
//                    text: 'Acc. No.'
//                },
//                {
//                    xtype: 'gridcolumn',
//                    itemId: 'colms_coaname',
//                    dataIndex: 'coaname',
//                    width: 180,
//                    titleAlign: 'center',
//                    align: 'left',
//                    hideable: false,
//                    text: 'Acc. Name'
//                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    dataIndex: 'description',
                    width: 200,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_amount',
                    dataIndex: 'amount',
                    width: 120,
                    titleAlign: 'center',
                    align: 'right',
                    hideable: false,
                    text: 'Amount',
                    renderer: Ext.util.Format.numberRenderer('0,000.00'),
                },
                {
                    xtype: 'actioncolumn',
                    hidden: true,
                    itemId: 'actioncolumn',
                    width: 180,
                    resizable: false,
                    align: 'right',
                    hideable: false,

                    items: [
//                        {
//                            text: 'Edit',
//                            iconCls: 'icon-edit',
//                            bindAction: me.bindPrefixName + 'Update',
//                            altText: 'Edit',
//                            tooltip: 'Edit'
//                        },
//                        {
//                            text: 'Delete',
//                            iconCls: 'icon-delete',
//                            // bindAction: me.bindPrefixName + 'Delete',
//                            altText: 'Delete',
//                            tooltip: 'Delete',
//                            id: 'delCustomTbank',
//                            itemId: 'delCustomTbank',
//   
//                            handler: function () {
//                                alert('ads');
//                            }
//
//                        },
//                        {//========= added on march 15th 2016 by Tirtha
//                            text: 'View',
//                            iconCls: 'icon-search',
//                            className: 'view',
//                            bindAction: me.bindPrefixName + 'Read',
//                            altText: 'View',
//                            tooltip: 'View'
//                        }
                    ],
                    renderer: function (value, metaData, record, row, col, store, gridView) {
                        if (record.get("chequegiro_status") == "UNPROCESSED") {
//                            return '<img alt="Delete" src="data:image/gif;base64,R0lGODlhAQABAID/AMDAwAAAACH5BAEAAAAALAAAAAABAAEAAAICRAEAOw==" class="x-action-col-icon x-action-col-1   ux-actioncolumn icon-delete act-TbankDelete delCustomTbank"   data-qtip="Delete">';
                        }
                    },
                },
            ]
        });
        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'create',
                        hidden: true,
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Create',
                        text: me.newButtonLabel
                    },
                    {
                        xtype: 'button',
                        action: 'update',
                        disabled: true,
                        hidden: true,
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
                        hidden: true,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                    {
                        xtype: 'button',
                        action: 'preview',
                        disabled: true,
                        hidden: false,
                        itemId: 'btnPreview',
                        iconCls: '',
                        text: 'Preview',
                        menu: [

                            {text: 'Print Blank Form Giro', id: 'formgiro'},
                            {text: 'Format Paper', id: 'formatpaper'},
                            {
                                text: 'Edit Form', id: 'editform',
                                menu: [
                                    {text: 'Header', id: 'editformheader'},
                                ]
                            },
                            {
                                text: 'Cheque', id: 'parentcheque',
                                menu: [
                                    {text: 'BCA', id: 'chequebca'},
                                    {text: 'MEGA', id: 'chequemega'},
                                    {text: 'MANDIRI', id: 'chequemandiri'},
                                    {text: 'PERMATA', id: 'chequepermata'},
                                    {text: 'OCBC NISP', id: 'chequeocbcnisp'},
                                    {text: 'COMMONWEALTH', id: 'chequecommon'},
                                    {text: 'STANDARD CHARTERED', id: 'chequechartered'},
                                    {text: 'DBS', id: 'chequedbs'},
                                ]
                            },
                            {
                                text: 'Giro', id: 'parentgiro',
                                menu: [
                                    {text: 'BCA', id: 'girobca',
                                        menu: [
                                            {text: 'Model 1', id: 'girobca1'},
                                            {text: 'Model 2', id: 'girobca2'},
                                        ]
                                    },
                                    {text: 'MEGA', id: 'giromega'},
                                    {text: 'MANDIRI', id: 'giromandiri'},
                                    {text: 'PERMATA', id: 'giropermata'},
                                    {text: 'OCBC NISP', id: 'giroocbcnisp'},
                                    {text: 'COMMONWEALTH', id: 'girocommon',
                                        menu: [
                                            {text: 'Model 1', id: 'girocommon1'},
                                            {text: 'Model 2', id: 'girocommon2'},
                                        ]
                                    },
                                    {text: 'STANDARD CHARTERED', id: 'girochartered',
                                        menu: [
                                            {text: 'Model 1', id: 'girochartered1'},
                                            {text: 'Model 2', id: 'girochartered2'},
                                            {text: 'Model 3', id: 'girochartered3'},
                                        ]
                                    },
                                    {text: 'DBS', id: 'girodbs',
                                        menu: [
                                            {text: 'Model 1', id: 'girodbs1'},
                                            {text: 'Model 2', id: 'girodbs2'},
                                            {text: 'Model 1 (PDF)', id: 'girodbs3'},
                                        ]
                                    },
                                ]
                            },
                            {text: 'Transfer', id: 'transfer',
                                menu: [
                                    {text: 'BCA', id: 'transferbca',
                                        menu: [
                                            {text: 'Setoran', id: 'transferbca1'},
                                            {text: 'Kliring / Wakat', id: 'transferbca2'},
                                            {text: 'Pengiriman', id: 'transferbca3'},
                                        ]
                                    },
                                    {text: 'Mandiri', id: 'transfermandiri',
                                        menu: [
                                            {text: 'Setoran', id: 'transfermandiri1'},
                                            {text: 'Kredit', id: 'transfermandiri2'},
                                        ]

                                    },
                                    {text: 'CIMB Niaga', id: 'transfercimbniaga'},
                                    {text: 'Permata', id: 'transferpermata',
                                        menu: [
                                            {text: 'Setoran', id: 'transferpermata1'},
                                            {text: 'Aplikasi Transfer', id: 'transferpermata2'},
                                        ]

                                    },
                                    {text: 'Standard Chartered', id: 'transferchartered',
                                        menu: [
                                            {text: 'Cash', id: 'transferchartered1'},
                                            {text: 'Cheque', id: 'transferchartered2'},
                                        ]

                                    },
                                    {text: 'Mega', id: 'transfermega',
                                        menu: [
                                            {text: 'Setoran', id: 'transfermega1'},
                                            {text: 'Pengiriman', id: 'transfermega2'},
                                        ]


                                    },
                                    {text: 'Commonwealth', id: 'transfercommonwealth'},
                                    {text: 'OCBC NISP', id: 'transferocbcnisp'},
                                    {text: 'BRI', id: 'transferbri'},
                                    {text: 'PANIN', id: 'transferpanin'},
                                    {text: 'UOB', id: 'transferuob'},
                                    {text: 'BNP', id: 'transferbnp',
                                        menu: [
                                            {text: 'Setoran', id: 'transferbnp1'},
                                            {text: 'Pengiriman', id: 'transferbnp2'},
                                        ]

                                    },
                                    {text: 'HSBC', id: 'transferhsbc'},
                                    {text: 'BUKOPIN', id: 'transferbukopin'},
                                    {text: 'Citi Bank', id: 'transfercitibank',
                                        menu: [
                                            {text: 'Setoran', id: 'transfercitibank1'},
                                            {text: 'Pambayaran', id: 'transfercitibank2'},
                                        ]

                                    },
                                    {text: 'BII', id: 'transferbii',
                                        menu: [
                                            {text: 'Setoran', id: 'transferbii1'},
                                            {text: 'Pengiriman', id: 'transferbii2'},
                                        ]

                                    },
                                    {text: 'BTN', id: 'transferbtn'},
                                    {text: 'BNI', id: 'transferbni'},
                                    {text: 'ANZ', id: 'transferanz'},
                                    {text: 'DBS', id: 'transferdbs'},
                                ]

                            },
                        ]
                    },
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }
        ];
        return dockedItems;
    },
});


