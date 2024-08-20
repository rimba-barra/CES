Ext.define('Hrd.view.trainingattendance.FormClose', {
    alias: 'widget.formtrainingattendanceclose',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.trainingattendance.GridCloseBudget', 'Hrd.view.trainingattendance.GridCloseStar' , 'Hrd.view.trainingattendance.GridCloseTrainingName'],
    frame: true,
    autoScroll: true,
    editedRow:-1,
    deletedData:{},
    height: 500,
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults:{
                xtype:'textfield'
            },
            items: [
               {
                    xtype: 'trainingattendanceclosetrainingnamegrid',
                    height: 150,
                    style: 'padding: 10 0 10 0'
                },
                // {
                //     xtype: 'trainingattendanceclosebudgetgrid',
                //     height: 150,
                //     style: 'padding: 10 0 10 0'
                // },
                // {
                //     xtype: 'trainingattendanceclosestargrid',
                //     height: 150,
                //     style: 'padding: 10 0 10 0'
                // },
                {
                    xtype: 'fieldset',
                    title: 'Investment',
                    layout: 'vbox',
                    width: '100%',
                    items: [
                        {
                            xtype: 'trainingattendanceclosebudgetgrid',
                            height: 150,
                            width: '100%',
                            style: 'padding: 10 0 10 0'
                        },
                    ]
                },
                {
                    xtype: 'fieldset',
                    title: 'Star for Employee',
                    layout: 'vbox',
                    width: '100%',
                    items: [
                        {
                            xtype: 'trainingattendanceclosestargrid',
                            height: 150,
                            width: '100%',
                            style: 'padding: 10 0 10 0'
                        },
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
                        action: 'processclosetraining',
                        padding: 5,
                        width: 100,
                        iconCls: 'icon-save',
                        text: 'Close Training'
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