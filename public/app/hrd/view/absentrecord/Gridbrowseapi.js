Ext.define('Hrd.view.absentrecord.Gridbrowseapi', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.absentrecordgridbrowseapi',
    storeConfig: {
        id: 'absentrecordGridbrowseapi',
        idProperty: 'tukeroff_id',
        extraParams: {
            mode_read: 'getdatatransactionapi'
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
               // me.generateActionColumn(),                
                // added by Wulan Sari 2018.05.02
                {
                    dataIndex: 'is_approve',
                    text: 'Status Approve',
                    width: 100,
                    name: 'is_approve',
                    align: 'center',
                    sortable: true,
                    renderer: function (value) {
                        if (value == '1') {
                            return 'Sudah di Approve';
                        } else {
                            return 'Belum di Approve';
                        }
                    }
                },
                {
                    dataIndex: 'is_cancel',
                    text: 'Status Cancel',
                    width: 100,
                    name: 'is_canceled',
                    align: 'center',
                    sortable: true,
                    renderer: function (value) {
                        if (value == '1') {
                            return 'Di Cancel';
                        } else {
                            return 'Tidak di cancel';
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
                            return 'Process';
                        } else {
                            return '';
                        }
                    }
                },
                // end added by Wulan Sari 2018.05.02
                
                {
                    dataIndex: 'transaction_id',
                    text: 'Transaction Id',
                    width: 120,
                    name: 'transaction_id',
                    align: 'right',
                    sortable: true
                },
                {
                    dataIndex: 'for_transaction',
                    text: 'Transaction',
                    width: 120,
                    name: 'for_transaction',
                    align: 'center',
                    sortable: true
                },               
                {
                    dataIndex: 'absenttype',
                    text: 'Permit Type',
                    width: 200,
                    name: 'absenttype',
                    align: 'left',
                    sortable: true
                },
                {
                    dataIndex: 'leavetype',
                    text: 'Leave Type',
                    width: 90,
                    name: 'leavetype',
                    align: 'left',
                    sortable: true
                },
                {
                    dataIndex: 'tlktype',
                    text: 'Tlk Type',
                    width: 90,
                    name: 'tlktype',
                    align: 'left',
                    sortable: true
                },
                {
                    dataIndex: 'transaction_date',
                    text: 'Transaction Date',
                    align: 'left',
                    width: 120,
                    name: 'transaction_date',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    dataIndex: 'employee_name',
                    text: 'Employee Name',
                    width: 180,
                    name: 'employee_name',
                    align: 'left',
                    sortable: true
                },
                {
                    dataIndex: 'employee_nik',
                    text: 'Employee Nik',
                    width: 110,
                    name: 'employee_nik',
                    align: 'left',
                    sortable: true
                },
                {
                    dataIndex: 'department',
                    text: 'Department',
                    width: 180,
                    name: 'department',
                    align: 'left',
                    sortable: true
                },
                {
                    dataIndex: 'daritanggal',
                    text: 'From Date',
                    width: 120,
                    name: 'daritanggal',
                    align: 'left',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    dataIndex: 'darijam',
                    text: 'From Time',
                    width: 90,
                    name: 'darijam',
                    align: 'center',
                    titleAlign: 'center',
                    sortable: true
                },
                {
                    dataIndex: 'sampaitanggal',
                    text: 'Until Date',
                    width: 120,
                    name: 'sampaitanggal',
                    align: 'left',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    dataIndex: 'sampaijam',
                    text: 'Until Time',
                    width: 90,                    
                    name: 'sampaijam',
                    align: 'center',
                    titleAlign: 'center',
                    sortable: true
                },
                {
                    dataIndex: 'total_hari',
                    text: 'Sum of Day',
                    width: 90,
                    name: 'total_hari',
                    align: 'right',
                    titleAlign: 'center',
                    sortable: true
                },
                {
                    dataIndex: 'keterangan',
                    text: 'Description',
                    width: 250,
                    name: 'keterangan',
                    align: 'left',
                    titleAlign: 'left',
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
                /*
                {
                    defaultIcon: 'icon-edit',
                    iconCls: ' ux-actioncolumn icon-edit act-update',
                    action: 'update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                }
                */
            ]
        };

        return ac;
    }
});