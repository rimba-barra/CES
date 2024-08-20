Ext.define('Gl.view.subaccountcode.FormData', {
    extend: 'Gl.library.template.view.FormData',
    alias: 'widget.subaccountcodeformdata',   
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    height: 400,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;


        Ext.applyIf(me, {
            defaults: {
                //labelAlign: 'top',
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
                    itemId: 'fdms_subgl_id',
                    name: 'subgl_id'
                },
                {
                    xtype: 'subaccountgroupcombobox', //dari alias yang di riquires Gl.library.template.combobox.Subaccountgroupcombobox
                    fieldLabel: 'Kelompok Sub Account',
                    anchor: '-5',
                    allowBlank: false,
                    name: 'kelsub_id', // kelsub_id disamakan dengan yang ada di Subaccountgroupcombobox
                    itemId: 'fd_kelsub_id', //kelsub_id disamakan dengan yang ada di Subaccountgroupcombobox
                    id: 'fd_kelsub_id',
                    flex: 1
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_code1',
                    id: 'fdms_code1',
                    name: 'code1',
                    emptyText: 'Maximal 8 Digit',
                    fieldLabel: 'Code 1',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 8,
                    anchor: '-5',
                    enableKeyEvents : true
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_code2',
                    id: 'fdms_code2',
                    emptyText: 'Maximal 2 Digit',
                    name: 'code2',
                    fieldLabel: 'Code 2',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 2,
                    anchor: '-5',
                    enableKeyEvents : true
                },
                {
                    xtype: 'subdesccodecombobox', //dari alias yang di riquires Gl.library.template.combobox.subdesccodecombobox
                    fieldLabel: 'Code 3',
                    anchor: '-5',
                    allowBlank: true,
                    name: 'code3', // subdsk_id disamakan dengan yang ada di Subdesccodecombobox
                    itemId: 'fd_code3', //subdsk_id disamakan dengan yang ada di Subdesccodecombobox
                    id: 'fd_code3',
                    flex: 1
                },
                {
                    xtype: 'subdesccodecombobox', //dari alias yang di riquires Gl.library.template.combobox.subdesccodecombobox
                    fieldLabel: 'Code 4',
                    anchor: '-5',
                    allowBlank: true,
                    name: 'code4', // subdsk_id disamakan dengan yang ada di Subdesccodecombobox
                    itemId: 'fd_code4', //subdsk_id disamakan dengan yang ada di Subdesccodecombobox
                    id: 'fd_code4',
                    flex: 1
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_code',
                    id: 'fdms_code',
                    name: 'code',
                    fieldLabel: 'Code sub Account',
                    allowBlank: false,
                    enforceMaxLength: true,
                    emptyText: '[Code 1]<spasi>[Code 2][Code 3][Code 4]',
                    maskRe: /[^\`\"\']/,
                    anchor: '-5'
                },
                {
                    xtype: 'textareafield',
                    itemId: 'fdms_description',
                    id: 'fdms_description',
                    name: 'description',
                    fieldLabel: 'Description',
                    allowBlank: true,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50,
                    anchor: '-5'
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
});

