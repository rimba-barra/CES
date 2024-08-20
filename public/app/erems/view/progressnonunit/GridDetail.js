Ext.define('Erems.view.progressnonunit.GridDetail', {
    extend:'Erems.library.template.view.GridDS2',
    
    storeConfig:{
        id:'ProgressnonunitDetailGridStore',
        idProperty:'construction_id',
        extraParams:{}
    },
    alias: 'widget.progressnonunitgriddetail',
    // store:'Kartupiutang',
    bindPrefixName: 'Progressnonunit',
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
                    dataIndex: 'progress_date',
                    text: 'Progress Date'
                },
                {
                    dataIndex: 'progress_persen',
                    text: 'Progress Percent'
                },
                {
                    dataIndex: 'notes',
                    text: 'Note'
                },
                {
                    dataIndex: 'user_user_fullname',
                    text: 'Update by'
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
            width: 75,
            hidden: false,
            resizable: false,
            align: 'right',
            items: [
                {
                   // defaultIcon: 'icon-edit',
                   iconCls: ' ux-actioncolumn icon-search act-gallery',
                   text:'View Images',
                    action: 'gallery',
                    altText: 'Gallery',
                    tooltip: 'Gallery'
                },
                {
                   // defaultIcon: 'icon-edit',
                    iconCls: ' ux-actioncolumn icon-edit act-update',
                    action: 'update',
                    text:'Update',
                    altText: 'Edit',
                    tooltip: 'Edit'
                },
                {
                   // defaultIcon: 'icon-delete',
                    action: 'destroy',
                    text:'destroy',
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
                xtype: 'toolbar',
                dock: 'top',
                height: 28,
                align: 'right',
                items: [
                    {
                        xtype: 'button',
                        action: 'create',
                        itemId: 'btnView',
                        margin: '0 5 0 0',
                        iconCls: 'icon-add',
                        text: 'Add New Progress'
                    }
                ]
            },
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