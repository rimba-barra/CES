Ext.define('Erems.view.progressunit.GridImage', {
    extend:'Erems.library.template.view.GridDS2',
    
    storeConfig:{
        id:'ProgressunitImageGridStore',
        idProperty:'constructionpicture_id',
        extraParams:{
            mode_read:'picture'
        }
    },
    alias: 'widget.progressgridimage',
    // store:'Kartupiutang',
    bindPrefixName: 'Progressunit',
    imageFolder:'app/erems/uploads/progress_unit/',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            contextMenu: {},
            dockedItems: {},
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
                    text: 'Picture',
                    dataIndex: 'images',
                    renderer: function(value) {
                        return '<img src="'+me.imageFolder+''+value+'" width="50" height="50"/>';
                    }
                },
                {
                    dataIndex: 'description',
                    text: 'Description'
                },
                me.generateActionColumn(),
            ],
            bbar: [
                '',
                {
                    xtype: 'tbfill'
                },
                '',
                {
                    xtype: 'tbfill'
                },
                me.showAddNewButton()
            ]
        });

        me.callParent(arguments);
    },
    showAddNewButton: function() {
        var x = {
            xtype: 'button',
            itemId: 'imageNew',
            margin: '0 5 0 0',
            action: 'addNewDetail',
            iconCls: 'icon-new',
            text: 'Add New Image'
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
                xtype: 'toolbar',
                dock: 'bottom',
                height: 28,
                align: 'right',
                items: [
                    {
                        xtype: 'button',
                        action: 'create',
                        itemId: 'btnView',
                        margin: '0 5 0 0',
                        iconCls: 'icon-add',
                        text: 'Add New Image'
                    }
                ]
            }
        ];
        return dockedItems;
    }
});