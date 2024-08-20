Ext.define('Hrd.view.trainingattendance.FormTrainingAttendanceReject', {
    alias: 'widget.formtrainingattendancereject',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.trainingattendance.Gridbrowseintranettrainingattendance'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    height:300,
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype:'textareafield',
                    cols:50,
                    fieldLabel:'Note',
                    name:'hc_reject_comment'
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
                        action: 'submitrejectattendance',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Reject'
                    }
                    
                ]
            }
        ];
        return x;
    }
});