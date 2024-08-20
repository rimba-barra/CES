Ext.define('Cashier.view.masterlog.FormSearch',{
    extend:'Cashier.library.template.view.FormSearch',
    alias:'widget.masterlogformsearch',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'pt_id',
                },
                {
                    xtype: 'combobox',
                    name: 'project_id',
                    fieldLabel: 'Project',
                    displayField: 'project_name',
                    valueField: 'project_project_id',
                    width: '300',
                    queryMode: 'local',
                    allowBlank: false,
                    msgTarget: "side",
                    enforceMaxLength: true,
                    blankText: 'This should not be blank!',
                    //readOnly: true,
                    //fieldStyle: 'background-color:#eee;background-image: none;'
                },
                {
                    xtype: 'combobox',
                    name: 'pt_pt_id',
                    fieldLabel: 'Company',
                    displayField: 'name',
                    valueField: 'pt_id',
                    readOnly: false,
                    allowBlank: true,
                    queryMode:'local',
                    
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_name',
                    name: 'transaction_no',
                    fieldLabel: 'Transaction No',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },
                {
                    xtype: 'fieldcontainer',
                    layout: 'hbox',
                    bodyBorder: false,
                    fieldLabel: 'Transaction Date',
                    defaults: {
                        layout: 'fit'
                    },
                    width: 100,
                    items: [
                        {
                            xtype: 'datefield',
                           // itemId: 'fsms_idvoucherdatestart',
                            name: 'addon_start',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            flex: 1,
                            emptyText: 'From',
                        },
                        {
                            xtype: 'splitter',
                            width: '5'
                        },
                        {
                            xtype: 'datefield',
                           // itemId: 'fsms_idvoucherdateend',
                            name: 'addon_end',
                            format: 'd-m-Y',
                            submitFormat: 'Y-m-d',
                            flex: 1,
                            emptyText: 'To',
                        },
                    ]
                },
                {
                    xtype: 'combobox',
                    name: 'user_id',
                    fieldLabel: 'Username',
                    displayField: 'user_name',
                    valueField: 'user_id',
                    queryMode:'local',
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_notes',
                    name: 'notes',
                    fieldLabel: 'Notes',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_action_type',
                    name: 'action_type',
                    fieldLabel: 'Transaction Type',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },
                {
                    xtype: 'textfield',
                    itemId: 'fs_module_log',
                    name: 'module_log',
                    fieldLabel: 'Module',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },
            ],
            dockedItems: me.generateDockedItems()
        });
        me.callParent(arguments);
    }
});
