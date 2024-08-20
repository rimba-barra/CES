Ext.define('Hrd.view.trainingattendance.FormTrainingAttendanceAttach', {
    alias: 'widget.formtrainingattendanceattach',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.trainingattendance.GridDetailFile'],
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
                    xtype:'filefield',
                    cols:50,
                    fieldLabel:'File',
                    name:'file_attach'
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
                        action: 'submitfileattach',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Submit'
                    }
                    
                ]
            }
        ];
        return x;
    }
});