Ext.define('Gl.view.koreksisetelahposting.FormDataSubAccount', {
    extend: 'Gl.library.template.view.FormData',
    alias: 'widget.formdatakspsubaccount',
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
                    name: 'statedata_sub',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'deleted',
                    value: false
                },
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                /*
                 {
                 xtype: 'hiddenfield',
                 itemId: 'fdms_subgl_id_sub',
                 name: 'subgl_id_sub'
                 },
                 */
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_kelsub_id_sub',
                    name: 'kelsub_id_sub'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_journal_id_sub',
                    name: 'journal_id_sub'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_journaldetail_id_sub',
                    name: 'journaldetail_id_sub'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_journalsubdetail_id_sub',
                    name: 'journalsubdetail_id_sub'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_code1_sub',
                    name: 'code1_sub'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_code2_sub',
                    name: 'code2_sub'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_code3_sub',
                    name: 'code3_sub'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_code4_sub',
                    name: 'code4_sub'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_code_sub',
                    name: 'code_sub'
                },
                {
                    xtype: 'panel',
                    title: 'Sub Account',
                    collapsible: true,
                    layout: 'vbox',
                    items: [
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
                                            itemId: 'fdms_subgl_sub',
                                            name: 'subgl_id_sub',
                                            fieldLabel: 'Sub Account',
                                            emptyText: 'Master Sub Account - kode sub account',
                                            allowBlank: false,
                                            enableKeyEvents: true,
                                            absoluteReadOnly: true,
                                            width: 400,
                                        },
                                        {
                                            xtype: 'tbspacer',
                                            height: 10
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'fdms_kelsub_sub',
                                            name: 'kelsub_sub',
                                            fieldLabel: 'Nama Account',
                                            allowBlank: true,
                                            maxLength: 100,
                                            readOnly: true,
                                            enableKeyEvents: true,
                                            width: 500,
                                        },
                                        {
                                            xtype: 'textfield',
                                            itemId: 'fdms_keterangan_sub',
                                            name: 'keterangan_sub',
                                            fieldLabel: 'Keterangan',
                                            allowBlank: false,
                                            maxLength: 300,
                                            readOnly: false,
                                            enableKeyEvents: true,
                                            width: 500,
                                        },
                                        {
                                            xtype: 'numberfield',
                                            itemId: 'fdms_amount_sub',
                                            name: 'amount_sub',
                                            allowDecimals: true,
                                            decimalSeparator: ".",
                                            decimalPrecision: 2,
                                            fieldLabel: 'Amount',
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

