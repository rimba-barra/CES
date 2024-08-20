Ext.define('Hrd.view.absentrecord.Gridbrowseintranettukarshift', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.absentrecordgridbrowseintranettukarshift',
    storeConfig: {
        id: 'absentrecordGridbrowseintranettukarshift',
        idProperty: 'tukarshift_id',
        extraParams: {
            mode_read: 'getdatatukarshiftintranet'
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
                    width: 150,
                    name: 'status',
                    sortable: true
                },
                {
                    dataIndex: 'tukarshift_id',
                    text: 'ID',
                    width: 80,
                    name: 'tukarshift_id',
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
                    dataIndex: 'date',
                    text: 'Tanggal',
                    width: 120,
                    name: 'tukarshift_date',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    dataIndex: 'shifttype_cur',
                    text: 'Shift Asal',
                    width: 120,
                    name: 'shifttype_cur',
                    sortable: true
                },
                {
                    dataIndex: 'shifttype_req',
                    text: 'Shift Berubah Jadi',
                    width: 120,
                    name: 'shifttype_req',
                    sortable: true
                },
                {
                    dataIndex: 'description',
                    text: 'Keterangan',
                    width: 250,
                    name: 'description',
                    sortable: true
                },
                {
                    dataIndex: 'approve_byreportto',
                    text: 'Disetujui Oleh (Intranet)',
                    width: 180,
                    name: 'approve_byreportto',
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
                    dataIndex: 'approval_date_byreportto',
                    text: 'Tgl Disetujui Report To',
                    width: 120,
                    name: 'approval_date_byreportto',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    dataIndex: 'name2',
                    text: 'Karyawan Pengganti',
                    width: 250,
                    name: 'name2',
                    sortable: true
                },
                {
                    dataIndex: 'approval_date_byemp2',
                    text: 'Tgl Disetujui Kary. Pengganti',
                    width: 150,
                    name: 'approval_date_byemp2',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    dataIndex: 'option_shift_change_name',
                    text: 'Option Shift Change',
                    width: 150,
                    name: 'option_shift_change_name',
                    sortable: true
                },/*,
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
                },*/
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