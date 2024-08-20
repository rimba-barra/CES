Ext.define('Cashier.view.voucher.Grid', {
    extend        : 'Cashier.library.template.view.GridDS2',
    alias         : 'widget.vouchergrid',
    bindPrefixName: 'Voucher',
    storeConfig   : {
        id         : 'VoucherGridStore',
        idProperty : 'kasbank_id',
        extraParams: {},
            //  fieldgrouping: 'dataflow',
    },
    features: [{
        ftype: 'grouping',
    }],
        // itemId:'',
    newButtonLabel: 'New Voucher ',
    initComponent : function() {
        var me          = this;
        var cellEditing = Ext.create('Ext.grid.plugin.CellEditing', {
            clicksToEdit: 1
        });
        if (apps.subholdingId == 1) {
            var columnVoucherGrid = [{
                    xtype: 'rownumberer',
                    width: 50,
                },
                {
                    xtype   : 'gridcolumn',
                    width   : 30,
                    name    : 'is_angsuran',
                    hideable: false,
                    text    : '[*]',
                    renderer: function(value, metaData, record, row, col, store, gridView) {
                        var payment_paymentflag_id = record.get('payment_paymentflag_id');
                        if (payment_paymentflag_id == "1" || payment_paymentflag_id == "2") {
                            return '<img width="16" height="16" src=' + document.URL + 'app/cashier/images/user.png' + '>';
                        }
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                    },
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 30,
                    dataIndex: 'dataflow',
                    hideable : false,
                    text     : 'T',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    }
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 80,
                    dataIndex: 'payment_receipt_no',
                    hideable : false,
                    text     : 'Receipt #',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    }
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 120,
                    dataIndex: 'voucher_no',
                    hideable : false,
                    text     : 'Voucher No.',
                    editor   : {
                        xtype   : 'textfield',
                        disabled: true
                    },
                    renderer: function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    },
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 80,
                    dataIndex: 'realization_date',
                    hideable : false,
                    text     : 'Voucher Date',
                        // renderer: Ext.util.Format.dateRenderer('m/d/Y'),
                    renderer: function(value, metaData, record, row, col, store, gridView) {
                            metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        var is_realized     = record.get('is_realized');
                        var is_posting      = record.get('is_posting');
                        if (is_realized === 1 || is_posting === 1) {
                            return moment(record.get('realization_date')).format("DD-MM-YYYY");
                        } else {
                            return '-';
                        }

                    },
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 170,
                    dataIndex: 'description',
                    hideable : false,
                    text     : 'Notes',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    },
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 100,
                    dataIndex: 'amount',
                    hideable : false,
                    text     : 'Total',
                    renderer : Ext.util.Format.numberRenderer('0,000.00'),
                    emptyText: 0,
                    align    : 'right',
                    style    : 'text-align:left'
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 120,
                    dataIndex: 'customer_name',
                    hideable : false,
                    text     : 'From / To ',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    }
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 50,
                    dataIndex: 'department_code',
                    hideable : false,
                    text     : 'Dept',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    }
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 150,
                    dataIndex: 'spk',
                    hideable : false,
                    text     : 'No.SPK / No.SOP',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    }
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 130,
                    dataIndex: 'voucherID',
                    hideable : false,
                    text     : 'Voucher ID',
                    editor   : {
                        xtype   : 'textfield',
                        disabled: true
                    },
                    renderer: function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    }
                },
                {
                    xtype    : 'datecolumn',
                    format   : 'd-m-Y',
                    width    : 80,
                    dataIndex: 'duedate',
                    hideable : false,
                    text     : 'Due Date',
                    align    : 'center',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                            //                        console.log(record.get('duedate'));
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        if (record.get('duedate')) {
                            if (moment(record.get('duedate')).format("DD-MM-YYYY") == "01-01-1900") {
                                return '-';
                            } else {
                                return moment(record.get('duedate')).format("DD-MM-YYYY");
                            }
                        } else {
                            return '-';
                        }


                    },
                },
                {
                    xtype    : 'datecolumn',
                    width    : 80,
                    format   : 'd-m-Y',
                    dataIndex: 'kwitansi_date',
                    hideable : false,
                    text     : 'Kwitansi Date',
                    align    : 'center',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        if (record.get('kwitansi_date')) {
                            if (moment(record.get('kwitansi_date')).format("DD-MM-YYYY") == "01-01-1900") {
                                return '-';
                            } else {
                                return moment(record.get('kwitansi_date')).format("DD-MM-YYYY");
                            }
                        } else {
                            return '-';
                        }

                    },
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 80,
                    dataIndex: 'cheque_cheque_no',
                    hideable : false,
                    text     : 'Cheque No.',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    },
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 80,
                    dataIndex: 'payment_payment_date',
                    hideable : false,
                    text     : 'Payment Date',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        if (record.get('payment_payment_date')) {
                            if (moment(record.get('payment_payment_date')).format("DD-MM-YYYY") == "01-01-1900") {
                                return '-';
                            } else {
                                return moment(record.get('payment_payment_date')).format("DD-MM-YYYY");
                            }
                        } else {
                            return '-';
                        }

                    },
                        //                    renderer: Ext.util.Format.dateRenderer('m/d/Y')
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 80,
                    dataIndex: 'issued_date',
                    hideable : false,
                    text     : 'Issued Date',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        if (record.get('issued_date')) {
                            if (moment(record.get('issued_date')).format("DD-MM-YYYY") == "01-01-1900") {
                                return '-';
                            } else {
                                return moment(record.get('issued_date')).format("DD-MM-YYYY");
                            }
                        } else {
                            return '-';
                        }

                    },
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 70,
                    dataIndex: 'kasbank',
                    hideable : false,
                    text     : 'K/B',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    },
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 120,
                    dataIndex: 'voucherdept_no',
                    hideable : false,
                    text     : 'Voucher Dept No.',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    },
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 120,
                    dataIndex: 'kasbondept_no',
                    hideable : false,
                    text     : 'Kasbon Dept No.',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    },
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 120,
                    dataIndex: 'kasbondept_made_by',
                    hideable : false,
                    text     : 'Made By (Cashbon)',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    },
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 150,
                    dataIndex: 'bank_name',
                    text     : 'Bank or Provider',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    },
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 170,
                    dataIndex: 'made_by',
                    hideable : false,
                    text     : 'Created by',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    },
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 170,
                    dataIndex: 'addon',
                    hideable : false,
                    text     : 'Created Date',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    },
                },
                me.generateActionColumn()
            ];
        } else {

            var columnVoucherGrid = [{
                    xtype: 'rownumberer',
                    width: 50,
                },
                {
                    xtype   : 'gridcolumn',
                    width   : 30,
                    name    : 'is_angsuran',
                    hideable: false,
                    text    : '[*]',
                    renderer: function(value, metaData, record, row, col, store, gridView) {
                        var payment_paymentflag_id = record.get('payment_paymentflag_id');
                        if (payment_paymentflag_id == "1" || payment_paymentflag_id == "2") {
                            return '<img width="16" height="16" src=' + document.URL + 'app/cashier/images/user.png' + '>';
                        }
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                    },
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 30,
                    dataIndex: 'dataflow',
                    hideable : false,
                    text     : 'T',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    }
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 50,
                    dataIndex: 'department_code',
                    hideable : false,
                    text     : 'Dept',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    }
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 130,
                    dataIndex: 'receipt_no_spk',
                    hideable : false,
                    text     : 'Receipt No / SPK / SOP#',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    }
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 120,
                    dataIndex: 'voucherID',
                    hideable : false,
                    text     : 'Voucher ID',
                    editor   : {
                        xtype   : 'textfield',
                        disabled: true
                    },
                    renderer: function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    }
                },
                {
                    xtype    : 'datecolumn',
                    format   : 'd-m-Y',
                    width    : 90,
                    dataIndex: 'duedate_kwitansidate',
                    hideable : false,
                    text     : 'Due / Kwt Date',
                    align    : 'center',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                            //                        console.log(record.get('duedate'));
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        if (record.get('duedate_kwitansidate')) {
                            if (moment(record.get('duedate_kwitansidate')).format("DD-MM-YYYY") == "01-01-1900") {
                                return '-';
                            } else {
                                return moment(record.get('duedate_kwitansidate')).format("DD-MM-YYYY");
                            }
                        } else {
                            return '-';
                        }


                    },
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 120,
                    dataIndex: 'customer_name',
                    hideable : false,
                    text     : 'From / To ',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    }
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 100,
                    dataIndex: 'amount',
                    hideable : false,
                    text     : 'Total',
                    renderer : Ext.util.Format.numberRenderer('0,000.00'),
                    emptyText: 0,
                    align    : 'right',
                    style    : 'text-align:left'
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 80,
                    dataIndex: 'cheque_cheque_no',
                    hideable : false,
                    text     : 'Cheque No.',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    },
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 120,
                    dataIndex: 'paymentdate_issueddate',
                    hideable : false,
                    text     : 'Payment / Issued Date',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        if (record.get('paymentdate_issueddate')) {
                            if (moment(record.get('paymentdate_issueddate')).format("DD-MM-YYYY") == "01-01-1900") {
                                return '-';
                            } else {
                                return moment(record.get('paymentdate_issueddate')).format("DD-MM-YYYY");
                            }
                        } else {
                            return '-';
                        }

                    },
                        //                    renderer: Ext.util.Format.dateRenderer('m/d/Y')
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 50,
                    dataIndex: 'kasbank',
                    hideable : false,
                    text     : 'K/B',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    },
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 120,
                    dataIndex: 'voucher_no',
                    hideable : false,
                    text     : 'Voucher No.',
                    editor   : {
                        xtype   : 'textfield',
                        disabled: true
                    },
                    renderer: function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    },
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 80,
                    dataIndex: 'realization_date',
                    hideable : false,
                    text     : 'Voucher Date',
                        // renderer: Ext.util.Format.dateRenderer('m/d/Y'),
                    renderer: function(value, metaData, record, row, col, store, gridView) {
                            metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        var is_realized     = record.get('is_realized');
                        var is_posting      = record.get('is_posting');
                        if (is_realized === 1 || is_posting === 1) {
                            return moment(record.get('realization_date')).format("DD-MM-YYYY");
                        } else {
                            return '-';
                        }

                    },
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 170,
                    dataIndex: 'description',
                    hideable : false,
                    text     : 'Notes',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    },
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 120,
                    dataIndex: 'kasbondept_no',
                    hideable : false,
                    text     : 'Kasbon Dept No.',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    },
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 120,
                    dataIndex: 'kasbondept_made_by',
                    hideable : false,
                    text     : 'Made By (Cashbon)',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    },
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 150,
                    dataIndex: 'bank_name',
                    text     : 'Bank or Provider',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    },
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 170,
                    dataIndex: 'made_by',
                    hideable : false,
                    text     : 'Created by',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    },
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 170,
                    dataIndex: 'addon',
                    hideable : false,
                    text     : 'Created Date',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    },
                },
                {
                    xtype    : 'gridcolumn',
                    width    : 120,
                    dataIndex: 'voucherdept_no',
                    hideable : false,
                    text     : 'Voucher Dept No.',
                    renderer : function(value, metaData, record, row, col, store, gridView) {
                        metaData.tdAttr = 'data-qtip="' + record.get('hover_detail_voucher') + '" data-qwidth="500px"';
                        return value;
                    },
                },
                me.generateActionColumn()
            ];
        }
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            plugins    : [cellEditing],
            selType    : 'cellmodel',
                /*selModel: {
                selType: 'cellmodel'
            },*/
            viewConfig: {},
            selModel  : Ext.create('Ext.selection.CheckboxModel', {}),
            columns   : columnVoucherGrid
        });

        me.callParent(arguments);
    },
    viewConfig: {
        listeners: {
            refresh: function(view) {
                var color, nodes, node, record, level, flag, cells, j, i;
                    // get all grid view nodes
                nodes = view.getNodes();

                for (i = 0; i < nodes.length; i++) {
                    node = nodes[i];
                        // get node record
                    record = view.getRecord(node);
                        // get level from record data
                    if (record.get("is_posting")) {
                        level = '#F1C9BA';
                    } else if (record.get("status") == 'is_request_unrealize') {
                        level = '#d2a479';

                    } else if (record.get("is_realized")) {
                        if (record.get("is_temp_realized")) {
                            level = '#61d2ff';
                        } else {
                            level = '#BADDB4';
                        }
                    } else if (record.get("is_paid")) {
                        if (record.get("dataflow") == "O") {
                            level = '#FCD03D';
                        } else {
                            if (i % 2 == 0) {
                                level = '#fafafa';
                            } else {
                                level = '#FFFFFF';
                            }
                        }
                    } else {
                        if (i % 2 == 0) {
                            level = '#fafafa';
                        } else {
                            level = '#FFFFFF';
                        }
                    }
                        // 
                        //                    if (record.get("status") == "posting") {
                        //                        level = '#F1C9BA';
                        //                    }
                        //                    else if (record.get("status") == "realized") {
                        //                        level = '#BADDB4';
                        //                    }
                        //                    else if (record.get("status") == "paid") {
                        //                        level = '#FCD03D';
                        //                    }
                        //                    else {
                        //                        level = '#FFFFFF';
                        //                    }

                    cells = Ext.get(node).query('td');
                        // set bacground color to all row td elements
                    for (j = 0; j < cells.length; j++) {
                        Ext.fly(cells[j]).setStyle('background-color', level);
                    }
                }
            }
        }
    },
    generateDockedItems: function() {
        var me          = this;
        var dockedItems = [{
                xtype : 'toolbar',
                dock  : 'top',
                height: 28,
                items : [
                    {
                        xtype  : 'button',
                        text   : 'Add New',
                        iconCls: 'icon-new',
                        menu   : [
                            {
                                xtype     : 'button',
                                action    : 'create',
                                hidden    : true,
                                itemId    : 'btnCreate',
                                margin    : '5 5 5 5',
                                iconCls   : 'icon-new',
                                text      : 'Add New Voucher',
                                textAlign : 'left',
                                bindAction: me.bindPrefixName + 'Create'
                            },
                            {
                                xtype     : 'button',
                                action    : 'createothers',
                                itemId    : 'btnCreateothers',
                                margin    : '5 5 5 5',
                                iconCls   : 'icon-new',
                                text      : 'Add New Others Payment',
                                textAlign : 'left',
                                bindAction: me.bindPrefixName + 'Createothers'
                            },
                        ]
                    },
                    {
                        xtype     : 'button',
                        action    : 'update',
                        disabled  : true,
                        hidden    : true,
                        itemId    : 'btnEdit',
                        id        : 'btnEdit',
                        margin    : '0 5 0 0',
                        iconCls   : 'icon-edit',
                        text      : 'Edit',
                        bindAction: me.bindPrefixName + 'Update',
                        listeners : {
                            click: function(view) {
                                var grid         = view.up('gridpanel');
                                var selectedData = grid.getSelectionModel().getSelection();

                                var restricted_group = [2165, 2167, 2168, 3195, 3216, 3231, 3335];
                                if ($.inArray(parseInt(apps.gid), restricted_group) !== -1) {
                                    if (selectedData[0].data.is_paid == 1 || selectedData[0].data.is_realized == 1 || selectedData[0].data.is_posting == 1) {
                                        Ext.Msg.alert("Warning", "You don't have authorization to edit this voucher.");
                                        return false;
                                    }
                                }
                            }
                        }
                    },
                    {
                        xtype     : 'button',
                        action    : 'destroy',
                        disabled  : true,
                        hidden    : true,
                        itemId    : 'btnDelete',
                        margin    : '0 5 0 0',
                        iconCls   : 'icon-delete',
                        text      : 'Delete Selected',
                        bindAction: me.bindPrefixName + 'Delete',
                        listeners : {
                            click: function(view) {
                                var grid         = view.up('gridpanel');
                                var selectedData = grid.getSelectionModel().getSelection();

                                var restricted_group = [2165, 2167, 2168, 3195, 3216, 3231, 3335];
                                if ($.inArray(parseInt(apps.gid), restricted_group) !== -1) {
                                    if (selectedData[0].data.is_paid == 1 || selectedData[0].data.is_realized == 1 || selectedData[0].data.is_posting == 1) {
                                        Ext.Msg.alert("Warning", "You don't have authorization to delete this voucher.");
                                        return false;
                                    }
                                }
                            }
                        }
                    },
                    {
                        xtype  : 'button',
                        action : 'copytoexcel',
                        itemId : 'copytoexcel',
                        margin : '0 5 0 0',
                        iconCls: 'icon-copy',
                        text   : 'Copy to Excel',
                    },
                    {
                        xtype: 'tbspacer',
                        flex : 1
                    },
                    {
                        xtype: 'combobox',
                        name : 'limit',
                            //                        fieldLabel: 'Records per Page',
                        emptyText : 'Records per Page',
                        queryMode : 'local',
                        valueField: 'limit',
                            // fieldLabel:'Cash IN/OUT',
                            //allowBlank: false,
                        forceSelection: true,
                        displayField  : 'description',
                        width         : 130,
                        store         : new Ext.data.JsonStore({
                            fields: ['limit', 'description'],
                            data  : [
                                { limit: '25', description: 'Default' },
                                { limit: '100', description: '100' },
                                { limit: '500', description: '500' },
                                { limit: '1000', description: '1000' },
                                { limit: '1500', description: '1500' },
                                { limit: '2000', description: '2000' },
                                { limit: '3000', description: '3000' },
                                { limit: '4000', description: '4000' },
                                { limit: '5000', description: '5000' },
                                { limit: '6000', description: '6000' },
                                { limit: '200000', description: 'ALL Data' },
                            ]
                        }),
                    },
                    {
                        xtype: 'combobox',
                        name : 'grouppanel',
                            //                        fieldLabel: 'Group by',
                        emptyText : 'Group by',
                        queryMode : 'local',
                        valueField: 'status',
                            // fieldLabel:'Cash IN/OUT',
                            //allowBlank: false,
                        forceSelection: true,
                        displayField  : 'description',
                        width         : 100,
                        store         : new Ext.data.JsonStore({
                            fields: ['status', 'description'],
                            data  : [
                                { status: 'reset', description: 'ALL' },
                                { status: 'TYPE', description: 'CASH TYPE' },
                                { status: 'kasbank', description: 'Kas/Bank' },
                                { status: 'CUSTOMER', description: 'Customer' },
                                { status: 'cheque_cheque_no', description: 'Cheque No' },
                                    //{status: 'O', description: 'CASH OUT'},
                            ]
                        }),
                    },
                    {
                        xtype: 'combobox',
                        name : 'dataflowpanel',
                            //fieldLabel: 'Voucher Type',
                        emptyText : 'Cash IN/OUT',
                        queryMode : 'local',
                        valueField: 'status',
                        hidden    : true,
                            // fieldLabel:'Cash IN/OUT',
                            //allowBlank: false,
                        forceSelection: true,
                        displayField  : 'description',
                        width         : 100,
                        store         : new Ext.data.JsonStore({
                            fields: ['status', 'description'],
                            data  : [
                                { status: ' ', description: 'ALL' },
                                { status: 'I', description: 'CASH IN' },
                                { status: 'O', description: 'CASH OUT' },
                            ]
                        }),
                    },
                    {
                        text: 'Colour Filter',
                        menu: {
                            xtype: 'menu',
                            items: [

                                {
                                    xtype : 'button',
                                    action: 'actionuploadedvoucher',
                                    align : 'right',
                                    width : 80,
                                    margin: '0 5 0 0',
                                    text  : '<div style="width:15px;height:15px;background-color:#333333;border:1px #000 solid;">&nbsp;&nbsp;&nbsp;&nbsp;</span> Uploaded',
                                },
                                {
                                    xtype : 'button',
                                    action: 'actionall',
                                    align : 'right',
                                    width : 50,
                                    margin: '0 5 0 0',
                                    text  : '<div style="width:15px;height:15px;background-color:#333333;border:1px #000 solid;">&nbsp;&nbsp;&nbsp;&nbsp;</span> ALL',
                                },
                                {
                                    xtype : 'button',
                                    action: 'actiondraft',
                                    align : 'right',
                                    width : 50,
                                    margin: '0 5 0 0',
                                    text  : '<div style="width:15px;height:15px;background-color:#FFFFFF;border:1px #000 solid;">&nbsp;&nbsp;&nbsp;&nbsp;</span> Draft',
                                },
                                {
                                    xtype : 'button',
                                    action: 'actionpaid',
                                    align : 'right',
                                    width : 50,
                                    margin: '0 5 0 0',
                                    text  : '<div style="width:15px;height:15px;background-color:#FCD03D;border:1px #000 solid;">&nbsp;&nbsp;&nbsp;&nbsp;</span> Paid',
                                },
                                {
                                    xtype : 'button',
                                    action: 'actiontemprealized',
                                    align : 'right',
                                    width : 70,
                                    margin: '0 5 0 0',
                                    text  : '<div style="width:15px;height:15px;background-color:#61d2ff;border:1px #000 solid;">&nbsp;&nbsp;&nbsp;&nbsp;</span> Temp Realized',
                                },
                                {
                                    xtype : 'button',
                                    action: 'actionrealized',
                                    align : 'right',
                                    width : 70,
                                    margin: '0 5 0 0',
                                    text  : '<div style="width:15px;height:15px;background-color:#BADDB4;border:1px #000 solid;">&nbsp;&nbsp;&nbsp;&nbsp;</span> Realized',
                                },
                                {
                                    xtype : 'button',
                                    action: 'actionposted',
                                    align : 'right',
                                    width : 80,
                                    margin: '0 5 0 0',
                                    text  : '<div style="width:15px;height:15px;background-color:#F1C9BA;border:1px #000 solid;">&nbsp;&nbsp;&nbsp;&nbsp;</span> Posted',
                                },
                                {
                                    xtype : 'button',
                                    action: 'actionrequestunrealize',
                                    align : 'right',
                                    width : 80,
                                    margin: '0 5 0 0',
                                    text  : '<div style="width:15px;height:15px;background-color:#d2a479;border:1px #000 solid;">&nbsp;&nbsp;&nbsp;&nbsp;</span> Request Unrealize',
                                },
                            ],
                        }
                    },
                    {
                        text: 'Escrow',
                        menu: {
                            xtype: 'menu',
                            items: [

                                {
                                    xtype  : 'button',
                                    action : 'escrowpenempatan',
                                    align  : 'right',
                                    itemId : 'btnEscrowpenempatan',
                                    margin : '0 5 0 0',
                                    iconCls: 'icon-new',
                                    text   : '[F9] KPR Full Payment',
                                        //                        hidden: true,
                                        //                        disabled: true,
                                    bindAction: me.bindPrefixName + 'Escrowpenempatan'
                                },
                                {
                                    xtype  : 'button',
                                    action : 'escrow',
                                    align  : 'right',
                                    itemId : 'btnEscrow',
                                    margin : '0 5 0 0',
                                    iconCls: 'icon-new',
                                    text   : '[F4] Escrow Payment',
                                        //                        hidden: true,
                                        //                        disabled: true,
                                    bindAction: me.bindPrefixName + 'Escrow'
                                },
                                {
                                    xtype     : 'button',
                                    action    : 'escrowparsial',
                                    align     : 'right',
                                    itemId    : 'btnEscrowparsial',
                                    margin    : '0 5 0 0',
                                    iconCls   : 'icon-new',
                                    text      : 'KPR Schema Payment',
                                    bindAction: me.bindPrefixName + 'Escrowschema'
                                },
                            ],
                        }
                    },
                    {
                        xtype  : 'button',
                        action : 'collection',
                        align  : 'right',
                        itemId : 'btnCollection',
                        id     : 'btnCollection',
                        margin : '0 5 0 0',
                        iconCls: 'icon-new',
                        text   : '[F7] Collection',
                            //                        hidden: true,
                            //                        disabled: true,
                        fieldStyle: 'margin-right:-0px;',
                        bindAction: me.bindPrefixName + 'Collection'
                    },
                        //                    {
                        //                        xtype: 'button',
                        //                        action: 'otherspayment',
                        //                        align: 'right',
                        //                        itemId: 'btnotherspayment',
                        //                        margin: '0 5 0 0',
                        //                        iconCls: 'icon-new',
                        //                        text: '[F9] Others Payment',
                        //                        fieldStyle: 'margin-right:-0px;',
                        //                    },
                ]
            },
            {
                xtype : 'toolbar',
                dock  : 'bottom',
                height: 28,
                items : [
                    {
                        text: 'Process Voucher',
                        menu: {
                            xtype: 'menu',
                            items: [
                                {
                                    xtype     : 'button',
                                    action    : 'payment',
                                    itemId    : 'btnPayment',
                                    margin    : '5 5 5 5',
                                    iconCls   : 'icon-copy',
                                    text      : 'Payment',
                                    textAlign : 'left',
                                    bindAction: me.bindPrefixName + 'Payment'
                                },
                                {
                                    xtype     : 'button',
                                    action    : 'requestunrealization',
                                    itemId    : 'btnRequestUnrealization',
                                    margin    : '5 5 5 5',
                                    icon      : 'app/main/images/icons/help.png',
                                    text      : 'Request Unrealization',
                                    textAlign : 'left',
                                    bindAction: me.bindPrefixName + 'RequestUnrealization'
                                },
                                {
                                    xtype     : 'button',
                                    action    : 'realization',
                                    itemId    : 'btnRealization',
                                    margin    : '5 5 5 5',
                                    iconCls   : 'icon-archive',
                                    text      : 'Realization',
                                    textAlign : 'left',
                                    bindAction: me.bindPrefixName + 'Realization'
                                },
                                {
                                    xtype     : 'button',
                                    action    : 'posting',
                                    itemId    : 'btnPosting',
                                    id        : 'btnPosting',
                                    margin    : '5 5 5 5',
                                    iconCls   : 'icon-edit',
                                    text      : 'Posting',
                                    textAlign : 'left',
                                    bindAction: me.bindPrefixName + 'Posting'
                                },
                                {
                                    xtype     : 'button',
                                    action    : 'unposting',
                                    itemId    : 'btnUnposting',
                                    id        : 'btnUnposting',
                                    margin    : '5 5 5 5',
                                    iconCls   : 'icon-edit',
                                    text      : 'unPosting',
                                    textAlign : 'left',
                                    bindAction: me.bindPrefixName + 'Unposting'
                                },
                            ]
                        }
                    },
                    {
                        text: 'Print',
                        menu: {
                            xtype: 'menu',
                            items: [{
                                    xtype  : 'button',
                                    action : 'printx',
                                    margin : '5 5 5 5',
                                    iconCls: 'icon-pdf',
                                    text   : 'Print PDF'
                                },
                                {
                                    xtype : 'button',
                                    action: 'printVoucher',
                                    margin: '5 5 5 5',
                                        //disabled: true,
                                    text      : 'Voucher',
                                    itemId    : 'btnPrintVoucher',
                                    bindAction: me.bindPrefixName + 'PrintKwitansi'
                                },
                                {
                                    xtype : 'button',
                                    action: 'printVoucherEDC',
                                    margin: '5 5 5 5',
                                        //disabled: true,
                                    text      : 'Voucher (EDC)',
                                    itemId    : 'btnPrintVoucherEDC',
                                    bindAction: me.bindPrefixName + 'Printvoucheredc'
                                },
                                {
                                    xtype     : 'button',
                                    action    : 'printKwitansi',
                                    margin    : '5 5 5 5',
                                    text      : 'Kwitansi',
                                    itemId    : 'btnPrintKwitansi',
                                    ref       : 'Kwitansi',
                                    bindAction: me.bindPrefixName + 'PrintKwitansi'
                                },
                                {
                                    xtype     : 'button',
                                    action    : 'printKwitansiRS',
                                    margin    : '5 5 5 5',
                                    text      : 'Kwitansi RS',
                                    itemId    : 'btnPrintKwitansiRS',
                                    ref       : 'Kwitansi',
                                    bindAction: me.bindPrefixName + 'PrintKwitansi'
                                },
                                {
                                    xtype     : 'button',
                                    action    : 'printKwitansiRSExc',
                                    margin    : '5 5 5 5',
                                    text      : 'Kwitansi RS (Exclude Nominal)',
                                    itemId    : 'btnPrintKwitansiRSExc',
                                    ref       : 'Kwitansi',
                                    bindAction: me.bindPrefixName + 'PrintKwitansi'
                                },
                                {
                                    xtype     : 'button',
                                    action    : 'printKwitansiRangkap',
                                    margin    : '5 5 5 5',
                                    text      : 'Kwitansi 3 Rangkap',
                                    itemId    : 'btnPrintKwitansiRangkap',
                                    bindAction: me.bindPrefixName + 'PrintKwitansi'
                                },
                                {
                                    xtype     : 'button',
                                    action    : 'printKwitansiRangkapWithQr',
                                    margin    : '5 5 5 5',
                                    text      : 'Kwitansi 3 Rangkap (QR Code)',
                                    itemId    : 'btnPrintKwitansiRangkapWithQr',
                                    ref       : 'Kwitansi',
                                    bindAction: me.bindPrefixName + 'PrintKwitansiWithQr'
                                },
                                {
                                    xtype     : 'button',
                                    action    : 'printKwitansiPreprinted',
                                    margin    : '5 5 5 5',
                                    text      : 'Kwitansi Preprinted',
                                    itemId    : 'btnPrintKwitansiPreprinted',
                                    bindAction: me.bindPrefixName + 'PrintKwitansi'
                                },
                                {
                                    xtype     : 'button',
                                    action    : 'printChequePaymentList',
                                    labelAlign: 'right',
                                    margin    : '5 5 5 5',
                                    text      : 'Cheque Payment List',
                                    itemId    : 'PrintChequePaymentList',
                                    bindAction: me.bindPrefixName + 'PrintChequePaymentList'
                                },
                                {
                                    xtype  : 'button',
                                    action : 'preview',
                                    margin : '5 5 5 5',
                                    itemId : 'btnPreview',
                                    iconCls: '',
                                    text   : 'Cheque/Giro',
                                    menu   : [{
                                            text: 'Cheque',
                                            id  : 'parentcheque',
                                            menu: [
                                                { text: 'BCA', id: 'chequebca', ref: 'Cheque BCA' },
                                                { text: 'MEGA', id: 'chequemega', ref: 'Cheque Mega' },
                                                { text: 'MANDIRI', id: 'chequemandiri', ref: 'Cheque Mandiri' },
                                                { text: 'PERMATA', id: 'chequepermata', ref: 'Cheque Permata' },
                                                { text: 'OCBC NISP', id: 'chequeocbcnisp', ref: 'Cheque OCBC Nisp' },
                                                { text: 'COMMONWEALTH', id: 'chequecommon', ref: 'Cheque Commonwealth' },
                                                { text: 'STANDARD CHARTERED', id: 'chequechartered', ref: 'Cheque STANDARD CHARTERED' },
                                                { text: 'DBS', ref: 'Cheque DBS' },
                                                { text: 'PANIN', ref: 'Cheque Panin' },
                                                { text: 'BII', ref: 'Cheque BII' },
                                                { text: 'DANAMON', ref: 'Cheque Danamon' },
                                                { text: 'BRI', ref: 'Cheque BRI' },
                                                { text: 'BNI', ref: 'Cheque BNI' },
                                                { text: 'Niaga', ref: 'Cheque Niaga' },
                                                { text: 'Maybank', ref: 'Cheque Maybank' },
                                                { text: 'BTN', ref: 'Cheque BTN' },
                                                { text: 'BJB', ref: 'Cheque BJB' },
                                                { text: 'BNP', ref: 'Cheque BNP' },
                                                { text: 'INA PEDANA', ref: 'Cheque INA PEDANA' },
                                                { text: 'PERMATA', ref: 'Cheque PERMATA' },
                                                { text: 'GANESHA', ref: 'Cheque Ganesha' },
                                                { text: 'CHINA CONSTRUCTION BANK', ref: 'Cheque China Construction Bank' },
                                                { text: 'UOB', ref: 'Cheque UOB' },
                                                { text: 'NOBU', ref: 'Cheque NOBU' },
                                                { text: 'MAYAPADA', ref: 'Cheque MAYAPADA' },
                                            ]
                                        },
                                        {
                                            text: 'Giro',
                                            id  : 'parentgiro',
                                            menu: [
                                                { text: 'BCA', ref: 'Giro BCA' },
                                                { text: 'MEGA', ref: 'Giro Mega' },
                                                { text: 'MANDIRI', ref: 'Giro Mandiri' },
                                                { text: 'PERMATA', ref: 'Giro Permata' },
                                                { text: 'OCBC NISP', ref: 'Giro OCBC Nisp' },
                                                { text: 'COMMONWEALTH', ref: 'Giro Commonwealth' },
                                                { text: 'STANDARD CHARTERED', ref: 'Giro STANDARD CHARTERED' },
                                                { text: 'DBS', ref: 'Giro DBS' },
                                                { text: 'PANIN', ref: 'Giro Panin' },
                                                { text: 'BII', ref: 'Giro BII' },
                                                { text: 'DANAMON', ref: 'Giro Danamon' },
                                                { text: 'BRI', ref: 'Giro BRI' },
                                                { text: 'BNI', ref: 'Giro BNI' },
                                                { text: 'Niaga', ref: 'Giro Niaga' },
                                                { text: 'Maybank', ref: 'Giro Maybank' },
                                                { text: 'BTN', ref: 'Giro BTN' },
                                                { text: 'BJB', ref: 'Giro BJB' },
                                                { text: 'BNP', ref: 'Giro BNP' },
                                                { text: 'INA PEDANA', ref: 'Giro INA PEDANA' },
                                                { text: 'PERMATA', ref: 'Giro PERMATA' },
                                                { text: 'CHINA CONSTRUCTION BANK', ref: 'Giro China Construction Bank' },
                                                { text: 'GANESHA', ref: 'Giro Ganesha' },
                                                { text: 'NOBU', ref: 'Giro NOBU' },
                                                { text: 'MAYAPADA', ref: 'Giro MAYAPADA' },
                                            ]
                                        },
                                    ]
                                },
                                {
                                    xtype  : 'button',
                                    action : 'previewsetoran',
                                    itemId : 'btnPreviewsetoran',
                                    iconCls: '',
                                    margin : '5 5 5 5',
                                    text   : 'Setoran',
                                    menu   : [{
                                        text: 'Setoran',
                                        id  : 'parentsetoran',
                                        menu: [
                                            { text: 'Setoran BCA', ref: 'Setoran BCA' },
                                            { text: 'Pengiriman BCA', ref: 'Pengiriman BCA' },
                                            { text: 'Kliring Warkat BCA', ref: 'Kliring Warkat BCA' },
                                            { text: 'Kartu Kredit Mandiri', ref: 'Kartu Kredit Mandiri' },
                                            { text: 'Setoran Mandiri', ref: 'Setoran Mandiri' },
                                            { text: 'DBS Slip', ref: 'DBS Slip' },
                                        ]
                                    }, ]
                                },
                                {
                                    xtype     : 'button',
                                    action    : 'printinvoice',
                                    itemId    : 'btnPrintInvoice',
                                    iconCls   : '',
                                    margin    : '5 5 5 5',
                                    text      : 'Print Invoice',
                                    bindAction: me.bindPrefixName + 'PrintInvoice',
                                },
                                {
                                    xtype     : 'button',
                                    action    : 'resetprint',
                                    itemId    : 'btnResetprint',
                                    iconCls   : '',
                                    margin    : '5 5 5 5',
                                    text      : 'Reset Print',
                                    bindAction: me.bindPrefixName + 'Resetprint',
                                },
                                {
                                    xtype     : 'button',
                                    action    : 'resetprintkwitansi',
                                    itemId    : 'btnResetprintkwitansi',
                                    iconCls   : '',
                                    margin    : '5 5 5 5',
                                    text      : 'Reset Print Kwitansi (QR)',
                                    bindAction: me.bindPrefixName + 'Resetprintkwitansi',
                                },
                            ],
                        }
                    },
                    {
                        xtype     : 'button',
                        action    : 'copyvouchern',
                        disabled  : true,
                        margin    : '0 5 0 0',
                        itemId    : 'btnCopyVcr',
                        text      : 'Copy Voucher',
                        bindAction: me.bindPrefixName + 'Copyvoucher'
                    },
                    {
                        xtype     : 'button',
                        action    : 'pindahvouchern',
                        disabled  : true,
                        margin    : '0 5 0 0',
                        itemId    : 'btnPindahPT',
                        text      : 'Pindah PT',
                        bindAction: me.bindPrefixName + 'Pindahpt'
                    },
                    {
                        xtype     : 'button',
                        action    : 'editnokwitansi',
                        disabled  : false,
                        margin    : '0 5 0 0',
                        itemId    : 'btnEditnokwitansi',
                        text      : 'Edit No Kwitansi',
                        bindAction: me.bindPrefixName + 'Editnokwitansi'
                    },
                    {
                        text: 'Voucher AR',
                        menu: {
                            xtype: 'menu',
                            items: [
                                {
                                    xtype     : 'button',
                                    action    : 'edittof7',
                                    disabled  : true,
                                    margin    : '5 5 5 5',
                                    itemId    : 'btnedittof7',
                                    text      : 'Convert to F7',
                                    bindAction: me.bindPrefixName + 'Edittof7'
                                },
                                {
                                    xtype     : 'button',
                                    action    : 'angsurandenda',
                                    disabled  : true,
                                    margin    : '5 5 5 5',
                                    itemId    : 'btnangsurandenda',
                                    text      : 'Pemutihan Denda',
                                    bindAction: me.bindPrefixName + 'Angsurandenda'
                                },
                            ]
                        }
                    },
                    {
                        xtype     : 'button',
                        action    : 'needrevise',
                        disabled  : true,
                        margin    : '0 5 0 0',
                        itemId    : 'needrevise',
                        text      : 'Need Revise Voucher Dept',
                        bindAction: me.bindPrefixName + 'Revisevoucherdept'
                    },
                    {
                        xtype: 'tbspacer',
                        flex : 1
                    },
                    {
                        xtype : 'label',
                        forId : 'myFieldId2',
                        id    : 'info',
                        itemId: 'info',
                        text  : ' ',
                        style : {
                            color   : '#ff0000',
                            fontSize: '11px',
                            size    : '11px',
                            position: 'relative',
                        },
                        margin: '0 10 0 0',
                    },
                    {
                        xtype      : 'pagingtoolbar',
                        dock       : 'bottom',
                        width      : 380,
                        displayInfo: true,
                        store      : this.getStore()
                            //                        ,plugins:Ext.create("PagingToolbarPageSize")
                    },
                ]
            },
        ];
        return dockedItems;
    },
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype    : 'actioncolumn',
            hidden   : true,
            itemId   : 'actioncolumn',
            width    : 100,
            resizable: false,
            align    : 'right',
            hideable : false,
            items    : []
        };
        return ac;
    },
});