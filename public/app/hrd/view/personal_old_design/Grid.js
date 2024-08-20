Ext.define('Hrd.view.personal.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.personalgrid',
    storeConfig: {
        id: 'PersonalGridStore',
        idProperty: 'payment_id',
        extraParams: {}
    },
    bindPrefixName: 'Personal',
    newButtonLabel: 'New Employee',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItems(),
            defaults: {
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
                    dataIndex: 'employee_name',
                    text: 'Name'
                },
                {
                    dataIndex: 'department_department',
                    text: 'Department'
                },
                {
                    xtype: 'booleancolumn',
                    width: 75,
                    align: 'center',
                    falseText: ' ',
                    trueText: '&#10003;',
                    dataIndex: 'employee_active',
                    text: 'Active'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});