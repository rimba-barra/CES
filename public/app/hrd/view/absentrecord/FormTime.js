Ext.define('Hrd.view.absentrecord.FormTime', {
    alias: 'widget.absentrecordformtime',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    requires: ['Hrd.template.ComboBoxFields'],
    autoScroll: true,
    editedRow: -1,
    layout:'vbox',
    deletedData: {},
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'absentdetail_id'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Jam Masuk',
                    width: 70,
                    enableKeyEvents: true,
                    name: 'time_in'
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Jam Pulang',
                    enableKeyEvents: true,
                    width: 70,
                    name: 'time_out'
                },
                {
                    xtype: 'textareafield',
                    width:400,
                    name: 'description',
                    fieldLabel: 'Keterangan'

                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Attendance',
                    enableKeyEvents: true,
                    width: 50,
                    name: 'attendance_total'
                },
                
                // add by wulan 20200623
                {
                    xtype: 'textfield',
                    fieldLabel: 'Transport',
                    enableKeyEvents: true,
                    width: 50,
                    name: 'transport_total'
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