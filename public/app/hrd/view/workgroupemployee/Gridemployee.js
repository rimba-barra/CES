Ext.define('Hrd.view.workgroupemployee.Gridemployee', {
    extend: 'Hrd.library.template.view.Grid',
    alias: 'widget.workgroupemployeegridemployee',
    store: 'Employee',
    bindPrefixName: 'Workgroupemployee',
    itemId: 'Gridemployeeworkgroupemployee',
    title: 'Data Employee',
    newButtonLabel: 'Add New',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
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
            ]
        });
        me.callParent(arguments);
    },
    
    
});


