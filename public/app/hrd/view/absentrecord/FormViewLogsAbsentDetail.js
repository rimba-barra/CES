Ext.define('Hrd.view.absentrecord.FormViewLogsAbsentDetail', {
    alias: 'widget.absentrecordformviewlogsabsentdetail',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    autoScroll: true,
    requires: ['Hrd.view.absentrecord.GridLogsAbsentDetail'],
    uniquename: "_absentrecordformviewlogsabsentdetail",
    deletedData: {},
    initComponent: function() {
        var me = this;
        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {},
            items: [

                {
                    xtype: 'absentrecordgridlogsabsentdetail',
                    height: 300,
                    style: 'padding: 10 0 10 0'
                }
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
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-close',
                        text: 'Close',
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