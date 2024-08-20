Ext.define('Cashier.view.vdrequest.FormDataCheckingVoucher', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.formdatacheckingvoucher',
    id: 'form-file-main',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 250,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'padding:5px 5px 0',
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
                    name: 'voucher_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'project_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'pt_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'approval_type',
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Reg No',
                    name: 'regno',
                    readOnly: true
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Role',
                    name: 'role',
                    readOnly: true
                },
                {
                    xtype: 'textareafield',
                    fieldLabel: 'Notes',
                    name: 'notes',
                    // allowBlank: false,
                }

            ],
            buttons: [{
                text: 'OK',
                action: 'ok'
            },{
                text: 'Cancel',
                action: 'cancel'
            }],
            dockedItems: null 
        });

        me.callParent(arguments);
    }
});

