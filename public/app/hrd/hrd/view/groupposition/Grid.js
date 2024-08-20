Ext.define('Hrd.view.groupposition.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.grouppositiongrid',
    storeConfig:{
        id:'DepartmentGridStore',
        idProperty:'groupposition_id',
        extraParams:{}
    },
    bindPrefixName: 'Groupposition',
    newButtonLabel: 'New Group Position',
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
                   dataIndex: 'code',
                   text: 'Code'
                },
                {
                   dataIndex: 'groupposition',
                   text: 'Group Position Name'
                },
                {
                   dataIndex: 'description',
                   text: 'Description'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    }
});