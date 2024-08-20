Ext.define('Hrd.view.trainingregistration.FormTrainingRegistrationRejectDetail', {
    alias: 'widget.formtrainingregistrationrejectdetail',
    extend: 'Hrd.library.box.view.FormData',
    requires: [''],
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
                        action: 'submitrejectdetail',
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