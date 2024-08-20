Ext.define('Erems.view.masterberkas.FormDataDocument', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.masterberkasformdatadocument',
    requires: [],
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    editedRow: -1,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'berkas_berkas_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'berkasdocument_id'
                },
                {
                    xtype      : 'textfield',
                    fieldLabel : 'Nama Berkas',
                    name       : 'documentname',
                    readOnly   : true,
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fd_file_text',
                    name: 'filename'
                },
                {
                    xtype: 'filefield',
                    fieldLabel: 'File',
                    itemId: 'fd_file',
                    name: 'file_browse',
                },
                {
                    xtype      : 'xnotefieldEST',
                    name       : 'description',
                    fieldLabel : 'Description'
                },
                {
                    xtype: 'panel',
                    width: 140,
                    height: 170,
                    bodyStyle: 'background:none',
                    itemId: 'file_image',
                    html: ''
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
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Save'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
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

