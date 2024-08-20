Ext.define('Hrd.view.accessgroup.FormData', {
    alias: 'widget.accessgroupformdata',
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
                    name: 'accessgroup_id',
                },
                {
                    xtype: 'numberfield',
                    name: 'index_no',
                    fieldLabel: 'Level',
                    readOnly: false,
                    allowBlank: false,
                },
                {
                    xtype: 'textfield',
                    name: 'accessgroup',
                    fieldLabel: 'Access Group',
                    readOnly: false,
                    allowBlank: false,
                    width:500,
					maxLength:100
                },
                {
                    xtype: 'textfield',
                    name: 'description',
                    fieldLabel: 'Description',
                    readOnly: false,
                    allowBlank: false,
                    width:500,
                }],
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