Ext.define('Hrd.view.absentrecord.Gridbrowseintranetcuti', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.absentrecordgridbrowseintranetcuti',
    storeConfig: {
        id: 'absentrecordGridbrowseintranetcuti',
        idProperty: 'cuti_id',
        extraParams: {
            mode_read: 'getdatacutiintranet'
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
                    text: 'HRD Check',
                    width: 70,
                    name: 'hrd_check',
                    align: 'center',
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
                    dataIndex: 'cuti_id',
                    text: 'Cuti ID',
                    width: 80,
                    name: 'cuti_id',
                    sortable: true
                },                
                {
                    dataIndex: 'cutitype',
                    text: 'Leave Type',
                    align: 'left',
                    width: 100,
                    name: 'cutitype',
                    sortable: true
                },               
                {
                    dataIndex: 'nik',
                    text: 'NIK',
                    width: 100,
                    name: 'nik',
                    align: 'left',
                    sortable: true
                },
                {
                    dataIndex: 'name',
                    text: 'Nama Karyawan',
                    width: 250,
                    name: 'name',
                    align: 'left',
                    sortable: true
                },
                {
                    dataIndex: 'department',
                    text: 'Department',
                    width: 220,
                    align: 'left',
                    name: 'department',
                    sortable: true
                },               
                {
                    dataIndex: 'total',
                    text: 'Total Leave',
                    width: 80,
                    name: 'total',
                    align: 'right',
                    sortable: true
                },
                //added by michael 16/11/2021
                {
                    dataIndex: 'attachment',
                    text: 'Attachment',
                    width: 250,
                    name: 'Attachment',
                    sortable: true
                },
                //end added by michael 16/11/2021
                {
                    dataIndex: 'approve_by',
                    text: 'Approved By',
                    width: 180,
                    align: 'left',
                    name: 'approve_by',
                    sortable: true
                },
                {
                    dataIndex: 'approval_date',
                    text: 'Approved Date',
                    width: 120,
                    name: 'approval_date',
                    align: 'center',
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