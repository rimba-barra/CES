Ext.define('Hrd.view.workgroupemployee.Griddetailshift', {
    extend: 'Hrd.library.template.view.Grid',
    alias: 'widget.workgroupemployeedetailshiftgrid',
    store: 'Workgroupdetailshift',
    bindPrefixName: 'Workgroupemployee',
    itemId: 'Griddetailshiftworkgroupemployee',
    title: 'Data Employee',
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
                    itemId: 'colms_indexdata',
                    width: 90,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'indexdata',
                    hideable: false,
                    text: 'Squence'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_shifttype',
                    width: 180,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'shifttype',
                    hideable: false,
                    text: 'Shift Type'
                },
                {
                    xtype: 'gridcolumn',
                    itemId: 'colms_counterdays',
                    width: 80,
                    titleAlign: 'left',
                    align: 'left',
                    dataIndex: 'counterdays',
                    hideable: false,
                    text: 'Counter Days'
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
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                items: [
                    {
                        text: 'Add New',
                        itemId: 'btnAdd',
                        action: 'create',
                        iconCls: 'icon-add',
                        bindAction: me.bindPrefixName + 'Create'
                    }

                ]
            },
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                id: 'pagingworkgroupemployeedetailshift',
                width: 360,
                displayInfo: true,
                store: 'Workgroupdetailshift'
            }
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 50,
            hidden: false,
            resizable: false,
            align: 'right',
            items: [
                {
                    defaultIcon: 'icon-delete',
                    action: 'destroy',
                    iconCls: 'ux-actioncolumn icon-delete act-destroy',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }
            ]
        }

        return ac;

    },
});


