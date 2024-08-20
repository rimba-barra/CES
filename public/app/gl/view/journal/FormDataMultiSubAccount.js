Ext.define('Gl.view.journal.FormDataMultiSubAccount', {
    extend: 'Gl.library.template.view.FormData',
    alias: 'widget.formdatamultisubaccount',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
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
                    itemId: 'fdms_voucherno_sub',
                    name: 'voucherno_sub'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'kelsub_id_multi_sub',
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_prefix_id',
                    name: 'journalsubdetail_id'
                },
                {
                    xtype: 'panel',
                    title: 'Input Semua Account',
                    collapsible: true,
                    layout: 'vbox',
                    items:
                            [
                                {
                                    xtype: 'panel',
                                    width: '100%',
                                    layout: 'vbox',
                                    padding: '10px 0 0 20px',
                                    bodyStyle: 'border:0px',
                                    items:
                                            [
                                                {
                                                    xtype: 'subaccountcodecombobox',
                                                    itemId: 'fdms_kelsub_id_sub_from_multi',
                                                    name: 'kelsub_id_sub_from_multi',
                                                    fieldLabel: 'Sub Account',
                                                    emptyText: 'Master Sub Account - kode sub account',
                                                    allowBlank: false,
                                                    enableKeyEvents: true,
                                                    absoluteReadOnly: true,
                                                    width: 400,
                                                },
                                                {
                                                    xtype: 'label',
                                                    forId: 'range',
                                                    text: '--- Sampai Dengan ---',
                                                    margin: '0 1000 0 170',
                                                },
                                                {
                                                    xtype: 'tbspacer',
                                                    height: 10
                                                },
                                                {
                                                    xtype: 'subaccountcodecombobox',
                                                    itemId: 'fdms_kelsub_id_sub_until_multi',
                                                    name: 'kelsub_id_sub_until_multi',
                                                    fieldLabel: 'Sub Account',
                                                    emptyText: 'Master Sub Account - kode sub account',
                                                    allowBlank: false,
                                                    enableKeyEvents: true,
                                                    absoluteReadOnly: true,
                                                    width: 400,
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'fdms_keterangan_sub_multi',
                                                    name: 'keterangan_sub_multi',
                                                    fieldLabel: 'Keterangan',
                                                    allowBlank: false,
                                                    maxLength: 500,
                                                    readOnly: false,
                                                    enableKeyEvents: true,
                                                    width: 500,
                                                },
                                                {
                                                    xtype: 'textfield',
                                                    itemId: 'fdms_amount_sub_multi',
                                                    name: 'amount_sub_multi',
                                                    fieldLabel: 'Amount',
                                                    maskRe: /[0-9\.]/,
                                                    allowBlank: false,
                                                    maxLength: 20,
                                                    readOnly: false,
                                                    enableKeyEvents: true,
                                                    width: 300,
                                                },
                                            ]
                                },
                            ]

                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

