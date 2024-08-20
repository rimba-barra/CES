Ext.define('Hrd.view.personal.Sample', {
    extend: 'Hrd.library.box.view.FormData',
    alias: 'widget.personalsample',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            },
            items: [{
                    xtype: 'hiddenfield',
                    itemId: 'fdms_id',
                    name: 'cancelreason_id'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_code',
                 
                    name: 'code',
                    fieldLabel: 'Code',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 5,
                    anchor: '20%'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_side',
                    name: 'cancelreason',
                    fieldLabel: 'Cancel Reason',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50,
                    anchor: '-5'
                },
                {
                    xtype: 'textareafield',
                    height: 60,
                    itemId: 'fdms_description',
                    name: 'description',
                    fieldLabel: 'Description',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 255,
                    anchor: '-5'
                }],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});