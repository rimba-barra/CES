Ext.define('Cashier.view.rcashadvance.FormDatarevision', {
    extend: 'Cashier.library.template.view.FormData',
    alias: 'widget.rcashadvanceformdatarevision',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 180,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    uniquename: "_fdrrcashadvanceformdata",
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
                    id: 'hideparam' + me.uniquename,
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'pt_id',
                    id: 'pt_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kasbon_id',
                    id: 'kasbon_id' + me.uniquename,
                },
                {
                    xtype: 'hiddenfield',
                    name: 'accept_date',
                    id: 'accept_date' + me.uniquename,
                    value: ''
                },
                {
                    xtype: 'hiddenfield',
                    name: 'claim_date',
                    id: 'claim_date' + me.uniquename,
                    value: ''
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kasbonrevision_id',
                },
                {
                    xtype: 'textareafield',
                    itemId: 'fdms_description',
                    id: 'revision_note' + me.uniquename,
                    name: 'revision_note',
                    fieldLabel: 'Description',
                    allowBlank: false,
                    enforceMaxLength: true,
                    grow: true,
                    width: 645,
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

