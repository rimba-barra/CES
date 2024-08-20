Ext.define('Erems.view.formundanganajb.GridDetail', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.formundanganajbgriddetail',
    store: 'Formundanganajbdetail',
    //bindPrefixName: 'Bankkprakad',
    //newButtonLabel: 'Add New Confirmation',
    height: 150,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            plugins: [
                Ext.create('Ext.grid.plugin.CellEditing', {
                    ptype: 'cellediting',
                    clicksToEdit: 1
                })
            ],
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_hgbajb_undangan_id',
                    dataIndex: 'hgbajb_undangan_id',
                    hidden: true,
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_undangan_date',
                    width: 100,
                    dataIndex: 'undangan_date',
                    hideable: false,
                    text: 'Tanggal Undangan',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_nomor_undangan',
                    width: 100,
                    dataIndex: 'nomor_undangan',
                    hideable: false,
                    text: 'Nomor Undangan',
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_janjian_ajb_date',
                    width: 107,
                    dataIndex: 'janjian_ajb_date',
                    hideable: false,
                    text: 'Tanggal Janjian AJB',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_respon',
                    width: 200,
                    dataIndex: 'respon',
                    hideable: false,
                    text: 'Respon',
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_gotEmail',
                    width: 97,
                    dataIndex: 'isGotEmail',
                    hideable: false,
                    text: 'Memiliki Email',
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_email_1_date',
                    width: 100,
                    dataIndex: 'email_1_date',
                    hideable: false,
                    text: 'Tanggal Email 1',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_email_2_date',
                    width: 100,
                    dataIndex: 'email_2_date',
                    hideable: false,
                    text: 'Tanggal Email 2',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_email_3_date',
                    width: 100,
                    dataIndex: 'email_3_date',
                    hideable: false,
                    text: 'Tanggal Email 3',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_email_4_date',
                    width: 100,
                    dataIndex: 'email_4_date',
                    hideable: false,
                    text: 'Tanggal Email 4',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_surat_1_date',
                    width: 100,
                    dataIndex: 'surat_1_date',
                    hideable: false,
                    text: 'Tanggal Surat 1',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_surat_2_date',
                    width: 100,
                    dataIndex: 'surat_2_date',
                    hideable: false,
                    text: 'Tanggal Surat 2',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_surat_3_date',
                    width: 100,
                    dataIndex: 'surat_3_date',
                    hideable: false,
                    text: 'Tanggal Surat 3',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_surat_4_date',
                    width: 100,
                    dataIndex: 'surat_4_date',
                    hideable: false,
                    text: 'Tanggal Surat 4',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_wa_1_date',
                    width: 120,
                    dataIndex: 'wa_1_date',
                    hideable: false,
                    text: 'Tanggal Whatsapp 1',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_wa_2_date',
                    width: 120,
                    dataIndex: 'wa_2_date',
                    hideable: false,
                    text: 'Tanggal Whatsapp 2',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_wa_3_date',
                    width: 120,
                    dataIndex: 'wa_3_date',
                    hideable: false,
                    text: 'Tanggal Whatsapp 3',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_wa_4_date',
                    width: 120,
                    dataIndex: 'wa_4_date',
                    hideable: false,
                    text: 'Tanggal Whatsapp 4',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description_undangan',
                    width: 230,
                    dataIndex: 'description_undangan',
                    hideable: false,
                    text: 'Keterangan'
                },

                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },

    generateDockedItems: function () {

        var me = this;

        var dockedItems = [
            /*{
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
                        bindAction: me.bindPrefixName+'Create',
                        text: me.newButtonLabel
                    }
                ]
            },*/
            /*{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }*/
        ];
        return dockedItems;
    },

    generateActionColumn: function () {

        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            //hidden: true,
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'center',
            hideable: false,
            items: [

                {
                    tooltip: 'Edit',
                    icon: document.URL + 'app/main/images/icons/edit.png',
                    handler: function (view, rowIndex, colIndex, item, e, record, row) {
                        this.fireEvent('editaction', arguments);
                        //console.log(arguments);
                    }
                },

                {
                    tooltip: 'Delete',
                    icon: document.URL + 'app/main/images/icons/delete.png',
                    handler: function (view, rowIndex, colIndex, item, e, record, row) {
                        this.fireEvent('deleteaction', arguments);
                    }
                }
            ]
        };
        return ac;
    }


});