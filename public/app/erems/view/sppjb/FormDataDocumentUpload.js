Ext.define('Erems.view.sppjb.FormDataDocumentUpload', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.sppjbformdatadocumentupload',
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
        var doc_type = Ext.create('Ext.data.Store', {
            fields : ['document_type', 'document_type_text'],
            data   : [
                { "document_type": 1, "document_type_text": "SPPJB" },
                { "document_type": 2, "document_type_text": "Surat Kuasa" },
            ]
        });
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'sppjb_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'purchaseletter_id'
                },
                {
                    xtype       : 'hiddenfield',
                    itemId      : 'fd_file_text',
                    name        : 'filename',
                    allowBlank  : false,
                },
                {
                    layout: 'hbox',
                    padding: '10px 0 0 0',
                    bodyStyle: 'border:0px;',
                    width: '100%',
                    items: [
                        {
                            xtype: 'panel', flex: 8,
                            layout: {
                                type: 'vbox',
                                defaultMargins: {top: 0, right: 0, bottom: 10, left: 0}
                            },
                            bodyStyle: 'border:0px;background:none;background-color:#dfe9f6 !important;',
                            items: [
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    width: '100%',
                                    bodyStyle: 'border:0px;background:none;background-color:#dfe9f6 !important;',
                                    items: [
                                        {
                                            xtype              : 'combobox',
                                            anchor             : '-5',
                                            name               : 'doc_type',
                                            store              : doc_type,
                                            fieldLabel         : 'Document Type',
                                            displayField       : 'document_type_text',
                                            valueField         : 'document_type',
                                            allowBlank         : false,
                                            typeAhead          : true,
                                            queryMode          : 'local',
                                            forceSelection     : true,
                                            autoSelect         : true,
                                            lastSelectedRecord : null,
                                            flex               : 1,
                                        },
                                    ]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    width: '100%',
                                    bodyStyle: 'border:0px;background:none;background-color:#dfe9f6 !important;',
                                    items: [
                                        {
                                            xtype      : 'filefield',
                                            fieldLabel : 'Document',
                                            allowBlank : false,
                                            itemId     : 'fd_file',
                                            name       : 'file_browse',
                                            fieldStyle : 'background:none;background-color:#F2F2F2 !important;'
                                        }
                                    ]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    width: '100%',
                                    bodyStyle: 'border:0px;background:none;background-color:#dfe9f6 !important;',
                                    items: [
                                        {
                                            xtype      : 'xnotefieldEST',
                                            name       : 'description',
                                            fieldLabel : 'Description',
                                            flex       : 1,
                                        },
                                    ]
                                },
                                {
                                    layout: 'hbox',
                                    bodyStyle: 'border:0px',
                                    width: '100%',
                                    bodyStyle: 'border:0px;background:none;background-color:#dfe9f6 !important;',
                                    items: [
                                        {
                                            xtype: 'panel',
                                            width: 200,
                                            height: 200,
                                            bodyStyle: 'background:none',
                                            itemId: 'file_image',
                                            html: ''
                                        }
                                    ]
                                },
                            ]
                        }
                    ]
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

