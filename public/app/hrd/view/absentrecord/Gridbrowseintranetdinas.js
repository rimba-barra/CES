Ext.define('Hrd.view.absentrecord.Gridbrowseintranetdinas', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.absentrecordgridbrowseintranetdinas',
    storeConfig: {
        id: 'absentrecordGridbrowseintranetdinas',
        idProperty: 'tugas_id',
        extraParams: {
            mode_read: 'getdatadinasintranet'
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
                    dataIndex: 'hrd_check',
                    text: 'Hrd Check',
                    width: 70,
                    name: 'hrd_check',
                    sortable: true
                },
                {
                    dataIndex: 'status',
                    text: 'Status',
                    width: 70,
                    name: 'status',
                    align: 'center',
                    sortable: true
                },
                {
                    dataIndex: 'tugas_id',
                    text: 'Tugas ID',
                    width: 80,
                    name: 'tugas_id',
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
                    dataIndex: 'name',
                    text: 'Nama Karyawan',
                    width: 250,
                    name: 'name',
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
                    dataIndex: 'code',
                    text: 'Code',
                    width: 90,
                    name: 'code',
                    sortable: true
                },
                {
                    dataIndex: 'start_date_time',
                    text: 'Berangkat Tanggal',
                    width: 120,
                    name: 'start_date_time',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d-m-Y H:i:s')
                },
                {
                    dataIndex: 'end_date_time',
                    text: 'Kembali Tanggal',
                    width: 120,
                    name: 'end_date_time',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d-m-Y H:i:s')
                },
                {
                    dataIndex: 'location',
                    text: 'Lokasi',
                    width: 120,
                    name: 'location',
                    sortable: true
                },
                {
                    dataIndex: 'bertugas_ke',
                    text: 'Bertugas ke',
                    width: 250,
                    name: 'bertugas_ke',
                    sortable: true
                },
                {
                    dataIndex: 'description',
                    text: 'Description',
                    width: 250,
                    name: 'description',
                    sortable: true
                },
                 {
                    dataIndex: 'approve_by',
                    text: 'Disetujui Oleh',
                    width: 180,
                    name: 'approve_by',
                    sortable: true,
                },
                {
                    dataIndex: 'approval_date',
                    text: 'Tanggal Disetujui',
                    width: 120,
                    name: 'approval_date',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    dataIndex: 'hrd_comment',
                    text: 'HRD Comment',
                    width: 180,
                    name: 'hrd_comment',
                    sortable: true
                },
                {
                    dataIndex: 'comment_date',
                    text: 'Comment Date',
                    width: 120,
                    name: 'comment_date',
                    align: 'center',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
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