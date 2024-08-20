Ext.define('Cashier.view.coadept.Gridcoa', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.coadeptgridcoa',
    store: 'Coa',
    bindPrefixName: 'Coa',
    itemId: 'Coa',
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
                    titleAlign: 'center',
                    align: 'center',
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_projectname',
                    dataIndex: 'projectname',
                    width: 120,
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
                    width: 180,
                    hideable: false,
                    text: 'Pt'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa',
                    titleAlign: 'center',
                    align: 'left',
                    dataIndex: 'coa',
                    width: 120,
                    hideable: false,
                    text: 'Coa'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_name',
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'name',
                    width: 200,
                    hideable: false,
                    text: 'Name'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_type',
                    dataIndex: 'type',
                    titleAlign: 'center',
                    align: 'center',
                    width: 100,
                    hideable: false,
                    text: 'Debet/Credit'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_kelsub',
                    dataIndex: 'kelsub',
                    titleAlign: 'center',
                    align: 'left',
                    width: 100,
                    hideable: false,
                    text: 'Sub Group'
                },
                {
                    xtype: 'booleancolumn',
                    itemId: 'colms_active',
                    dataIndex: 'active',
                    trueText: '&#10003;',
                    falseText: '',
                    titleAlign: 'center',
                    align: 'center',
                    width: 70,
                    hideable: false,
                    text: 'Is Active'
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
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: 'Coa'
            }
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
        }

        return ac;

    },
});


