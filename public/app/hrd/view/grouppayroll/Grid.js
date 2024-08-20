Ext.define('Hrd.view.grouppayroll.Grid', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.grouppayrollgrid',
    storeConfig:{
        id:'GrouppayrollGridStore',
        idProperty:'grouppayroll_id',
        extraParams:{}
    },
    bindPrefixName: 'Grouppayroll',
    newButtonLabel: 'New Grouppayroll',
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
                   dataIndex: 'grouppayroll',
                   text: 'Group Payroll Name'
                },
                {
                   dataIndex: 'code',
                   text: 'Code'
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