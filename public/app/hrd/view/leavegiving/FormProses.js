Ext.define('Hrd.view.leavegiving.FormProses', {
    alias: 'widget.leavegivingprosesformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: [],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    height: 270,
    initComponent: function() {
        var me = this;





        Ext.applyIf(me, {
            defaults: {},
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'employee_id'
                },
                {
                    xtype: 'radiogroup',
                    fieldLabel: 'Process by : ',
                    // Arrange radio buttons into two columns, distributed vertically
                    itemId: 'perId',
                    width: '100%',
                    layout: 'hbox',
                    defaults: {
                        margin: '0 7 0 0'
                    },
                    flex: 3,
                    items: [
                        {boxLabel: 'Employee', name: 'per', inputValue: 1, checked: true},
                        {boxLabel: 'All', name: 'per', inputValue: 2},
                    ]
                },
                {
                    xtype:'textfield',
                    readOnly:true,
                    fieldLabel:'Employee Name : ',
                    width:400,
                    name:'employee_name'
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
                        itemId: 'btnSave',
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
    },
});