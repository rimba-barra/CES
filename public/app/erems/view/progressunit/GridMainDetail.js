Ext.define('Erems.view.progressunit.GridMainDetail', {
    extend:'Erems.library.template.view.GridDS2',
    
    storeConfig:{
        id:'ProgressunitMainDetailGridStore',
        idProperty:'unit_id',
        extraParams:{
            mode_read:'listspk'
        }
    },
    alias: 'widget.progressgridmaindetail',
    // store:'Kartupiutang',
    bindPrefixName: 'Progressunit',
    
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
                    dataIndex: 'spk_no',
                    width: 200,
                    text: 'SPK Number'
                },
                {
                    xtype:'datecolumn',
                    format:'d-m-Y',
                    dataIndex: 'Modion',
                    text: 'Progress Date'
                },
                {
                    dataIndex: 'description',
                    text: 'Notes',
                    width:200,
                },
                {
                    dataIndex: 'user_user_fullname',
                    text: 'Update By'
                },
                {
                    dataIndex: 'progress',
                    width: 130,
                    text: 'Development Progress'
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