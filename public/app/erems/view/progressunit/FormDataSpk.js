Ext.define('Erems.view.progressunit.FormDataSpk', {
    extend: 'Erems.library.template.view.FormData',
    requires: ['Erems.view.progressunit.GridSpk'],
    alias: 'widget.progressunitformdataspk',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 350,
    bodyBorder: true,
    itemId: 'ProgressunitFormdataSpk',
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0;background-color:#ffffff;',
    editedRow: -1,
    defaults: {
        border: false,
        xtype: 'panel',
        flex: 1,
        layout: ''

    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'container',
                    width: '100%',
                    layout: 'vbox',
                    items: [
                        {
                            xtype:'progressgridspk',
                            height:250,
                            width:'100%'
                        }

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
                        action: 'select_spk',
                        padding: 5,
                        width: 100,
                        iconCls: 'icon-save',
                        text: 'Select SPK'
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