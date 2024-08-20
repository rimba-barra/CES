Ext.define('Erems.view.schedulemonitor.FormExcel', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.schedulemonitorformexcel',
    requires: [],
    autoScroll: true,
    anchorSize: 100,
    height: 150,
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0',

    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            items: [

                {
                    xtype: 'radiofield',
                    boxLabel: '1 Halaman ini',
                    name: 'page',
                    inputValue: 1,
                    checked: true,
                 
                },
                {
                    xtype: 'radiofield',
                    boxLabel: 'Semua',
                    name: 'page',
                    inputValue: 2,
                    checked: false,
                 
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
                        action: 'download',
          
                        padding: 5,
                        width: 100,
                        iconCls: 'icon-excel',
                        text: 'Download'
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
    }
});