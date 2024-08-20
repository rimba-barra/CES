Ext.define('Hrd.view.firstdayemployee.FormData', {
    alias: 'widget.firstdayemployeeformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.firstdayemployee.GridTrans'],
    frame: true,
    autoScroll: true,
    editedRow:-1,
    deletedData:{},
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults:{
                xtype:'textfield'
            },
            items: [
               {
                    xtype:'hiddenfield',
                    name:'employee_id'
                },
                {
                    xtype: 'textfield',
                    name:'employee_name',
                    width: 400,
                    fieldLabel:'Employee Name',
                    readonly: true
                },
                {
                    xtype: 'firstdayemployeetransgrid',
                    height: 180,
                    flex: 2,
                    style: 'padding: 10 0 10 0'
                },

            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
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
                        action: 'save',
                        itemId: 'btnSave',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Save'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function () {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    },
});