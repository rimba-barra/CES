Ext.define('Cashier.view.consolidationaccess.FormData', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.consolidationaccessformdata',
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
                    name: 'consolidation_access_id',
                },
                {
                    xtype: 'usermodulecashierallcombobox',
                    fieldLabel: 'Email',
                    itemId: 'fd_user_id' + me.uniquename,
                    id: 'user_id' + me.uniquename,
                    name: 'user_user_id',
                    emptyText: 'Select user email',
                    readOnly: false,
                    allowBlank: false,
                    enforceMaxLength: true,
                    margin: '0 0 0 10',
                    enableKeyEvents: true,
                    rowdata: null
                },
                {
                    xtype: 'consolidationv2combobox',
                    fieldLabel: 'Group Consolidation',
                    itemId: 'fd_consolidation_id' + me.uniquename,
                    id: 'consolidation_id_add' + me.uniquename,
                    name: 'consolidation_id',
                    emptyText: 'Select group consolidation',
                    readOnly: false,
                    allowBlank: false,
                    enforceMaxLength: true,
                    margin: '0 0 0 10',
                    enableKeyEvents: true,
                    rowdata: null
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

