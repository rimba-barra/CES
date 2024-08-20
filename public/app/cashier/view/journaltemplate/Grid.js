Ext.define('Cashier.view.journaltemplate.Grid', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.journaltemplategrid',
    store: 'Journaltemplate',
    bindPrefixName: 'Journaltemplate',
    itemId: 'Journaltemplate',
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
                    itemId: 'colms_projectname',
                    dataIndex: 'projectname',
                    width: 180,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Project'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname',
                    dataIndex: 'ptname',
                    titleAlign: 'center',
                    align: 'left',
                    width: 150,
                    hideable: false,
                    text: 'Pt'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_department',
                    dataIndex: 'department',
                    titleAlign: 'center',
                    align: 'left',
                    width: 150,
                    hideable: false,
                    text: 'Departement'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa',
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'coa',
                    width: 100,
                    hideable: false,
                    text: 'Coa'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coaname',
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'coaname',
                    width: 100,
                    hideable: false,
                    text: 'Coa Desc'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_code',
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'code',
                    width: 100,
                    hideable: false,
                    text: 'Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'description',
                    width: 200,
                    hideable: false,
                    text: 'Description'
                },
                me.generateActionColumn()
            ]
        });

        me.callParent(arguments);
    },
});


