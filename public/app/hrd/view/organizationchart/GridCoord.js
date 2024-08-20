Ext.define('Hrd.view.organizationchart.GridDetail', {
    extend: 'Hrd.library.box.view.Grid',
    alias: 'widget.organizationchartgriddetail',
    storeConfig: {
        id: 'OrganizationchartGridDetailStore',
        idProperty: 'organizationchart_detail_id',
        extraParams: {
            mode_read: 'organizationchartdetaillist'
        }
    },
    bindPrefixName: 'Organizationchart',
    newButtonLabel: 'Add',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            dockedItems: me.generateDockedItems(),
            contextMenu: me.generateContextMenu(),
            defaults: {
                xtype: 'gridcolumn'
            },
            viewConfig: {},
            selModel: Ext.create('Ext.selection.CheckboxModel', {}),
            columns: [
                {
                    dataIndex: 'position_id',
                    name: 'position_id',
                    hidden:true,
                    hidable:false
                },
                {
                    xtype: 'rownumberer'
                },
                {
                    dataIndex: 'position',
                    text: 'Position',
                    width: 100,
                    name: 'position',
                    sortable: true
                },
                {
                    dataIndex: 'parentposition',
                    text: 'Parent',
                    width: 100,
                    name: 'parentposition',
                    sortable: true
                },
                {
                    dataIndex: 'description',
                    text: 'Description',
                    width: 200,
                    name: 'description',
                    sortable: true
                },
                {
                    dataIndex: 'order_no',
                    text: 'No',
                    width: 50,
                    name: 'order_no',
                    sortable: true
                },
                {
                    dataIndex: 'isbetween',
                    text: 'Between',
                    width: 70,
                    align : 'center',
                    name: 'isbetween',
                    sortable: true,
                    renderer : function(value, metaData, record, rowIndex, colIndex, store) {				
                            return value == 1 ? '&#10003;' : '';
                    },
                },
                {
                    dataIndex: 'orglevel',
                    text: 'Level',
                    width: 100,
                    name: 'orglevel',
                    sortable: true
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
                        text: 'Add new',
                        itemId: 'btnAdd',
                        action: 'newNode',
                        iconCls: 'icon-add',
                        bindAction: me.bindPrefixName + 'Create'
                    },
                    {
                        text: 'Delete Selected',
                        itemId: 'btnDeleteDetail',
                        action: 'deleteDetail',
                        iconCls: 'icon-delete',
                        disabled: true,
                        bindAction: me.bindPrefixName + 'Delete'
                    },
                ]
            },
        ];
        return dockedItems;
    },
    generateActionColumn: function () {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 60,
            hidden: false,
            resizable: false,
            align: 'center',
            items: [
                {
                    defaultIcon: 'icon-delete',
                    action: 'destroy',
                    iconCls: 'ux-actioncolumn icon-delete act-destroy',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }]
        };

        return ac;
    }
});