/*
Ext.define('Erems.view.purchaseletterSH2.Komisigrid', {
    extend: 'Erems.library.template.view.Grid',
    alias: 'widget.purchaseletterSH2komisigrid',
    store: 'Komisi',
    bindPrefixName:'PurchaseletterSH2',
    height: 300,
    width : 500,
    initComponent: function() {
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
                    xtype: 'gridcolumn',
                    itemId: 'colms_komisi_pencairan_detail_id',
                    // width: 100,
                    dataIndex: 'komisi_pencairan_detail_id',
                    // hideable: false,
                    text: ' '
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_penerima_komisi',
                    // width: 100,
                    dataIndex: 'penerima_komisi',
                    // hideable: false,
                    text: 'Penerima Komisi'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_employee_name',
                    // width: 100,
                    dataIndex: 'employee_name',
                    // hideable: false,
                    text: 'Nama Karyawan'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_persentase',
                    // width: 100,
                    dataIndex: 'persentase',
                    // hideable: false,
                    text: 'Persentase'
                }
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
                        action: 'create',
                        itemId: 'btnNew',
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        bindAction: me.bindPrefixName + 'Create',
                        text: 'Add'
                    }
                ]
            }
        ];
        return dockedItems;
    }
});
*/

Ext.define('Erems.view.purchaseletterSH2.Komisigrid', {
    //extend: 'Ext.grid.Panel',
    alias: 'widget.purchaseletterSH2komisigrid',
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'KomisiGridStore',
        idProperty: 'komisi_pencairan_id',
        extraParams: {
            mode_read: 'komisi'
        }
    },
    // requires: [
    //     'Erems.template.ComboBoxFields'
    // ],
    bindPrefixName: 'PurchaseletterSH2',
    newButtonLabel: 'New Purchaseletter_no',
    height: 200,
    columnLines: true,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            // plugins: [rowEditing],
            viewConfig: {
                // stripeRows: true
            },
            // selModel: Ext.create('Ext.selection.CheckboxModel', {

            // }),
            columns: [
                {
                    xtype: 'rownumberer'

                },
                {
                    xtype: 'gridcolumn',
                    hidden:true,
                    dataIndex: 'komisi_pencairan_detail_id',
                    name: 'komisi_pencairan_detail_id'
                },
                {
                    xtype: 'gridcolumn',
                    hidden:true,
                    dataIndex: 'komisi_penerima_id',
                    name: 'komisi_penerima_id'
                },
                {
                    xtype: 'gridcolumn',
                    hidden:true,
                    dataIndex: 'populated_data',
                    name: 'populated_data'
                },
                {
                    xtype: 'gridcolumn',
                    hidden:true,
                    dataIndex: 'reff_id',
                    name: 'reff_id'
                },
                {
                    xtype: 'gridcolumn',
                    hidden:true,
                    dataIndex: 'reff_value',
                    name: 'reff_value'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_penerima_komisi',
                    width: 90,
                    dataIndex: 'penerima_komisi',
                    hideable: false,
                    text: 'Penerima Komisi'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_employee_name',
                    width: 90,
                    dataIndex: 'reff_name',
                    hideable: false,
                    text: 'Nama Karyawan'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_persentase',
                    width: 90,
                    dataIndex: 'persentase',
                    hideable: false,
                    text: 'Persentase'
                },
                  // me.generateActionColumn()
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
                    // {
                    //     xtype: 'button',
                    //     action: 'create',
                    //     margin: '0 5 0 0',
                    //     iconCls: 'icon-new',
                    //     text: 'Add New Penerima Komisi'
                    // }
                ]
            }
        ];
        return dockedItems;
    }
    ,generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            itemId: 'actioncolumn',
            width: 50,
            resizable: false,
            align: 'right',
            hideable: false,
            items: [
                {
                    text: 'Edit',
                    iconCls: 'icon-edit',
                        action: 'Update',
                    // bindAction: me.bindPrefixName+'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    text: 'Delete',
                    iconCls: 'icon-delete',
                        action: 'Delete',
                    // bindAction: me.bindPrefixName+'Delete',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }
            ]
        };
        return ac;
    },
});

/*
Ext.define('Erems.view.purchaseletterSH2.Komisigrid', {
    //extend: 'Ext.grid.Panel',
    alias: 'widget.purchaseletterSH2komisigrid',
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'ScheduleGridStore',
        idProperty: 'schedule_id',
        extraParams: {
            mode_read: 'schedule'
        }
    },
    //  store: 'Schedule',
    requires: [
        'Erems.template.ComboBoxFields'
                //  'Erems.library.template.component.Sourcemoneycombobox'
    ],
    bindPrefixName: 'PurchaseletterSH2',
    newButtonLabel: 'New Purchaseletter_no',
    height: 200,
    columnLines: true,
    // plugins: [
    //     Ext.create('Ext.grid.plugin.CellEditing', {
    //         clicksToEdit: 1
    //     })
    // ],
    initComponent: function() {
        var me = this;
        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            //contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            // plugins: [rowEditing],
            viewConfig: {
                stripeRows: true
            },
            columns: [
                {
                    xtype: 'rownumberer'

                },
                {
                    xtype: 'datecolumn',
                    type: 'date',
                    itemId: 'colms_code',
                    width: 90,
                    format: 'd-m-Y',
                    dataIndex: 'duedate',
                    hideable: false,
                    text: 'Duedate 123123'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_penerima_komisi',
                    width: 90,
                    dataIndex: 'penerima_komisi',
                    hideable: false,
                    text: 'Penerima Komisi'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_employee_name',
                    width: 90,
                    dataIndex: 'employee_name',
                    hideable: false,
                    text: 'Nama Karyawan'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_persentase',
                    width: 90,
                    dataIndex: 'persentase',
                    hideable: false,
                    text: 'Persentase'
                }


                  ,me.generateActionColumn()
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
                        action: 'create',
                        // hidden:true,
                        margin: '0 5 0 0',
                        iconCls: 'icon-new',
                        text: 'Add New'
                    },
                    // {
                    //     xtype: 'button',
                    //     hidden:true,
                    //     action: 'destroy',
                    //     iconCls: 'icon-delete',
                    //     text: 'Delete Selected'
                    // },
                    // {
                    //     xtype: 'button',
                    //     action: 'reschedule',
                    //     margin: '0 5 0 0',
                    //     iconCls: 'icon-new',
                    //     hidden:true,
                    //     text: 'Reschedule'
                    // },
                ]
            },
            // {
            //     xtype: 'pagingtoolbar',
            //     dock: 'bottom',
            //     width: 360,
            //     displayInfo: true,
            //     store: this.getStore()
            // }
        ];
        return dockedItems;
    }
});
*/