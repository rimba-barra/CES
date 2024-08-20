Ext.define('Gl.view.setlaprugilaba.FormData', {
    extend: 'Gl.library.template.view.FormData',
    alias: 'widget.setlaprugilabaformdata',
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
                    name: 'hideparam',
                    value: 'default'
                },
                {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_rptformat_id',
                    name: 'rptformat_id'
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_sort',
                    name: 'sort',
                    fieldLabel: 'Nomor Urut',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50,
                    anchor: '-5',
                    enableKeyEvents: true
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_coa',
                    name: 'coa',
                    fieldLabel: 'Coa',
                    allowBlank: true,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50,
                    anchor: '-5',
                    enableKeyEvents: true
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_name',
                    name: 'name',
                    fieldLabel: 'Keterangan',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50,
                    anchor: '-5',
                    enableKeyEvents: true
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_report_level',
                    name: 'report_level',
                    fieldLabel: 'Template Level',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50,
                    anchor: '-5',
                    enableKeyEvents: true
                },
                {
                    xtype: 'textfield',
                    itemId: 'fdms_level',
                    name: 'level',
                    fieldLabel: 'Level',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50,
                    anchor: '-5',
                    enableKeyEvents: true
                },
                {
                    xtype: 'fieldcontainer',
                    fieldLabel: 'Type',
                    defaultType: 'radiofield',
                    defaults: {
                        flex: 3
                    },
                    layout: 'hbox',
                    items: [
                        {
                            boxLabel: 'Debet',
                            name: 'type',
                            inputValue: 'D',
                            id: 'radio1'
                        },
                        {
                            boxLabel: 'Credit',
                            name: 'type',
                            inputValue: 'C',
                            id: 'radio2'
                        }
                    ]

                },
                {
                    xtype: 'combo',
                    fieldLabel: 'Level',
                    emptyText: 'Please Select',
                    name: 'flag',
                    queryMode: 'local',
                    anchor: '100%',
                    store: Ext.create('Ext.data.Store', {
                        fields: ['flag', 'desc'],
                        data: [
                            {
                                "flag": 'H',
                                "desc": "Header"

                            },
                            {
                                "flag": 'I',
                                "desc": "Item"

                            },
                            {
                                "flag": 'T',
                                "desc": "Total"

                            },
                            {
                                "flag": 'G',
                                "desc": "Grand Total"

                            }

                        ]
                    }),
                    displayField: 'desc',
                    valueField: 'flag',
                    autoSelect: true,
                    forceSelection: true
                }


            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});

