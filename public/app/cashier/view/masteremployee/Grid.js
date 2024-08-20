Ext.define('Cashier.view.masteremployee.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.masteremployeegrid',
    store: 'Masteremployee',
    bindPrefixName: 'Masteremployee',
    itemId: 'Masteremployee',
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
                    itemId: 'colms_project_name',
                    width: 150,
                    dataIndex: 'project_name',
                    hideable: false,
                    text: 'Project'
                },
                  {
                    xtype: 'gridcolumn',
                    itemId: 'colms_pt_name',
                    width: 150,
                    dataIndex: 'pt_name',
                    hideable: false,
                    text: 'PT'
                },
                  {
                    xtype: 'gridcolumn',
                    itemId: 'colms_employee_name',
                    width: 120,
                    dataIndex: 'employee_name',
                    hideable: false,
                    text: 'Employee Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_employee_name',
                    width: 120,
                    dataIndex: 'employee_name',
                    hideable: false,
                    text: 'Employee Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_sex',
                    width: 100,
                    dataIndex: 'sex',
                    hideable: false,
                    text: 'Gender',
                    renderer: function (value, metaData, record, row, col, store, gridView) {
                        var gender = record.get('sex');
                        if (gender === 'M') {
                            return 'MALE';
                        } else {
                            return 'FEMALE';
                        }

                    },
                },
                 {
                    xtype: 'gridcolumn',
                    itemId: 'colms_dept',
                    width: 100,
                    dataIndex: 'department_code',
                    hideable: false,
                    text: 'Department'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
});


