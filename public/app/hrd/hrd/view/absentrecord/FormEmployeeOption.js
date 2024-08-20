Ext.define('Hrd.view.absentrecord.FormEmployeeOption', {
    alias: 'widget.absentrecordformemployeeoption',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            layout:'vbox',
            defaults: {
                xtype: 'container',
                flex:1
            },
            items: [
                {
                   
                    defaults: {
                        xtype: 'radiofield'
                    },
                    items: [
                        {
                            boxLabel: 'By Employee',
                            name: 'option',
                            checked: true,
                            inputValue: 'employee'
                        }, {
                            boxLabel: 'All Employee in one division',
                            name: 'option',
                            inputValue: 'division'
                        },
                        {
                            boxLabel: 'All Employee',
                            name: 'option',
                            inputValue: 'all'
                        }
                    ]
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
                        action: 'process',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Process'
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