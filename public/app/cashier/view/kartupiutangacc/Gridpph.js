Ext.define('Cashier.view.kartupiutangacc.Gridpph', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.kartupiutangaccgridpph',
    store: 'Kartupiutangaccpph',
    bindPrefixName: 'kartupiutangaccgridpph',
    itemId: 'kartupiutangaccgridpph',
    title: 'Hitung PPh',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            features: [
                {
                    ftype: 'summary',
                }
            ],
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    clicksToEdit: 1,
                    listeners : {
                        edit : function(editor, e) {
                            var rate_pph = e.record.get('pph_rate');
                            var dpp = e.record.get('dpp');
                            var pph = parseFloat(dpp) * (parseFloat(rate_pph) / 100);
                            e.record.set('pph', pph);
                        }
                    }
                })
            ],
            columns: [
                {
                    xtype: 'rownumberer'
                },
                me.generateActionColumn(),
                {
                    xtype: 'gridcolumn',
                    itemId: 'kartupiutang_id',
                    hidden: true,
                    dataIndex: 'kartupiutang_id'
                },
                {
                    xtype: 'datecolumn',
                    itemId: 'voucher_date',
                    dataIndex: 'voucher_date',
                    text: 'Date',
                    format: 'd-m-Y',
                    align: 'center'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'voucher_no',
                    text: 'Voucher No.',
                    align: 'center',
                    width: 150
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'description',
                    text: 'Description',
                    width: 300
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'pph_rate',
                    text: 'Rate PPh (%)',
                    width: 100,
                    align: 'center',
                    editor: {
                        xtype: 'textfield'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'mutasi',
                    text: 'Mutasi',
                    width: 150,
                    align: 'right',
                    renderer: function(value, meta, record) {
                        return Ext.util.Format.number(record.get('mutasi'), '0,000.00')
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'dpp',
                    text: 'DPP',
                    width: 150,
                    align: 'right',
                    renderer: function(value, meta, record) {
                        return Ext.util.Format.number(record.get('dpp'), '0,000.00')
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'pph',
                    text: 'PPh',
                    width: 150,
                    align: 'right',
                    renderer: function(value, meta, record) {
                        return Ext.util.Format.number(record.get('pph'), '0,000.00')
                    }
                },
                {
                    xtype: 'datecolumn',
                    dataIndex: 'voucher_date_pph',
                    text: 'Voucher Date PPh',
                    align: 'center',
                    format: 'd-m-Y',
                    editor: {
                        xtype: 'datefield',
                        format: 'd-m-Y',
                        submitFormat: 'Y-m-d'
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'nomor_bukti_pph',
                    text: 'Nomor Bukti PPh',
                    align: 'center',
                    width: 150,
                    editor: {
                        xtype: 'textfield'
                    }
                }
            ]
        });

        me.callParent(arguments);
    }
});


