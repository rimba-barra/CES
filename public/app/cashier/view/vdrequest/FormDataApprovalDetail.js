Ext.define('Cashier.view.vdrequest.FormDataApprovalDetail', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.vdrequestformdataapprovaldetail',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 300,
    bodyBorder: true,
    bodyPadding: 10,
    kosongGa: -1,
    selectedIndex: null,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' : ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [{
                xtype: 'hiddenfield',
                id: 'hideparam' + me.uniquename,
                name: 'hideparam',
                value: 'default'
            }, {
                xtype: 'hiddenfield',
                name: 'statedata',
                id: 'statedata' + me.uniquename,
            }, {
                xtype: 'hiddenfield',
                name: 'voucher_groupapprover_id',
                id: 'voucher_groupapprover_id' + me.uniquename,
            }, {
                xtype: 'hiddenfield',
                name: 'user_email',
                id: 'user_email' + me.uniquename,
            }, {
                xtype: 'hiddenfield',
                name: 'approval_id',
                id: 'approval_id' + me.uniquename,
            }, {
                xtype: 'textfield',
                name: 'sequence',
                id: 'sequence' + me.uniquename,
                fieldLabel: 'Sequence',
                width: 100,
                readOnly: true,
                allowBlank: false,
            }, {
                xtype: 'listapprovalcombobox',
                fieldLabel: 'Approval',
                itemId: 'approval_by' + me.uniquename,
                id: 'approval_by' + me.uniquename,
                name: 'approval_by',
                width: 350,
                emptyText: 'Approval',
                readOnly: false,
                allowBlank: false,
                enforceMaxLength: true,
                enableKeyEvents: true,
                forceSelection: true,
                rowdata: null
            }, ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});