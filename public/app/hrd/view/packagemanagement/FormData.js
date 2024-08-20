Ext.define('Hrd.view.packagemanagement.FormData', {
    alias: 'widget.packagemanagementformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.view.packagemanagement.GridDetail'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function () {
        var me = this;
      //  var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {},
            items: [{
                    xtype: 'hiddenfield',
                    name: 'pmdocument_id',
                },
                , {
                    xtype: 'textfield',
                    name: 'code',
                    fieldLabel: 'Package Doc Code',
                    readOnly: false,
                    allowBlank: false,
                }
                , {
                    xtype: 'textfield',
                    name: 'package_name',
                    fieldLabel: 'Package Doc Name',
                    readOnly: false,
                    allowBlank: false,
                    width: 400,
                }, {
                    xtype: 'packagemanagementgriddetail',
                    height: 300,
                    style: 'padding: 10 0 10 0'
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
                        action: 'approve',
                        itemId: 'btnApprove',
						hidden:true,
                        padding: 5,
                        width: 75,
                        icon: 'app/main/images/icons/approve.png',
                        text: 'Approve'
                    },
                    {
                        xtype: 'button',
                        action: 'reject',
                        itemId: 'btnReject',
						hidden:true,
                        padding: 5,
                        width: 75,
                        icon: 'app/main/images/icons/delete.png',
                        text: 'Reject'
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