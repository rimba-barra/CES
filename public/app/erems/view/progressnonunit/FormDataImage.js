Ext.define('Erems.view.progressnonunit.FormDataImage', {
    extend: 'Erems.library.template.view.FormData',
    requires: [],
    alias: 'widget.progressnonunitformdataimage',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 350,
    bodyBorder: true,
    itemId: 'ProgressnonunitFormdataImage',
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0;background-color:#ffffff;',
    editedRow: -1,
    imageFolder: 'app/erems/uploads/progress_nonunit/',
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
                            xtype:'hiddenfield',
                            name: 'images'
                        }, {
                            xtype: 'filefield',
                            itemId: 'fd_photo',
                            name: 'photo_browse',
                            fieldLabel: 'Image File',
                            emptyText: 'Select an image',
                            buttonText: 'Browse'


                        },
                        {xtype: 'panel',
                            height: 150,
                            width:150,
                            bodyStyle: 'background:none',
                            itemId: 'photo_image',
                            html: ''
                        },
                        {
                            xtype      : 'xnotefieldEST',
                            fieldLabel : 'Description',
                            width      : '100%',
                            name       : 'description',
                            margin     : '5px 0 0 0'
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
                        action: 'save',
                        itemId: 'btnSave',
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