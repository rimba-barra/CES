Ext.define('Hrd.view.department.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.departmentgrid',
    storeConfig:{
        id:'DepartmentGridStore',
        idProperty:'department_id',
        extraParams:{}
    },
    bindPrefixName: 'Department',
    newButtonLabel: 'New Department',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults:{
                 xtype: 'gridcolumn',
                 
                 
            },
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                   dataIndex: 'department',
                   text: 'Department Name'
                },
                {
                   dataIndex: 'code',
                   text: 'Code'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});