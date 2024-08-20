Ext.define('Hrd.view.klaimpengobatan.FormUpload', {
    alias: 'widget.klaimpengobatanformupload',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    height:140,
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            items: [
                
                // {
                //     xtype: 'filefield',
                //     fieldLabel: 'File',
                //     itemId: 'file',
                //     name: 'excel',
                // },
                {
                                    xtype: 'container',
                                    layout: 'hbox',
                                    items: [
                                        {
                                            xtype: 'textfield',
                                            name: 'file_name_show',
                                            fieldLabel: 'File Name',
                                            readOnly: true,
                                            width:400
                                        },
                                        {
                                            xtype: 'filefield',
                                            fieldLabel: '',
                                            itemId: 'file_name_upload',
                                            name: 'file_name_upload',
                                            buttonOnly: true,
                                            buttonText: 'Browse',
                                            width:50,
                                            margin: '0 5px 0 10px',
                                        },
                                        {
                                            xtype:'button',
                                            fieldLabel:' ',
                                            text:'View File',
                                            itemId: 'view_file',
                                            action:'view_file'
                                        }
                                    ]
                                },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype:'button',
                            fieldLabel:' ',
                            text:'Download Template A',
                            itemId: 'download_template',
                            action:'download_template',
                            margin: '15px 15px 0 0',
                        },
                        {
                            xtype:'button',
                            fieldLabel:' ',
                            text:'Download Template B',
                            itemId: 'download_template_b',
                            action:'download_template_b',
                            margin: '15px 15px 0 0',
                        }
                    ]
                },
                // {
                //     xtype: 'container',
                //     layout: 'hbox',
                //     items: [
                //         {
                //             xtype:'button',
                //             fieldLabel:' ',
                //             text:'Download Template B',
                //             itemId: 'download_template_b',
                //             action:'download_template_b',
                //             margin: '15px 15px 0 0',
                //         }
                //     ]
                // },
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
                        action: 'process',
                        itemId: 'btnUpload',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Process'
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