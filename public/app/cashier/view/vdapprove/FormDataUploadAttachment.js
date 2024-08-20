Ext.define('Cashier.view.vdapprove.FormDataUploadAttachment', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.formdatauploadattachment',
    id: 'form-file-main',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 200,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0',
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
                        xtype: 'filefield',
                        id: 'form-file-attachment',
                        emptyText: 'Select PDF/IMG file',
                        fieldLabel: 'File',
                        name: 'file-path-attachment',
                        allowBlank: false,
                        buttonText: '',
                        buttonConfig: {
                            iconCls: 'icon-plus'
                            },
                        fileInputAttributes: {
                                accept: 'pdf'
                            }
                    },
                    {
                        xtype: 'textfield',
                        id: 'title-file',
                        fieldLabel: 'Description',
                        name: 'file-title',
                        allowBlank: false,
                    }

                ],
            buttons: [{
                text: 'Upload',
                action: 'upload'
            },{
                text: 'Reset',
                handler: function() {
                    this.up('form').getForm().reset();
                }
            }],
            dockedItems: null 
        });

        me.callParent(arguments);
    }
});

