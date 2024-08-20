Ext.define('Hrd.view.absentrecord.FormTime', {
    alias: 'widget.absentrecordformtime',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    requires: ['Hrd.template.ComboBoxFields'],
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;
        
        var cbf = new Hrd.template.ComboBoxFields();
        
        Ext.applyIf(me, {
            items: [
                {
                  xtype:'hiddenfield',
                  name:'employee_employee_id'
                },
                {
                    xtype:'textfield',
                    fieldLabel:'Time In',
                    width:'100',
                    enableKeyEvents: true,
                    name:'time_in'
                },
                {
                    xtype:'textfield',
                    fieldLabel:'Time Out',
                    enableKeyEvents: true,
                    width:'100',
                    name:'time_out'
                },
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