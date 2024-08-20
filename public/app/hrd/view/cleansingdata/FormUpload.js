Ext.define('Hrd.view.cleansingdata.FormUpload', {
    alias: 'widget.cleansingdataformupload',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    autoScroll: true,
    editedRow: -1,
    requires: [
        'Hrd.template.combobox.Changestatustypedoccombobox',
    ],
    deletedData: {},
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'mode_name'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'changestatus_id'
                },
                {
                    xtype: 'changestatustypedoccombobox',
                    id: 'typedocument',
                    name: 'typedocument',
                    width: 240,
                    allowBlank: false,
                },
                {
                    xtype: 'filefield',
                    id: 'uploadfile',
                    name: 'uploadfile',
                    buttonOnly: false,
                    hideLabel: false,
                    emptyText: 'Select a document to upload...',
                    fieldLabel: 'File',
                    buttonText: 'Browse',
                    width: 420,
                    allowBlank: false,
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function () {
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
                        handler: function () {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    }
});