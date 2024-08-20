Ext.define('Cashier.view.writeofflimit.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.writeofflimitformdata',
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
                    name: 'writeoff_limit_id'
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
                    name: 'writeoff_limit_type_id',
                    fieldLabel: 'Limit Type',
                    displayField: 'writeoff_limit_type',
                    valueField: 'writeoff_limit_type_id',
                    queryMode: 'local',
                    allowBlank:false,
                    forceSelection: true,
                },
                {
                    xtype: 'textfield',
                    name: 'limit_percentage',
                    fieldLabel: 'Limit Percentage',
                    readOnly: true,
                    fieldStyle: 'text-align:right;align:right',
                    maskRe: /[0-9\-\.]/,
                    emptyText: '',
                    width: 300,
                },
                {
                    xtype: 'textfield',
                    name: 'limit_amount',
                    fieldLabel: 'Limit Amount',
                    readOnly: true,
                    fieldStyle: 'text-align:right;align:right',
                    maskRe: /[0-9\-\.]/,
                    emptyText: '',
                    width: 300,
                },
                {
                    xtype: 'checkboxfield',
                    anchor: '100%',
                    fieldLabel: '',
                    boxLabel: 'Send Email',
                    itemId: 'send_email',
                    name: 'send_email',
                    inputValue: '1',
                    uncheckedValue: '0',
                    //readOnly: true
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

