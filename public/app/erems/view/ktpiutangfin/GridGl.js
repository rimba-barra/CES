Ext.define('Erems.view.ktpiutangfin.GridGl', {
    extend: 'Erems.library.template.view.GridDS2',
    alias: 'widget.ktpiutangfingridgl',
    storeConfig: {
        id: 'KtpiutangfinGridGlStore',
        idProperty: 'rowNumber',
        extraParams: {
            mode_read: 'panelinit'
        }
    },
    bindPrefixName: 'Ktpiutangfin',
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
                    width: 30
                },
                {
                    xtype: 'gridcolumn',
                    width: 70,
                    dataIndex: 'kode_proyek',
                    text: 'Kode Proyek'
                },
                {
                    xtype: 'gridcolumn',
                    width: 50,
                    dataIndex: 'kode_pt',
                    text: 'Kode PT'
                },
                {
                    xtype: 'gridcolumn',
                    width: 200,
                    dataIndex: 'kode_pt',
                    text: 'Nama PT'
                },
                {
                    xtype: 'datecolumn',
                    format: 'd-m-Y',
                    width: 70,
                    dataIndex: 'tgl_vch',
                    text: 'Tgl Voucher'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'no_vch',
                    text: 'No. Voucher'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'kode_acc',
                    text: 'Kode Account'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'sub_kode_sub',
                    text: 'Kode Sub Account'
                },
                {
                    xtype: 'gridcolumn',
                    width: 250,
                    dataIndex: 'ket',
                    text: 'Keterangan'
                },
                {
                    xtype: 'numbercolumn',
                    width: 100,
                    align:'right',
                    dataIndex: 'mutasi',
                    text: 'Nilai Mutasi'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'sts_mutasi',
                    text: 'D/C (Debit/Credit)'
                },
                {
                    xtype: 'gridcolumn',
                    width: 100,
                    dataIndex: 'flag_sub',
                    text: 'Flag Sub Account'
                }
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;

        var years = [];
        var currentDate = new Date();

        var yDate = currentDate.getFullYear();

        for (var i = (yDate - 7); i <= (yDate + 7); i++) {

            years.push({
                "number": i, "name": i
            });
        }
        ////
        var yearStore = Ext.create('Ext.data.Store', {
            fields: ['number', 'name'],
            data: years
        });

        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        xtype: 'combobox',
                        queryMode: 'local',
                        fieldLabel: 'Tahun GL',
                        name: 'year',
                        displayField: 'name',
                        valueField: 'number',
                        value: yDate,
                        store: yearStore
                    },
                    '->',
                    {
                        xtype:'label',
                        text:'DATA GL',
                      //  bodyStyle: 'font-weight:bold,font-size:10px',
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
