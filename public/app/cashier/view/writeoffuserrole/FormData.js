Ext.define('Cashier.view.writeoffuserrole.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.writeoffuserroleformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    deletedRows: [],
    editedRow: -1,
    initComponent: function () {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'left',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'userrole_id'
                },
                {
                    xtype: 'combobox',
                    name: 'project_project_id',
                    fieldLabel: 'Project',
                    displayField: 'project_name',
                    valueField: 'project_project_id',
                    width: '300',
                    queryMode: 'local',
                    allowBlank: false,
                    msgTarget: "side",
                    enforceMaxLength: true,
                    blankText: 'This should not be blank!',
                },
                {
                    xtype: 'combobox',
                    name: 'pt_pt_id',
                    fieldLabel: 'Company',
                    displayField: 'name',
                    valueField: 'pt_id',
                    readOnly: false,
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    forceSelection: false,
                    typeAhead: false,
                    listeners: {
                        keyup: function (field) {
                            var c = 0;
                            var searchString = field.getValue();

                            if (searchString) {

                                this.store.filterBy(function (record, id) {

                                    if (record.get('name').toLowerCase().indexOf(field.getValue()) > -1) {
                                        return true;
                                        this.store.clearFilter(true);
                                    }

                                    else {
                                        return false;
                                        this.store.clearFilter(true);
                                    }
                                });
                            }

                        },
                        buffer: 300,
                    },
                },
                {
                    xtype: 'combobox',
                    name: 'role_id',
                    fieldLabel: 'Role',
                    displayField: 'role',
                    valueField: 'role_id',
                    queryMode: 'local',
                    allowBlank:false,
                    forceSelection: true,
                },
                {
                    xtype: 'combobox',
                    name: 'user_id',
                    fieldLabel: 'User',
                    displayField: 'user_fullname',
                    valueField: 'user_id',
                    queryMode: 'local',
                    allowBlank:false,
                    forceSelection: true,
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
                        action: 'saves',
                        itemId: 'btnSave',
                        padding: 5,
                        width: 75, iconCls: 'icon-save',
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

