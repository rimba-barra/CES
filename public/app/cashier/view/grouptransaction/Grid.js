Ext.define('Cashier.view.grouptransaction.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.grouptransactiongrid',
    store: 'Grouptransaction',
    bindPrefixName: 'Grouptransaction',
    itemId: 'Grouptransaction',
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
                    xtype: 'rownumberer',
                    text: 'No.',
                    width: 40,   
                    titleAlign : 'center',
                    align : 'center',
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_projectname',
                    dataIndex: 'projectname',
                    width: 200,                   
                    titleAlign : 'center',
                    align : 'left',
                    hideable: false,
                    text: 'Project'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname',                    
                    dataIndex: 'ptname',
                    titleAlign : 'center',
                    align : 'left',
                    width: 200,
                    hideable: false,
                    text: 'Pt'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',                    
                    titleAlign : 'center',
                    align : 'center',
                    dataIndex: 'code',
                    width: 80,
                    hideable: false,
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_status',                   
                    dataIndex: 'status',
                    titleAlign : 'center',
                    align : 'center',
                    width: 100,
                    hideable: false,
                    text: 'Cash/Bank'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',                  
                    dataIndex: 'description',
                    titleAlign : 'center',
                    align : 'left',
                    width: 200,
                    hideable: false,
                    text: 'Description'
                },
                {
                    xtype: 'booleancolumn',
                    itemId: 'colms_is_default',                   
                    dataIndex: 'is_default',
                    trueText: '&#10003;',
                    falseText: '',
                    titleAlign : 'center',
                    align : 'center',
                    width: 70,
                    hideable: false,
                    text: 'Default'
                },
                {
                    xtype: 'booleancolumn',
                    itemId: 'colms_active',
                    dataIndex: 'active',
                    trueText: '&#10003;',
                    falseText: '',
                    titleAlign : 'center',
                    align : 'center',
                    width: 70,
                    hideable: false,
                    text: 'Flag'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
});


