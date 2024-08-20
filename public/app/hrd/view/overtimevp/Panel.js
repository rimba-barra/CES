Ext.define('Hrd.view.overtimevp.Panel', {
    extend: 'Hrd.library.box.view.Panel',
    requires: ['Hrd.view.overtimevp.FormData', 'Hrd.view.overtimevp.Grid'],
    alias: 'widget.overtimevppanel',
    itemId: 'OvertimevpPanel',
    gridPanelName: 'overtimevpgrid',
    formSearchPanelName: 'overtimevpformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            layout: {
                type: 'border'
            },
            items: [
                {
                    xtype: 'overtimevpgrid',
                    height:'300px',
                    width:400,
                    region:'west'
                },
                {
                    region:'center',
                    xtype: 'overtimevpformdata'
                }
            ],
            dockedItems: [
                {
                    xtype: 'toolbar',
                    dock: 'top',
                    id: 'toolbarOvertimevpID',
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
                        }
                    ]
                }
            ]
        });

        me.callParent(arguments);
    }
});