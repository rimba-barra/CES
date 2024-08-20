Ext.define('Hrd.view.anggarantaka.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    requires: ['Hrd.view.anggarantaka.FormData', 'Hrd.view.anggarantaka.Grid'],
    alias: 'widget.anggarantakapanel',
    itemId: 'AnggarantakaPanel',
    gridPanelName: 'anggarantakagrid',
    formSearchPanelName: 'anggarantakaformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            layout: {
                type: 'border'
            },
            items: [
                {
                    xtype: 'anggarantakagrid',
                    height:'300px',
                    width:250,
                    region:'west'
                },
                {
                    region:'center',
                    xtype: 'anggarantakaformdata'
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    id: 'toolbarAnggarantakaID',
                    height: 28,
                    defaults: [
                        {
                            xtype: 'button',
                            margin: '0 5 0 0'
                        }
                    ],
                    items: [
                        {
                            action: 'create',
                            iconCls: 'icon-new',
                            text: 'Add'
                        },
                        {
                            action: 'edit',
                            iconCls: 'icon-edit',
                            text: 'Edit'
                        },
                        {
                            action: 'save',
                            text: 'Save',
                            iconCls: 'icon-save',
                        },
                        {
                            action: 'delete',
                            text: 'Delete',
                            iconCls: 'icon-delete',
                        },
                        {
                            action: 'cancel',
                            iconCls: 'icon-cancel',
                            text: 'Cancel'
                        },
                        {
                            action: 'cancel',
                            iconCls: 'icon-new',
                            text: 'Tambah Tipe'
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});