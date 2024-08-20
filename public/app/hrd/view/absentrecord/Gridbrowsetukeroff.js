Ext.define('Hrd.view.absentrecord.Gridbrowsetukeroff', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.absentrecordgridbrowsetukeroff',
    storeConfig: {
        id: 'absentrecordGridbrowsetukeroff',
        idProperty: 'tukeroff_id',
        extraParams: {
            mode_read: 'getdatatukeroff'
        }
    },
    bindPrefixName: 'Absentrecord',
    newButtonLabel: 'Add',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults: {
                xtype: 'gridcolumn'
            },
            viewConfig: {},
            selModel: Ext.create('Ext.selection.CheckboxModel', {}),
            columns: [
                me.generateActionColumn(),
                {
                    dataIndex: 'is_fullday',
                    text: 'Full Day',
                    width: 80,
                    name: 'is_fullday',
                    align: 'center',
                    sortable: true,
                    renderer: function (value) {
                        if (value == '1') {
                            return 'Full Day';
                        } else {
                            return 'Half Day';
                        }
                    }
                },
                {
                    dataIndex: 'is_approve',
                    text: 'Approve',
                    width: 80,
                    name: 'is_approve',
                    align: 'center',
                    sortable: true,
                    renderer: function (value) {
                        if (value == '1') {
                            return 'Approved';
                        } else {
                            return '';
                        }
                    }
                },
                {
                    dataIndex: 'is_canceled',
                    text: 'Cancel',
                    width: 80,
                    name: 'is_canceled',
                    align: 'center',
                    sortable: true,
                    renderer: function (value) {
                        if (value == '1') {
                            return 'Canceled';
                        } else {
                            return '';
                        }
                    }
                },
                {
                    dataIndex: 'is_process',
                    text: 'HRD Process',
                    width: 80,
                    name: 'is_process',
                    align: 'center',
                    sortable: true,
                    renderer: function (value) {
                        if (value == '1') {
                            return 'Processed';
                        } else {
                            return '';
                        }
                    }
                },
                {
                    dataIndex: 'transaksi_id_client',
                    text: 'ID Transaksi Client',
                    width: 120,
                    name: 'transaksi_id_client',
                    align: 'center',
                    sortable: true
                },
                {
                    dataIndex: 'employee_nik',
                    text: 'NIK',
                    align: 'left',
                    width: 100,
                    name: 'employee_nik',
                    sortable: true
                },
                {
                    dataIndex: 'employee_name',
                    text: 'Nama',
                    align: 'left',
                    width: 180,
                    name: 'employee_name',
                    sortable: true
                },
                {
                    dataIndex: 'department',
                    text: 'Department',
                    width: 120,
                    name: 'department',
                    align: 'left',
                    sortable: true
                },
                {
                    dataIndex: 'dari_tanggal',
                    text: 'Dari tanggal',
                    width: 120,
                    name: 'dari_tanggal',
                    align: 'left',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    dataIndex: 'ke_tanggal',
                    text: 'Ke Tanggal',
                    width: 120,
                    name: 'ke_tanggal',
                    align: 'center',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    dataIndex: 'dari_shift',
                    text: 'Dari Shift',
                    width: 120,
                    name: 'dari_shift',
                    align: 'left',
                    sortable: true
                },
                {
                    dataIndex: 'ke_shift',
                    text: 'Ke Shift',
                    width: 120,
                    name: 'ke_shift',
                    align: 'left',
                    sortable: true
                },
                {
                    dataIndex: 'jam_masuk',
                    text: 'Jam Masuk',
                    width: 120,
                    name: 'jam_masuk',
                    align: 'center',
                    sortable: true
                },
                {
                    dataIndex: 'jam_pulang',
                    text: 'Jam Pulang',
                    width: 120,
                    name: 'jam_pulang',
                    align: 'center',
                    sortable: true
                },
                {
                    dataIndex: 'dari_description',
                    text: 'Dari Description',
                    width: 250,
                    name: 'dari_description',
                    align: 'left',
                    sortable: true
                },
                {
                    dataIndex: 'ke_description',
                    text: 'Ke Description',
                    width: 250,
                    name: 'ke_description',
                    align: 'left',
                    sortable: true
                },
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [{
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }];

        return dockedItems;
    },

    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 60,
            hidden: false,
            resizable: false,
            align: 'center',
            items: [
                {
                    defaultIcon: 'icon-edit',
                    iconCls: ' ux-actioncolumn icon-edit act-update',
                    action: 'update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                }
            ]
        };

        return ac;
    }
});