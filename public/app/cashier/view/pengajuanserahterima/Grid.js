Ext.define('Cashier.view.pengajuanserahterima.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.pengajuanserahterimagrid',
    store: 'Pengajuanserahterima',
    bindPrefixName: 'Pengajuanserahterima',
    itemId: 'PengajuanserahterimaGrid',
    title: 'Pengajuan Serah Terima',
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
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_cluster_name',
                    width: 200,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'cluster_name',
                    hideable: false,
                    text: 'Cluster'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_unit_number',
                    dataIndex: 'unit_number',
                    titleAlign: 'left',
                    align: 'left',
                    width: 200,
                    hideable: false,
                    text: 'Unit No'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_rencana_serahterima_date',
                    dataIndex: 'rencana_serahterima_date',
                    titleAlign: 'left',
                    align: 'left',
                    width: 200,
                    hideable: false,
                    text: 'Tanggal ST',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                    renderer: function (value, metaData, record, row, col, store, gridView) {
                        if (moment(record.get('rencana_serahterima_date')).format("DD-MM-YYYY") == "01-01-1900") {
                            return '-';
                        } else {
                            return moment(record.get('rencana_serahterima_date')).format("DD-MM-YYYY");
                        }

                    },
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_rencana_serahterima_aju_date',
                    dataIndex: 'rencana_serahterima_aju_date',
                    titleAlign: 'left',
                    align: 'left',
                    width: 130,
                    hideable: false,
                    text: 'Tanggal ST Diajukan',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                    renderer: function (value, metaData, record, row, col, store, gridView) {
                        if (moment(record.get('rencana_serahterima_aju_date')).format("DD-MM-YYYY") == "01-01-1900") {
                            return '-';
                        } else {
                            return moment(record.get('rencana_serahterima_aju_date')).format("DD-MM-YYYY");
                        }

                    },
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_addon',
                    dataIndex: 'addon',
                    titleAlign: 'left',
                    align: 'left',
                    width: 130,
                    hideable: false,
                    text: 'Addon',
                    renderer: Ext.util.Format.dateRenderer('d-m-Y'),
                    renderer: function (value, metaData, record, row, col, store, gridView) {
                        return moment(record.get('addon')).format("DD-MM-YYYY");
                    },
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_addby',
                    dataIndex: 'createdby',
                    titleAlign: 'left',
                    align: 'left',
                    width: 130,
                    hideable: false,
                    text: 'Addby'
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
                    {
                        text: 'Add New',
                        itemId: 'btnAdd',
                        action: 'create',
                        iconCls: 'icon-add',
                        bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        text: 'Edit',
                        itemId: 'btnEdit',
                        action: 'update',
                        iconCls: 'icon-edit',
                        disabled: true,
                        bindAction: me.bindPrefixName + 'Update'
                    },
                    {
                        text: 'Delete Selected',
                        itemId: 'btnDelete',
                        action: 'destroy',
                        iconCls: 'icon-delete',
                        disabled: true,
                        bindAction: me.bindPrefixName + 'Delete'
                    }
                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                id: 'pagingpengajuanserahterima',
                width: 360,
                displayInfo: true,
                store:'Pengajuanserahterima'
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
                {
                    defaultIcon: 'icon-edit',
                    itemId: 'btnEdit',
                    iconCls: ' ux-actioncolumn icon-edit act-update',
                    action: 'update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    defaultIcon: 'icon-delete',
                    itemId: 'btnDelete',
                    action: 'destroy',
                    iconCls: 'ux-actioncolumn icon-delete act-destroy',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }
            ]
        }

        return ac;

    },
});


