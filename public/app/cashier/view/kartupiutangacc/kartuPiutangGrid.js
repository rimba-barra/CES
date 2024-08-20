Ext.define('Cashier.view.kartupiutangacc.kartuPiutangGrid',{
    extend:'Cashier.library.template.view.GridDS2',
    alias:'widget.kartupiutangacckartupiutanggrid',
    store: 'Kartupiutangacckp',
    bindPrefixName:'kartupiutangacckartupiutanggrid',
    itemId: 'kartupiutangacckartupiutanggrid',
    newButtonLabel:'Add New',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            // contextMenu: me.generateContextMenu(),
            // dockedItems: me.generateDockedItems(),
            viewConfig: {

            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            defaults: {
                height: 300,
                hidden:false
            },
            columns: [
                {
                    dataIndex: 'hideparam',
                    hidden: true,
                    value: 'kartupiutang'
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'coa_id',
                    hidden: true
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'kelsub_id',
                    hidden: true
                },
                {
                    xtype: 'rownumberer',
                    width: 30,
                    text: 'No.'
                },
                // {
                //     xtype: 'checkcolumnv2',
                //     dataIndex: 'flag_sj',
                //     width: 70,
                //     align: 'center',
                //     sortable: false,
                //     text: 'SJ',
                //     name: 'flag_sj'
                // },
                // {
                //     xtype: 'checkcolumnv2',
                //     dataIndex: 'flag_pj',
                //     width: 70,
                //     align: 'center',
                //     sortable: false,
                //     text: 'PJ',
                //     name: 'flag_pj',
                // },
                // {
                //     xtype: 'checkcolumnv2',
                //     dataIndex: 'flag_pph_partner',
                //     width: 70,
                //     align: 'center',
                //     sortable: false,
                //     text: 'PPh Partner',
                //     name: 'flag_pph_partner',
                // },
                // {
                //     xtype: 'checkcolumnv2',
                //     dataIndex: 'flag_pph_owner',
                //     width: 70,
                //     align: 'center',
                //     sortable: false,
                //     text: 'PPh Owner',
                //     name: 'flag_pph_owner'
                // },
                {
                    xtype:'gridcolumn',
                    dataIndex: 'unit_number',
                    text: 'Unit Number',
                    width: 90,
                    align: 'center'
                },
                {
                    xtype:'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'periode_date',
                    text: 'Period Date',
                    align: 'center',
                    width: 90,
                },
                {
                    xtype:'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'voucher_date',
                    text: 'Voucher Date',
                    align: 'center',
                    width: 90,
                },
                {
                    xtype:'gridcolumn',
                    dataIndex: 'voucher_no',
                    text: 'Voucher No.',
                    width: 120
                },
                {
                    xtype:'gridcolumn',
                    dataIndex: 'coa',
                    text: 'COA',
                    width: 70,
                    align: 'center'
                },
                {
                    xtype:'gridcolumn',
                    dataIndex: 'description',
                    text: 'Description',
                    width: 250
                },
                {
                    xtype:'gridcolumn',
                    dataIndex: 'type',
                    text: 'Type',
                    width: 90,
                    align: 'center',
                    renderer: function(value, meta, record) {
                        var val = record.get('type');
                        if (val  == 'C') { 
                            return 'CREDIT';
                        }else if (val == 'D') { 
                            return 'DEBIT';
                        }
                        return '';
                    }
                },
                {
                    xtype: 'gridcolumn',
                    dataIndex: 'rate',
                    text: 'Rate (%)',
                    width: 70,
                    align: 'center',
                    renderer: function (val, meta, record) {
                        if (val == 0) {
                            return '';
                        } else {
                            return val;
                        }
                    }
                },
                {
                    xtype:'gridcolumn',
                    dataIndex: 'amount',
                    text: 'Amount',
                    width: 120,
                    align: 'right',
                    renderer: function(value, meta, record) {
                        return Ext.util.Format.number(record.get('amount'), '0,000.00')
                    }
                },
                {
                    xtype:'gridcolumn',
                    dataIndex: 'kelsub',
                    text: 'Sub Group',
                    width: 70,
                    align: 'center'
                },
                {
                    xtype:'datecolumn',
                    format:'d-m-Y H:i:s',
                    dataIndex: 'addon',
                    text: 'Add On',
                    align: 'center',
                    width: 150
                },
                {
                    xtype:'gridcolumn',
                    dataIndex: 'addby_name',
                    text: 'Add By',
                    width: 200
                },
                {
                    xtype:'datecolumn',
                    format:'d-m-Y H:i:s',
                    dataIndex: 'modion',
                    text: 'Modify On',
                    align: 'center',
                    width: 150
                },
                {
                    xtype:'gridcolumn',
                    dataIndex: 'modiby_name',
                    text: 'Modify By',
                    width: 200
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: true,
            items: [
                {
                    text: 'View',
                    iconCls: 'icon-search',
                    bindAction: me.bindPrefixName + 'View',
                    altText: 'View',
                    className:'view',
                    tooltip: 'View',
                    hidden: true
                },
                {
                    text: 'Edit',
                    iconCls: 'icon-pencil',
                    bindAction: me.bindPrefixName + 'Update',
                    altText: 'Edit',
                    className: 'update',
                    tooltip: 'Edit',
                    hidden: true
                },
                {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                    bindAction: me.bindPrefixName + 'Delete',
                    altText: 'Delete',
                    className: 'destroy',
                    tooltip: 'Delete',
                    hidden: true
                },
                {
                    text: 'Kartu Piutang',
                    iconCls: 'icon-form',
                    bindAction: me.bindPrefixName + 'View',
                    altText: 'Kartu Piutang',
                    className:'view',
                    tooltip: 'Kartu Piutang'
                }
            ]
        };
        return ac;
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
                        action: 'create',
                        hidden: false,
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
                        hidden: false,
                        itemId: 'btnDelete',
                        bindAction: me.bindPrefixName + 'Delete',
                        iconCls: 'icon-delete',
                        text: 'Delete Selected'
                    },
                    {
                        xtype: 'button',
                        action: 'generateppn',
                        disabled: false,
                        hidden: false,
                        itemId: 'btnGeneratePPN',
                        bindAction: me.bindPrefixName + 'GeneratePPN',
                        iconCls: '',
                        text: 'Hitung PPN'
                    },
                    {
                        xtype: 'button',
                        action: 'generatepph',
                        disabled: false,
                        hidden: false,
                        itemId: 'btnGeneratePPH',
                        bindAction: me.bindPrefixName + 'GeneratePPH',
                        iconCls: '',
                        text: 'Hitung PPh'
                    },
                    {
                        xtype: 'button',
                        action: 'recalculate',
                        disabled: false,
                        hidden: true,
                        itemId: 'btnRecalculate',
                        bindAction: me.bindPrefixName + 'Recalculate',
                        iconCls: '',
                        text: 'Recalculate'
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
});