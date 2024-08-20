Ext.define('Erems.library.Formdatapanel', {
    config: {
        panel: '',
        app: 'Erems',
        category: 'view',
        name: 'facilitiestype'
    },
    constructor: function(config) {
        this.initConfig(config);
        return this;
    },
    run: function() {
        this.createPanel();
    },
    createPanel: function() {
        var name = this.name.toLowerCase();
        var panelName = name + 'formdata';

        var that = this;
        Ext.define(this.app + '.' + this.category + '.' + name + '.FormData', {
            extend: 'Ext.form.Panel',
            alias: 'widget.' + panelName,
            frame: true,
            fileUpload: true,
            autoScroll: true,
            bodyBorder: true,
            bodyPadding: 10,
            bodyStyle: 'border-top:none;border-left:none;border-right:none;',
            initComponent: function() {
                var me = this;

                Ext.applyIf(me, {
                    defaults: {
                        labelAlign: 'top',
                        labelSeparator: ' ',
                        labelClsExtra: 'small',
                        fieldStyle: 'margin-bottom:3px;',
                        anchor: '100%'
                    },
                    items: [
                        {
                            xtype: 'hiddenfield',
                            itemId: 'facilitiestype_id',
                            name: 'facilitiestype_id'
                        }, /*
                         {
                         xtype: 'textfield',
                         itemId: 'code',
                         name: 'code',
                         fieldLabel: 'Code',
                         allowBlank: false,
                         enforceMaxLength: true,
                         maskRe: /[^\`\"\']/,
                         maxLength: 50
                         },
                         */{
                            xtype: 'filefield',
                            id: 'form-file-fail',
                            emptyText: 'Select an image',
                            fieldLabel: 'Photo',
                            name: 'photo-path',
                            buttonText: '',
                            buttonConfig: {
                                iconCls: 'upload-icon'
                            },
                            listeners: {
                                'change': function(fb, v) {
                                    var form = me.getForm();

                                    form.submit({
                                        url: 'erems\facilitiestype\read',
                                        waitMsg: 'Uploading your photo...',
                                        success: function(fp, o) {
                                            //msg('Success', 'Processed file "' + o.result.file + '" on the server');
                                        },
                                        failure: function() {
                                           // Ext.Msg.alert("Error", Ext.JSON.decode(this.response.responseText).message);
                                        }
                                    });

                                }
                            }
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'facilitiestype',
                            name: 'facilitiestype',
                            fieldLabel: 'Facilities Type',
                            allowBlank: false,
                            enforceMaxLength: true,
                            maskRe: /[^\`\"\']/,
                            maxLength: 50
                        },
                        {
                            xtype: 'textfield',
                            itemId: 'icon',
                            name: 'icon',
                            fieldLabel: 'Icon (10*10px)',
                            allowBlank: false,
                            enforceMaxLength: true,
                            maskRe: /[^\`\"\']/,
                            maxLength: 50
                        },
                        {
                            xtype: 'textareafield',
                            height: 60,
                            itemId: 'description',
                            name: 'description',
                            fieldLabel: 'Description',
                            enforceMaxLength: true,
                            maskRe: /[^\`\"\']/,
                            maxLength: 255
                        }

                    ],
                    dockedItems: [
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
                                    text: 'Cancel'
                                }
                            ]
                        }
                    ]
                });

                me.callParent(arguments);
            }

        });
    }



});

