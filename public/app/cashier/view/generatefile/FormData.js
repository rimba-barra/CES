Ext.define('Cashier.view.generatefile.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.generatefileformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 240,
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
                    name: 'generatefile_id',
                },
                {
                    xtype: 'appscombobox',
                    fieldLabel: 'Application',
                    itemId: 'fd_apps_id',
                    id: 'apps_id',
                    name: 'apps_id',
                    emptyText: 'Select Apps',
                    width: 400,
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    grow: true,
                },
                {
                    xtype: 'databasecombobox',
                    fieldLabel: 'Database',
                    itemId: 'fd_dabatabase',
                    id: 'dabatabase',
                    name: 'dabatabase',
                    emptyText: 'Select Database',
                    width: 400,
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    grow: true,
                },
                {
                    xtype: 'tablecombobox',
                    fieldLabel: 'Table',
                    itemId: 'fd_table',
                    id: 'table',
                    name: 'table',
                    emptyText: 'Select Table',
                    width: 400,
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    grow: true,
                },
                {
                    xtype: 'appscontrollercombobox',
                    fieldLabel: 'Controller',
                    itemId: 'fd_controller',
                    id: 'controller',
                    name: 'Controller',
                    emptyText: 'Select Controller Of Application',
                    width: 400,
                    allowBlank: false,
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null,
                    grow: true,
                },
               
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

