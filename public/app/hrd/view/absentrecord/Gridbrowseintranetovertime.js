Ext.define('Hrd.view.absentrecord.Gridbrowseintranetovertime', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.absentrecordGridbrowseintranetovertime',
    storeConfig: {
        id: 'absentrecordGridbrowseintranetovertime',
        idProperty: 'lembur_id',
        extraParams: {
            mode_read: 'getdatapdlkintranet'
        }
    },
    bindPrefixName: 'Absentrecord',
    newButtonLabel: 'Add',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
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
                    width: 80,
                    name: 'hrd_check',
                    sortable: true
                },
                {
                    dataIndex: 'lembur_id',
                    text: 'Overtime ID',
                    width: 80,
                    name: 'lembur_id',
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
                    text: 'Name',
                    width: 250,
                    name: 'name',
                    sortable: true
                },
                {
                    dataIndex: 'department',
                    text: 'Department',
                    width: 100,
                    name: 'department',
                    sortable: true
                },
                {
                    dataIndex: 'status',
                    text: 'Status',
                    width: 90,
                    name: 'status',
                    sortable: true
                },
                {
                    dataIndex: 'lemburtype',
                    text: 'Overtime Type',
                    width: 90,
                    name: 'lemburtype',
                    sortable: true
                },
                {
                    dataIndex: 'start_date',
                    text: 'Start Time',
                    width: 120,
                    name: 'start_date',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
                },
                {
                    dataIndex: 'end_date',
                    text: 'End Time',
                    width: 120,
                    name: 'end_date',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d-m-Y')
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