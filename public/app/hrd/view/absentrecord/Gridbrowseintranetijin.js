Ext.define('Hrd.view.absentrecord.Gridbrowseintranetijin', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.absentrecordgridbrowseintranetijin',
    storeConfig: {
        id: 'absentrecordGridbrowseintranetijin',
        idProperty: 'tugas_id',
        extraParams: {
            mode_read: 'getdataijinintranet'
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
                    dataIndex: 'izin_id',
                    text: 'Ijin ID',
                    width: 80,
                    name: 'izin_id',
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
                    dataIndex: 'department',
                    text: 'Department',
                    width: 180,
                    name: 'department',
                    sortable: true
                },
                {
                    dataIndex: 'izintype',
                    text: 'Tipe Ijin',
                    width: 120,
                    name: 'izintype',
                    sortable: true
                },
                {
                    dataIndex: 'izin_date',
                    text: 'Tanggal Ijin',
                    width: 120,
                    name: 'izin_date',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    dataIndex: 'start_time',
                    text: 'Waktu Mulai',
                    width: 120,
                    name: 'start_time',
                    sortable: true,
                },
                {
                    dataIndex: 'end_time',
                    text: 'Waktu Selesai',
                    width: 120,
                    name: 'end_time',
                    sortable: true,
                },
                {
                    dataIndex: 'description',
                    text: 'Keterangan',
                    width: 250,
                    name: 'description',
                    sortable: true
                },
                {
                    dataIndex: 'approve_by',
                    text: 'Disetujui Oleh (Intranet)',
                    width: 180,
                    name: 'approve_by',
                    sortable: true,
                },
                {
                    dataIndex: 'reportoinmultiposition',
                    text: 'Disetujui Oleh (HCMS)',
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