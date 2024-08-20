Ext.define('Hrd.view.workgroupemployee.Griddetail', {
    extend: 'Hrd.library.template.view.Grid',
    alias: 'widget.workgroupemployeedetailgrid',
    store: 'Workgroupdetail',
    bindPrefixName: 'Workgroupemployee',
    itemId: 'Griddetailworkgroupemployee',
    title: 'Data Employee',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_department',
                    width: 180,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'department',
                    hideable: false,
                    text: 'Department'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_employee_nik',
                    width: 100,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'employee_nik',
                    hideable: false,
                    text: 'Employee NIK'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_employee_name',
                    width: 250,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'employee_name',
                    hideable: false,
                    text: 'Employee Name'
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
                        text: 'Add New',
                        itemId: 'btnAdd',
                        action: 'create',
                        iconCls: 'icon-add',
                        bindAction: me.bindPrefixName + 'Create'
                    }

                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                id: 'pagingworkgroupemployeedetail',
                width: 360,
                displayInfo: true,
                store: 'Workgroupdetail'
            }
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 50,
            hidden: false,
            resizable: false,
            align: 'right',
            items: [                
                {
                    defaultIcon: 'icon-delete',
                    action: 'destroy',
                    iconCls: 'ux-actioncolumn icon-delete act-destroy',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }
            ]
        }

        return ac;

    },
});


