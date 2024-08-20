Ext.define('Cashier.view.bankpositionreport.Gridprefix', {
    extend: 'Cashier.library.template.view.Grid',
    alias: 'widget.bankpositionreportgridprefix',
    store: 'Voucherprefixsetup',
    bindPrefixName: 'Bankpositionreport',
    itemId: 'Bankpositionreport',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            contextMenu: me.generateContextMenu(),
            dockedItems: me.generateDockedItemsCustome(),
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
                    text: 'Company'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_ptname',
                    dataIndex: 'ptname',
                    width: 180,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Company'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_coa',
                    dataIndex: 'coa',
                    width: 120,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Acc. Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_prefix',
                    dataIndex: 'prefix',
                    width: 90,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Prefix Code'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_in_out',
                    dataIndex: 'in_out',
                    width: 80,
                    titleAlign: 'center',
                    align: 'center',
                    hideable: false,
                    text: 'Data Flow'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_no_acc',
                    dataIndex: 'no_acc',
                    width: 150,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Acc. Number'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_description',
                    dataIndex: 'description',
                    width: 200,
                    titleAlign: 'center',
                    align: 'left',
                    hideable: false,
                    text: 'Description'
                },
            ]
        });

        me.callParent(arguments);
    },
    generateDockedItemsCustome: function () {
        var me = this;
        var dockedItems = [
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                id: 'pagingbankpositionreportgridprefix',
                width: 360,
                displayInfo: true,
                store: this.getStore(),
            }
        ];
        return dockedItems;
    },
});


