Ext.define('Erems.view.ktpiutangfin.Grid', {
    extend: 'Erems.library.template.view.GridDS2',
    alias: 'widget.ktpiutangfingrid',
    storeConfig: {
        id: 'KtpiutangfinGridStore',
        idProperty: 'kartupiutangacc_id',
        extraParams: {
            mode_read: 'all',
            unit_id: 0
        }
    },
    // itemId:'KtpiutangfinGridID',
    bindPrefixName: 'Ktpiutangfin',
    initComponent: function () {
        var me = this;
        var sm = Ext.create('Ext.selection.CheckboxModel', {

        });
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {

            },
            selModel: 'rowmodel',
            plugins: {
                ptype: 'rowediting',
                clicksToEdit: 2,
                autoCancel: false,
                listeners: {
                    'afteredit': function (e, a, b) {
                        _Apps.getController('Ktpiutangfin').ktpfinUpdateGrid();
                    }
                }
            },
            columns: [
                {
                    xtype: 'rownumberer',
                    width: 30
                },
                {
                    text: 'Flag',
                    columns: [
                        {
                            xtype: 'booleancolumn',
                            align: 'center',
                            text: 'SJ',
                            dataIndex: 'flag_sj',
                            falseText: ' ',
                            trueText: '&#10003;',
                            listeners: {
                                beforecheckchange: function () {
                                    return false;
                                },

                            },
                            width: 60,
                            editor: {
                                xtype: 'checkbox',
                                cls: 'x-grid-checkheader-editor',
                                inputValue: true,
                                uncheckedValue: false,
                                listeners: {
                                    change: function (field,newVal,oldVal) {
                                        _Apps.getController('Ktpiutangfin').ktpfinUpdateColumnGrid(field,newVal,oldVal);
                                            
                                    }
                                }
                            }
                        },

                        {
                            xtype: 'booleancolumn',
                            align: 'center',
                            text: 'Pajak Jurnal',
                            dataIndex: 'flag_pj0',
                            falseText: ' ',
                            trueText: '&#10003;',
                            listeners: {
                                beforecheckchange: function () {
                                    return false;
                                },

                            },
                            width: 60,
                            editor: {
                                xtype: 'checkbox',
                                cls: 'x-grid-checkheader-editor',
                                inputValue: true,
                                uncheckedValue: false,
                                listeners: {
                                    change: function (field,newVal,oldVal) {
                                        _Apps.getController('Ktpiutangfin').ktpfinUpdateColumnGrid(field,newVal,oldVal);
                                            
                                    }
                                }
                            }
                        },

                        {
                            xtype: 'booleancolumn',
                            align: 'center',
                            text: 'PPH Partner',
                            dataIndex: 'flag_pph_partner',
                            falseText: ' ',
                            trueText: '&#10003;',
                            listeners: {
                                beforecheckchange: function () {
                                    return false;
                                }
                            },
                            width: 60,
                            editor: {
                                xtype: 'checkbox',
                                cls: 'x-grid-checkheader-editor',
                                inputValue: true,
                                uncheckedValue: false,
                                listeners: {
                                    change: function (field,newVal,oldVal) {
                                        _Apps.getController('Ktpiutangfin').ktpfinUpdateColumnGrid(field,newVal,oldVal);
                                            
                                    }
                                }
                            }
                        },

                        {
                            xtype: 'booleancolumn',
                            align: 'center',
                            text: 'PPH Owner',
                            dataIndex: 'flag_pph_owner',
                            falseText: ' ',
                            trueText: '&#10003;',
                            listeners: {
                                beforecheckchange: function () {
                                    return false;
                                }
                            },
                            width: 60,
                            editor: {
                                xtype: 'checkbox',
                                cls: 'x-grid-checkheader-editor',
                                inputValue: true,
                                uncheckedValue: false,
                                listeners: {
                                    change: function (field,newVal,oldVal) {
                                        _Apps.getController('Ktpiutangfin').ktpfinUpdateColumnGrid(field,newVal,oldVal);
                                            
                                    }
                                }
                            }
                        },
                    ]
                },
                {
                    text: 'Nama',
                    columns: [
                        {
                            text: 'Proyek',
                             dataIndex: 'project_name',
                        },
                        {
                            text: 'PT',
                             dataIndex: 'pt_name',
                        }
                    ]
                },
              
                {
                    text: 'Kode',
                    columns: [
                        {
                            text: 'Kawasan',
                            dataIndex: 'cluster_code',
                        },
                        {
                            text: 'Block',
                            width: 60,
                            dataIndex: 'unit_unit_number',
                        }
                    ]
                },
                {
                    xtype: 'datecolumn',
                    text: 'Tgl. Voucher',
                    dataIndex: 'tgl_vch',
                    format: 'd-m-Y',
                    width: 70
                },
                {
                    text: 'No. Voucher',
                    dataIndex: 'no_vch',
                    width: 100
                },
                {
                    text: 'Kode',
                    columns: [
                        {
                            text: 'Account',
                            dataIndex: 'kode_acc',
                        },
                        {
                            text: 'Sub Account',
                            dataIndex: 'sub_kode_sub',
                        }
                    ]
                },
                {
                    text: 'Keterangan',
                    dataIndex: 'ket',
                    width: 200
                },
                {
                    text: 'Nilai Mutasi',
                    xtype: 'numbercolumn',
                    align: 'right',
                    dataIndex: 'mutasi',
                    width: 100
                },
                {
                    text: 'DC (Debet/Credit)',
                    dataIndex: 'sts_mutasi',
                    width: 100
                },
                {
                    text: 'Flag Sub Account',
                    dataIndex: 'flag_sub',
                    width: 100
                },
                {
                    text: 'Tanggal',
                    columns: [
                        {
                            text: 'Tambah',
                            xtype: 'datecolumn',
                            format: 'd-m-Y',
                            dataIndex: 'addonx',
                        },
                        {
                            text: 'Ubah',
                            xtype: 'datecolumn',
                            format: 'd-m-Y',
                            dataIndex: 'modionx',
                        }
                    ]
                },
                {
                    text: 'User',
                    columns: [
                        {
                            text: 'Tambah',
                  
                            dataIndex: 'addbyx',
                        },
                        {
                            text: 'Ubah',
                            dataIndex: 'Modion',
                            dataIndex: 'modibyx',
                        }
                    ]
                },
                        //  me.generateActionColumn()
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
                        xtype: 'label',
                        text: '',
                        width: 400
                    },
                    {
                        xtype: 'button',
                        text: 'Tarik Data',
                        iconCls: 'icon-new',
                        action: 'tarik_data'

                    },
                    {
                        xtype: 'button',
                        text: 'Batal Data',
                        iconCls: 'icon-new',
                        action: 'batal_data'

                    },
                    {
                        xtype: 'label',
                        id: 'KtPiutanglabelToolbarID',
                        text: '',
                        width: 300
                    },
                    {
                        xtype: 'button',
                        iconCls: 'icon-print',
                        text: 'Print',
                        action: 'print'

                    },
                    '->',
                    {
                        xtype: 'label',
                        text: 'DATA KARTU PIUTANG'
                    }
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            },
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: []
        };
        return ac;
    },
});
