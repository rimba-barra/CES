Ext.define('Hrd.view.personalselfservice.GridDocument', {
    extend: 'Ext.grid.Panel',
    alias: 'widget.personaldocumentgrid',
    store: 'Document',
    bindPrefixName: 'Personalselfservice',
    itemId: 'Personalselfservice',
    title: 'DATA PERSONAL DOCUMENT',
    uniquename: '_personaldocumentgrid',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dokumen_kk',
                    dataIndex: 'dokumen_kk',
                    width: 190,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Kartu Keluarga'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dokumen_ktp',
                    dataIndex: 'dokumen_ktp',
                    width: 190,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'KTP'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dokumen_npwp',
                    dataIndex: 'dokumen_npwp',
                    width: 190,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'NPWP'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dokumen_bpjs_pp',
                    dataIndex: 'dokumen_bpjs_pp',
                    width: 190,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'BPJS Jaminan Pensiun'
                },               
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dokumen_bpjs_k',
                    dataIndex: 'dokumen_bpjs_k',
                    width: 190,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'BPJS Kesehatan'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dokumen_bpjs_kk',
                    dataIndex: 'dokumen_bpjs_kk',
                    width: 190,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'BPJS Ketenagakerjaan'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dokumen_ijazah',
                    dataIndex: 'dokumen_ijazah',
                    width: 190,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Ijazah'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dokumen_manulife_p',
                    dataIndex: 'dokumen_manulife_p',
                    width: 190,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Manulife'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dokumen_rekening',
                    dataIndex: 'dokumen_rekening',
                    width: 190,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'No. Rekening'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dokumen_asuransi',
                    dataIndex: 'dokumen_asuransi',
                    width: 190,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Asuransi Swasta'
                },
                //added by michael 09/08/2021
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dokumen_vaksin1',
                    dataIndex: 'dokumen_vaksin1',
                    width: 190,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Vaksin Covid 1'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dokumen_vaksin2',
                    dataIndex: 'dokumen_vaksin2',
                    width: 190,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Vaksin Covid 2'
                },
                //end added by michael 09/08/2021
                //added by anas 10022022
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dokumen_vaksin3',
                    dataIndex: 'dokumen_vaksin3',
                    width: 190,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Vaksin Covid 3'
                },

                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dokumen_pas_foto',
                    dataIndex: 'dokumen_pas_foto',
                    width: 190,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Pas Foto'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dokumen_stnk',
                    dataIndex: 'dokumen_stnk',
                    width: 190,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'STNK'
                },

                me.generateActionColumn()
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
//                    {
//                        xtype: 'button',
//                        action: 'view',
//                        hidden: true,
//                        itemId: 'btnView',
//                        margin: '0 5 0 0',
//                        iconCls: 'icon-new',
//                        bindAction: me.bindPrefixName + 'Read',
//                        text: 'View Data'
//                    }

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
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 50,
            hidden: false,
            resizable: false,
            align: 'right',
            items: [
//                {
//                    defaultIcon: 'icon-edit',
//                    iconCls: ' ux-actioncolumn icon-edit act-update',
//                    action: 'update',
//                    altText: 'Edit',
//                    tooltip: 'Edit'
//                },
//                {
//                    defaultIcon: 'icon-delete',
//                    action: 'destroy',
//                    iconCls: 'ux-actioncolumn icon-delete act-destroy',
//                    altText: 'Delete',
//                    tooltip: 'Delete'
//                }
            ]
        }

        return ac;

    },

});




