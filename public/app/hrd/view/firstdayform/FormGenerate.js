Ext.define('Hrd.view.firstdayform.FormGenerate', {
    alias: 'widget.firstdayformformgenerate',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.firstdayform.GridGenerate','Hrd.view.firstdayform.GridGenerateEmployee'],
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
                    xtype: 'firstdayformgenerateppgrid',
                    height: 150,
                    style: 'padding: 10 0 10 0'
                },
                {
                    xtype: 'firstdayformgenerateemployeeppgrid',
                    height: 150,
                    style: 'padding: 10 0 10 0'
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
                        action: 'processgenerate',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Generate'
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