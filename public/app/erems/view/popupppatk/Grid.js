/// Create by Rico 15072021
Ext.define('Erems.view.popupppatk.Grid', {
    extend         : 'Erems.library.template.view.Grid',
    alias          : 'widget.popupppatkgrid',
    store          : 'Popupppatk',
    bindPrefixName : '',
    newButtonLabel : 'New',
    initComponent  : function () {
        var me = this;
        var rowEditing = Ext.create('Ext.grid.plugin.RowEditing', {
            clicksToMoveEditor: 1,
            autoCancel: false,
            rowIndex: -1,
            listeners: {
                beforeedit: function (cellEditor, context, eOpts) {
                    rowIndex = context.rowIdx;
                    context.column.getEditor().on('focus', function (field) {
                    }, this, { delay: 1 });
                },
                edit: function (record, row, grid) { // added by rico 17032023
                    var store = me.getStore();
                    var recStore = store.getAt(rowIndex);

                    var myObj = {
                        purchaseletter_id: recStore.data.purchaseletter_id,
                        addon: row.newValues.ppatk_addon,
                        addby: apps.uid
                    }

                    Ext.Ajax.request({
                        url: 'erems/popupmaster/read',
                        params: {
                            popup_type: 'ppatkLapor',
                            data: Ext.encode(myObj)
                        },
                        success: function (response) {
                            if (Ext.decode(response.responseText).success == true) {
                                Ext.Msg.show({
                                    title: 'Success',
                                    msg: 'Data saved successfully.',
                                    icon: Ext.Msg.INFO,
                                    buttons: Ext.Msg.OK,
                                    fn: function () {
                                        store.reload();
                                    }
                                });
                            } else {
                                Ext.Msg.show({
                                    title: 'Failure',
                                    msg: 'Error: Unable to save data.',
                                    icon: Ext.Msg.ERROR,
                                    buttons: Ext.Msg.OK
                                });
                            }
                        },
                    });
                }
            }
        });

        Ext.applyIf(me, {
            contextMenu : me.generateContextMenu(),
            dockedItems : me.generateDockedItems(),
            plugins     : [rowEditing],
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
                    itemId    : 'colms_cluster',
                    dataIndex : 'cluster',
                    text      : 'Cluster',
                    width     : 80,
                },
                {
                    itemId    : 'colms_unit_number',
                    dataIndex : 'unit_number',
                    text      : 'Unit Number',
                    width     : 80,
                },
                {
                    itemId    : 'colms_customer_name',
                    dataIndex : 'customer_name',
                    text      : 'Customer Name'
                },
                {
                    itemId    : 'colms_NIK',
                    dataIndex : 'NIK',
                    text      : 'NIK'
                },
                {
                    itemId    : 'colms_customer_npwp',
                    dataIndex : 'customer_npwp',
                    text      : 'NPWP'
                },
                {
                    itemId    : 'colms_ppatk_addon',
                    dataIndex : 'ppatk_addon',
                    text      : 'Tgl. Lapor',
                    width     : 80,
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y'),
                    align     : 'center',
                    editor: { // added by rico 16032023
                        xtype: 'datefield',
                        name: 'user_ppatk_addon',
                        allowBlank: true,
                        format: 'd/m/Y',
                        listeners: {
                            change: function (el) {
                                var store = me.getStore();
                                var recStore = store.getAt(rowIndex);

                                recStore.beginEdit();
                                recStore.set("ppatk_addon", el.getValue());
                                recStore.endEdit();

                                recStore.beginEdit();
                                recStore.set("ppatk_addby", apps.uid);
                                recStore.endEdit();

                                recStore.beginEdit();
                                recStore.set("ppatk_addby_name", apps.username);
                                recStore.endEdit();
                            }
                        }
                    }
                },
                {
                    itemId    : 'colms_ppatk_addby',
                    dataIndex : 'ppatk_addby_name',
                    text      : 'User Lapor',
                    width     : 80,
                },
                {
                    itemId    : 'colms_jenis_kelamin',
                    dataIndex : 'jenis_kelamin',
                    text      : 'Jenis Kelamin'
                },
                {
                    itemId    : 'colms_customer_address',
                    dataIndex : 'customer_address',
                    text      : 'Alamat'
                },
                {
                    itemId    : 'colms_KTP_address',
                    dataIndex : 'KTP_address',
                    text      : 'Alamat KTP'
                },
                {
                    itemId    : 'colms_birthplace',
                    dataIndex : 'birthplace',
                    text      : 'Tempat Lahir'
                },
                {
                    itemId    : 'colms_birthdate',
                    dataIndex : 'birthdate',
                    text      : 'Tgl. Lahir',
                    width     : 80,
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y'),
                    align     : 'center'
                },
                {
                    itemId    : 'colms_nationality',
                    dataIndex : 'nationality',
                    text      : 'Negara'
                },
                {
                    itemId    : 'colms_firstpurchase_date',
                    dataIndex : 'firstpurchase_date',
                    text      : 'First<br>Purchase Date',
                    width     : 80,
                    renderer  : Ext.util.Format.dateRenderer('d-m-Y'),
                    align     : 'center'
                },
                {
                    itemId    : 'colms_pricetype',
                    dataIndex : 'pricetype',
                    text      : 'Price Type'
                },
                {
                    xtype     : 'numbercolumn',
                    itemId    : 'colms_harga_total_jual',
                    dataIndex : 'harga_total_jual',
                    text      : 'Harga Total Jual',
                    width     : 70,
                    align     : 'center'
                },
                {
                    itemId    : 'colms_purpose',
                    dataIndex : 'purpose',
                    text      : 'Jenis Barang'
                },
                {
                    itemId    : 'colms_description',
                    dataIndex : 'description',
                    text      : 'Deskripsi'
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
                        itemId: 'btnPrint',
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
    }
});
