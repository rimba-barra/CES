Ext.define('Hrd.view.absentrecord.FormToolDelete', {
    alias: 'widget.absentrecordformtooldelete',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                xtype: 'radiofield'
            },
            items: [
                {
                    boxLabel  : 'Absent Date',
                    name      : 'option',
                    checked:true,
                    inputValue: 'date'
                }, {
                    boxLabel  : 'Employee Name',
                    name      : 'option',
                    inputValue: 'employee'
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function() {
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'delete',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-delete',
                        text: 'Delete'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function() {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    }
});