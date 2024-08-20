/// Create by Erwin.S 15042021
Ext.define('Erems.view.popuppurchaseletterreward.Grid', {
    extend         : 'Erems.library.template.view.Grid',
    alias          : 'widget.popuppurchaseletterrewardgrid',
    store          : 'Popuppurchaseletterreward',
    bindPrefixName : '',
    newButtonLabel : 'New',
    initComponent  : function () {
        var me = this;

        Ext.applyIf(me, {
            contextMenu : me.generateContextMenu(),
            dockedItems : me.generateDockedItems(),
            viewConfig  : {},
            selModel    : {},
            defaults    : {
                xtype : 'gridcolumn',
                width : 100,
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    header: 'Purchaseletter ID',
                    dataIndex: 'purchaseletter_id',
                    hidden: true
                },
                {
                    xtype: 'booleancolumn',
                    header: 'Auto SMS',
                    dataIndex: 'is_auto_sms',
                    hidden: true,
                    width: 60,
                    renderer: me.inlineEditSMS
                },
                {
                    xtype: 'booleancolumn',
                    header: 'Not Allowed SP',
                    dataIndex: 'is_not_allowed_sp',
                    hidden: true,
                    width: 80,
                    renderer: me.inlineEditSP
                },
                //endedited
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    align: 'right',
                    dataIndex: 'kawasan',
                    text: 'Kawasan'
                }, {
                    xtype: 'gridcolumn',
                    width: 70,
                    dataIndex: 'unit_number',
                    hideable: false,
                    text: 'Unit Number'
                },
                {
                    xtype: 'booleancolumn',
                    header: 'Insentif Pajak',
                    dataIndex: 'is_nonppn',
                    itemId: 'is_nonppn',
                    hidden: true,
                    width: 80,
                    renderer: me.inlineEditPAJAK
                },
                {
                    xtype: 'booleancolumn',
                    header: 'Vida',
                    dataIndex: 'is_vida',
                    itemId: 'is_vida',
                    hidden: true,
                    width: 40,
                    renderer: me.inlineEditVIDA
                },
                {
                    xtype: 'booleancolumn',
                    header: 'Fest 40',
                    dataIndex: 'is_ciputrafest40',
                    itemId: 'is_ciputrafest40',
                    hidden: true,
                    width: 50,
                    renderer: me.inlineEditFEST40
                },
                {
                    xtype: 'gridcolumn',
                    width: 70,
                    dataIndex: 'type',
                    hideable: false,
                    text: 'Type'
                }, 
                {
                    xtype: 'datecolumn',
                    width: 100,
                    dataIndex: 'tgl_pesanan',
                    format: 'd-m-Y',
                    hideable: false,
                    text: 'Tgl. Pesanan'
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 120,
                    dataIndex: 'no_pesanan',
                    hideable: false,
                    text: 'No. Pesanan'
                }, 
                {
                    xtype: 'numbercolumn',
                    width: 100,
                    dataIndex: 'harga_jual',
                    hideable: false,
                    align: 'right',
                    text: 'Harga Jual'
                }, 
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'customer_name',
                    hideable: false,
                    text: 'Customer Name'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'last_owner',
                    hideable: false,
                    text: 'Last Owner'
                },
                {
                    xtype: 'numbercolumn',
                    width: 100,
                    dataIndex: 'total_payment',
                    hideable: false,
                    align: 'right',
                    text: 'Total Payment'
                }, 
                {
                    xtype: 'numbercolumn',
                    width: 50,
                    dataIndex: 'persen_payment',
                    hideable: false,
                    align: 'right',
                    text: '% Pay'
                }, 
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_sales_name',
                    width: 100,
                    dataIndex: 'salesman_employee_name',
                    hideable: false,
                    text: 'Sales Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_reward',
                    dataIndex: 'reward',
                    text: 'Reward'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_group_name',
                    dataIndex: 'group_name',
                    text: 'Group'
                },
                {
                    xtype: 'numbercolumn',
                    itemId: 'colms_amount',
                    dataIndex: 'amount',
                    text: 'Amount',
                    align: 'right'
                },
                {
                    xtype: 'datecolumn',
                    itemId: 'colms_addon',
                    dataIndex: 'Addon',
                    text: 'Tanggal Simpan',
                    type: 'date',
                    format: 'd-m-Y',
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_notes',
                    dataIndex: 'notes',
                    text: 'Note'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'nomor_im_fp',
                    text: 'Nomor IM/FP',
                },
                {
                    xtype     : 'datecolumn',
                    dataIndex : 'tanggal_im_fp',
                    text      : 'Tanggal IM/FP',
                    type      : 'date',
                    format    : 'd-m-Y',
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'user_date_check',
                    text: 'Tanggal Cek',
                    type: 'date',
                    format: 'd-m-Y',
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'user_check_name',
                    text: 'User Cek'
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'user_date_proses',
                    text: 'Tanggal Proses',
                    type: 'date',
                    format: 'd-m-Y',
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'user_proses_name',
                    text: 'User Proses'
                },
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'button',
                        action: 'export_excel',
                        itemId: 'btnExport',
                        margin: '0 5 0 0',
                        iconCls: 'icon-print',
                        text: 'Export Excel'
                    }
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
    inlineEditSMS: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'is_auto_sms';
        return this.comboBoxFieldGen(name, record, true);
    },
    inlineEditSP: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'is_not_allowed_sp';
        return this.comboBoxFieldGen(name, record, true);
    },
    inlineEditPAJAK: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'is_nonppn';
        return this.comboBoxFieldGen(name, record, true);
    },
    inlineEditVIDA: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'is_vida';
        return this.comboBoxFieldGen(name, record, true);
    },
    inlineEditFEST40: function (val, meta, record, rowIndex, colIndex, store) {
        name = 'is_ciputrafest40';
        return this.comboBoxFieldGen(name, record, true);
    },
    comboBoxFieldGen: function (name, record, enable) {
        if (record.get(name)) {
            if (enable) {
                var a = '<input type="checkbox" name="' + name + '" data=' + record.get("purchaseletter_id") + ' checked />';
            } else {
                var a = '&#10003;';
            }
        } else {
            if (enable) {
                var a = '<input type="checkbox" name="' + name + '" data=' + record.get("purchaseletter_id") + ' />';
            } else {
                var a = '';
            }
        }
        return a;
    }
});
