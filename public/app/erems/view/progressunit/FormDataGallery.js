Ext.define('Erems.view.progressunit.FormDataGallery', {
    extend: 'Erems.library.template.view.FormData',
    requires: [],
    alias: 'widget.progressunitformdatagallery',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 450,
    bodyBorder: true,
    itemId: 'ProgressunitFormdataGallery',
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0;background-color:#ffffff;',
    editedRow: -1,
    imageFolder: 'app/erems/uploads/progress_unit/',
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
                        },
                        {xtype: 'panel',
                            height: 300,
                            width:450,
                            bodyStyle: 'background:none;',
                            itemId: 'photo_image',
                            html: ''
                        },
                        {
                            xtype      : 'xnotefieldEST',
                            fieldLabel : '',
                            width      : '100%',
                            readOnly   : true,
                            name       : 'description',
                            margin     : '5px 0 0 0',
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
                        action: 'previous',
                        padding: 5,
                        text: 'Previous'
                    },
                    {
                        xtype: 'label',
                        padding: 5,
                        itemId:'galleryPageInfo',
                        text: 'Page of'
                    },
                    {
                        xtype: 'button',
                        action: 'next',
                        padding: 5,
                        text: 'Next'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Close',
                        handler: function() {
                            this.up('window').close();
                        }
                    },

                    //added by anas 24022021
                    {
                        xtype: 'button',
                        action: 'downlaod',
                        itemId: 'btnDownload',
                        padding: 5,
                        width: 100,
                        icon: document.URL+'app/main/images/icons/download.png',
                        text: 'Download',
                        handler: function( view, rowIndex, colIndex, item, e, record, row ) {
                            this.fireEvent( 'downloadaction', arguments );
                        }
                    }
                ]
            }
        ];
        return x;
    }
});