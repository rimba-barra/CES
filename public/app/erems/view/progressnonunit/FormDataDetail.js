Ext.define('Erems.view.progressnonunit.FormDataDetail', {
    extend: 'Erems.library.template.view.FormData',
    requires: ['Erems.view.progressnonunit.GridImage'],
    alias: 'widget.progressnonunitformdatadetail',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 400,
    bodyBorder: true,
    itemId: 'ProgressunitFormdataDetail',
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0;background-color:#ffffff;',
    editedRow: 0,
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
                    xtype: 'hiddenfield',
                    name: 'construction_id'
                },
                {
                    xtype: 'container',
                    width: '100%',
                    layout: 'vbox',
                    items: [
                        {
                            xtype: 'container',
                            width: '100%',
                            layout: 'hbox',
                            defaults: {
                                width: '100%',
                                margin: '5px 10px 0 0'
                            },
                            items: [
                                {
                                    xtype: 'datefield',
                                    fieldLabel: 'Progress Date',
                                    name: 'progress_date',
                                    format: 'd-m-Y',
                                    value: new Date(),
                                    submitFormat:'Y-m-d',
                                    flex: 1
                                },
                                {
                                    xtype: 'textfield',
                                    fieldLabel: 'Progress',
                                    name: 'progress_persen',
                                    flex: 1
                                },
                                {
                                    xtype: 'label',
                                    text: '%',
                                    width: 30,
                                    margin: '5px 0 0 10px'

                                }
                            ]
                        },
                        {
                            xtype      : 'xnotefieldEST',
                            fieldLabel : 'Note',
                            name       : 'notes',
                            width      : '100%',
                            margin     : '5px 0 0 0'
                        }
                    ]
                },
                {
                    xtype: 'progressnonunitgridimage',
                    width: '100%',
                    itemId: 'ProgressGridImage',
                    height: 200,
                    margin: '10px 5px'
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