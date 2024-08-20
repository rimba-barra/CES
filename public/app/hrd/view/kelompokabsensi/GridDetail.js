Ext.define('Hrd.view.kelompokabsensi.GridDetail', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.kelompokabsensigriddetail',
    storeConfig: {
        id: 'KelompokabsensiGridDetailStore',
        idProperty: 'kelompokabsensi_detail_id',
        extraParams: {
            mode_read: 'kelompokabsensidetaillist'
        }
    },
    bindPrefixName: 'Kelompokabsensi',
    newButtonLabel: 'Add',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            contextMenu: me.generateContextMenu(),
            defaults: {
                xtype: 'gridcolumn'
            },
            viewConfig: {},
            selModel: Ext.create('Ext.selection.CheckboxModel', {}),
            columns: [
                {
                    dataIndex: 'employee_id',
                    text: 'Employee ID',
                    width: 100,
                    name: 'employee_id',
                    sortable: true,
                    hidden:true,
                    hidable:false
                },
                {
                    xtype: 'rownumberer'
                },
                {
                    dataIndex: 'employee_nik',
                    text: 'Nik',
                    width: 100,
                    name: 'Nik',
                    sortable: true
                },
                {
                    dataIndex: 'employee_name',
                    text: 'Employee Name',
                    width: 200,
                    name: 'Employee Name',
                    sortable: true
                },
                {
                    dataIndex: 'department',
                    text: 'Department',
                    width: 200,
                    name: 'Department',
                    sortable: true
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItems: function () {
        var me = this;
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        text: 'Add new',
                        itemId: 'btnAdd',
                        action: 'addDetail',
                        iconCls: 'icon-add',
                        bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        text: 'Delete Selected',
                        itemId: 'btnDeleteDetail',
                        action: 'deleteDetail',
                        iconCls: 'icon-delete',
                        disabled: true,
                        bindAction: me.bindPrefixName + 'Delete'
                    },
                ]
            },
        ];
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
                    defaultIcon: 'icon-delete',
                    action: 'destroy',
                    iconCls: 'ux-actioncolumn icon-delete act-destroy',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }]
        };

        return ac;
    }
});