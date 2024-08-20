Ext.define('Cashier.view.configdb.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.configdbformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 300,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'config_id',
                },
                {
                    xtype: 'basedbcombobox',
                    fieldLabel: 'For Database',
                    itemId: 'fd_base_db' + me.uniquename,
                    id: 'base_db' + me.uniquename,
                    name: 'base_db',
                    emptyText: '',
                    width: 190,
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
              
                {
                    xtype: 'baseappscombobox',
                    fieldLabel: 'For Apps',
                    itemId: 'fd_for_apps' + me.uniquename,
                    id: 'for_apps' + me.uniquename,
                    name: 'for_apps',
                    emptyText: '',
                    width: 190,
                    allowBlank: true,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },
              
                {
                    xtype: 'textfield',
                    itemId: 'fdms_host',
                    name: 'host',
                    fieldLabel: 'Hostname',
                    allowBlank: false,
                    enableKeyEvents: true,
                    enforceMaxLength: true,
                    maxLength: 50,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_username',
                    name: 'username',
                    fieldLabel: 'Username',
                    enableKeyEvents: true,
                    allowBlank: true,
                    enforceMaxLength: true,
                    maxLength: 50,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_password',
                    name: 'password',
                    fieldLabel: 'password',
                    enableKeyEvents: true,
                    allowBlank: true,
                    enforceMaxLength: true,
                    maxLength: 160,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_db',
                    name: 'db',
                    fieldLabel: 'Database',
                    enableKeyEvents: true,
                    allowBlank: true,
                    enforceMaxLength: true,
                    maxLength: 160,
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_port',
                    name: 'port',
                    fieldLabel: 'port',
                    enableKeyEvents: true,
                    allowBlank: true,
                    enforceMaxLength: true,
                    maxLength: 20,
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

