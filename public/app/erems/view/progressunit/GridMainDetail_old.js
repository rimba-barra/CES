Ext.define('Erems.view.progressunit.GridMainDetail', {
    extend: 'Erems.library.template.view.GridDS2',
    storeConfig: {
        id: 'ProgressunitMainDetailGridStore',
        idProperty: 'unit_id',
        extraParams: {
            mode_read: 'listspk',
            unit_id: 0
        }
    },
    alias: 'widget.progressgridmaindetail',
    // store:'Kartupiutang',
    bindPrefixName: 'Progressunit',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: {},
            dockedItems: me.generateDockedItems(),
            viewConfig: {
            },
            selModel: Ext.create('Ext.selection.CheckboxModel', {
            }),
            defaults: {
                xtype: 'gridcolumn',
                width: 100,
                hidden: false
            },
            columns: [
                {
                    xtype: 'rownumberer'
                },
                {
                    dataIndex: 'spk_no',
                    width: 130,
                    text: 'SPK Number'
                },
                {
                    dataIndex: 'progress_date',
                    text: 'Progress Date'
                },
                {
                    dataIndex: 'user_user_fullname',
                    text: 'Update By'
                },
                {
                    dataIndex: 'progress_persen',
                    width: 130,
                    text: 'Development Progress'
                },
                me.generateActionColumn(),
            ]
        });

        me.callParent(arguments);
    },
    showAddNewButton: function() {
        var x = {
            xtype: 'button',
            itemId: 'btnAddNew',
            margin: '0 5 0 0',
            action: 'addNewDetail',
            iconCls: 'icon-new',
            text: 'Add New Detail'
        };
        return x;
    },
    generateActionColumn: function() {
        var me = this;
        var ac = {
            xtype: 'actioncolumn',
            width: 50,
            hidden: false,
            resizable: false,
            align: 'right',
            items: [
                {
                    defaultIcon: 'icon-edit',
                    iconCls: ' ux-actioncolumn icon-edit act-update',
                    action: 'update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                    defaultIcon: 'icon-delete',
                    action: 'destroy',
                    iconCls: 'ux-actioncolumn icon-delete act-destroy',
                    altText: 'Delete',
                    tooltip: 'Delete'
                }
            ]
        };
        return ac;
    },
    generateDockedItems: function() {
        var me = this;

        var dockedItems = [
            {
                xtype: 'pagingtoolbar',
                dock: 'bottom',
                width: 360,
                displayInfo: true,
                store: this.getStore()
            }
        ];
        return dockedItems;
    }
});