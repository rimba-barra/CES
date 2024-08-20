Ext.define('Hrd.view.overtimetransaction.Gridbrowseapiovertime', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.overtimetransactionGridbrowseapiovertime',
    storeConfig: {
        id: 'overtimetransactionGridbrowseapiovertime',
        idProperty: 'lembur_id',
        extraParams: {
            mode_read: 'getdataovertimeapi'
        }
    },
    bindPrefixName: 'Overtimetransaction',
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
                    xtype: 'rownumberer'
                },
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
                    dataIndex: 'lembur_dari',
                    text: 'Start Time',
                    width: 120,
                    name: 'lembur_dari',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d-m-Y H:i:s')
                },
                {
                    dataIndex: 'lembur_sampai',
                    text: 'End Time',
                    width: 120,
                    name: 'lembur_sampai',
                    sortable: true,
                    renderer: Ext.util.Format.dateRenderer('d-m-Y H:i:s')
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