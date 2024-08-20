Ext.define('Hrd.view.codeofconduct.FormData', {
    alias: 'widget.codeofconductformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: [],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function () {
        var me = this;
      //  var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {},
            items: [
		{
                    xtype: 'hiddenfield',
                    name: 'codeofconduct_id',
                },
                {
                    xtype: 'textfield',
                    name: 'description',
                    fieldLabel: 'Description',
                    readOnly: false,
                    allowBlank: false,
                    width:500
                },                
                {
                    xtype: 'container',
                    layout: 'hbox',
                    items: [
                        {
                            xtype: 'textfield',
                            name: 'file_name',
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
                            buttonText: 'Select file PDF',
                            width:105
                        }
                    ]
                },
                {
                    xtype: 'checkboxfield',
                    fieldLabel: '&nbsp',
                    boxLabel: 'Active',
                    name: 'active',
                    inputValue: '1',
                    uncheckedValue: '0'
                }
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
                        handler: function () {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    },
});