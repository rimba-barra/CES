Ext.define('Cashier.view.vdrequest.FormDataUploadAttachment', {
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
                        emptyText: 'Select PDF/PNG/IMG/TIFF file',
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
                        xtype: 'fieldcontainer',
                        layout: 'hbox',
                        fieldLabel: 'Description',
                        items: [
                            {
                                xtype: 'textfield',
                                id: 'prefix-description',
                                name: 'prefix_description',
                                fieldLabel: '',
                                width: '70',
                                readOnly: true,
                                value: 'Additional - ',
                                margin: '0 5 0 0',
                            },
                            {
                                xtype: 'textfield',
                                id: 'title-file',
                                fieldLabel: '',
                                name: 'file-title',
                                allowBlank: false,
                                width: '253'
                            }
                        ]
                    }
                ],
            buttons: [
                {
                    text: 'Upload',
                    action: 'upload',
                    id: 'btnUploadFormAttachment'
                },
                {
                    text: 'Upload & Save',
                    action: 'uploadandsave',
                    id: 'btnUploadAndSaveFormAttachment'
                },
                {
                    text: 'Reset',
                    handler: function() {
                        this.up('form').getForm().reset();
                    }
                }
            ],
            dockedItems: null 
        });

        me.callParent(arguments);
    }
});

