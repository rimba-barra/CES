Ext.define('Hrd.view.klaimpengobatan.GridDataDeletePfams', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.klaimpengobatangriddatadeletepfams',
    storeConfig: {
        id: 'klaimpengobatanGriddatadeletepfams',
        idProperty: 'klaimpengobatan_id',
        extraParams: {
            // mode_read: 'getdatasakitintranet'
        }
    },
    bindPrefixName: 'Klaimpengobatan',
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
                    dataIndex: 'hrd_check',
                    text: 'Hrd Check',
                    width: 70,
                    name: 'hrd_check',
                    sortable: true
                },
                {
                    dataIndex: 'voucher_no',
                    text: 'Voucher No',
                    width: 70,
                    name: 'voucher_no',
                    sortable: true
                },
                {
                    dataIndex: 'klaimpengobatan_id',
                    text: 'Klaim Pengobatan Id',
                    width: 70,
                    name: 'klaimpengobatan_id',
                    sortable: true
                },
                {
                    dataIndex: 'jenispengobatan_id',
                    text: 'Jenis Pengobatan Id',
                    width: 70,
                    name: 'jenispengobatan_id',
                    sortable: true
                },
                {
                    dataIndex: 'jenispengobatan',
                    text: 'Jenis Pengobatan',
                    width: 125,
                    name: 'jenispengobatan',
                    align: 'center',
                    sortable: true
                },
                {
                    dataIndex: 'nik',
                    text: 'NIK',
                    width: 100,
                    name: 'nik',
                    sortable: true
                },
                {
                    dataIndex: 'employee_name',
                    text: 'Nama Karyawan',
                    width: 250,
                    name: 'employee_name',
                    sortable: true
                },
                {
                    dataIndex: 'deptcode',
                    text: 'Department Code',
                    width: 100,
                    name: 'deptcode',
                    sortable: true
                },
                {
                    dataIndex: 'claim_date_ess',
                    text: 'Tanggal Klaim',
                    width: 120,
                    name: 'claim_date_ess',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    dataIndex: 'kwitansi_date_ess',
                    text: 'Tanggal Kwintansi',
                    width: 120,
                    name: 'kwitansi_date_ess',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    dataIndex: 'description_ess',
                    text: 'Description',
                    width: 250,
                    name: 'description_ess',
                    sortable: true
                },
                {
                    dataIndex: 'claim_value_ess',
                    text: 'Total Klaim',
                    width: 250,
                    name: 'claim_value_ess',
                    sortable: true
                }
                
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