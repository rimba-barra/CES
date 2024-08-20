Ext.define('Hrd.view.cleansingdata.Formlookupdocument', {
    extend: 'Hrd.library.template.view.FormData',
    alias: 'widget.cleansingdataformlookupdocument',
    requires: [
        'Hrd.view.cleansingdata.Griddocument',
    ],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 400,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'cleansingdatadocumentgrid',
                    itemId: 'fd_cleansingdatadocumentgrid',
                    title: 'Document',
                    name: 'cleansingdatadocumentgrid',
                    title: 'Document',
                    width: '98%',
                    height: 300,
                    padding: '20px 0 0 20px',
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
    },
});

