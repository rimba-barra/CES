Ext.define('Erems.view.progressnonunit.GridMainDetail', {
    extend:'Erems.library.template.view.GridDS2',
    
    storeConfig:{
        id:'ProgressnonunitMainDetailGridStore',
        idProperty:'spk_id',
        extraParams:{}
    },
    alias: 'widget.progressnongridmaindetail',
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
                    dataIndex: 'user_user_fullname',
                    text: 'Update By'
                },
                {
                    dataIndex: 'progress_persen',
                    text: 'Development Progress'
                },
                {
                    dataIndex: 'notes',
                    text: 'Notes',
                    width:200
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
            items: [{
                icon: 'app/main/images/icons/window.png',
                // Use a URL in the icon config
                tooltip: 'View Progress Images',
                handler: function (view, rowIndex, colIndex) {
                        var grid = view.up("grid");
                  //  var rec = grid.getStore().getAt(rowIndex);
                    grid.showGallery(rowIndex);
                }
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