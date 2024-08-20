Ext.define('Cashier.view.masterrangebagihasil.FormData', {
    extend  : 'Cashier.library.template.view.FormData',
    alias   : 'widget.masterrangebagihasilformdata',
    requires: [
        'Cashier.view.masterrangebagihasil.GridDetail'
    ],
    autoScroll   : true,
    anchorSize   : 100,
    bodyBorder   : true,
    bodyPadding  : 10,
    bodyStyle    : 'border-top:none;border-left:none;border-right:none;',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: {
                labelSeparator: ' ',
                labelClsExtra : 'small',
                fieldStyle    : 'margin-bottom:3px;',
                anchor        : '100%'
            },
            items: [
                {
                    xtype : 'hiddenfield',
                    itemId: 'fdms_id',
                    name  : 'rangebagihasil_id'
                },
                {
                    xtype           : 'textfield',
                    fieldLabel      : 'Kode',
                    labelWidth      : '120px',
                    name            : 'code',
                    allowBlank      : false,
                    anchor          : '45%',
                    enforceMaxLength: true,
                    maxLength       : 5,
                    minLength       : 1,
                    maskRe          : /[A-Za-z0-9]/
                },
                {
                    xtype           : 'textfield',
                    fieldLabel      : 'Nama',
                    labelWidth      : '120px',
                    name            : 'name',
                    allowBlank      : false,
                    anchor          : '45%',
                    enforceMaxLength: true,
                    maxLength       : 50,
                    minLength       : 3,
                    maskRe          : /[A-Za-z0-9\s]/
                },
                {
                    xtype   : 'container',
                    layout  : 'hbox',
                    margin  : '0 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0', labelSeparator: ' '
                    },
                    items: [
                        {
                            xtype           : 'xmoneyfield',
                            fieldLabel      : 'Komisi Marketing',
                            fieldStyle      : 'background:none;background-color:#FFFFFF !important;text-align:right;',
                            maskRe          : /[0-9\.]/,
                            labelWidth      : '120px',
                            name            : 'komisi_marketing',
                            allowBlank      : false,
                            hideTrigger     : true,
                            anchor          : '20%',
                            decimalPrecision: 2,
                            flex            : 1,
                            value           : 1,
                            listeners       : {
                                change: function (el, v, prev) {
                                    var commaPos = v.indexOf('.') + 1,
                                        strLen   = v.length;
                                    if ((commaPos <= 0 && v.length > 10) || (commaPos > 0 && commaPos < strLen - 2)) {
                                        el.setValue(prev);
                                    }

                                    if (el.value > 100) {
                                        el.setValue(100);
                                    } else if (el.value < 0) {
                                        el.setValue(0);
                                    }

                                }
                            }
                        },
                        {
                            xtype : 'label',
                            text  : '%',
                            width : 20,
                            margin: '5px 0 0 -15px',
                            flex  : 2
                        }
                    ]
                },
                {
                    xtype   : 'container',
                    layout  : 'hbox',
                    margin  : '0 0 5px 0',
                    defaults: {
                        margin: '0 20px 0 0', labelSeparator: ' '
                    },
                    items: [
                        {
                            xtype           : 'xmoneyfield',
                            fieldLabel      : 'PPH',
                            fieldStyle      : 'background:none;background-color:#FFFFFF !important;text-align:right;',
                            maskRe          : /[0-9\.]/,
                            labelWidth      : '120px',
                            name            : 'pph',
                            allowBlank      : false,
                            hideTrigger     : true,
                            anchor          : '20%',
                            decimalPrecision: 2,
                            flex            : 1
                        },
                        {
                            xtype : 'label',
                            text  : '%',
                            width : 20,
                            margin: '5px 0 0 -15px',
                            flex  : 2
                        }
                    ]
                },
                {
                    xtype         : 'checkboxfield',
                    fieldLabel    : 'Progresif',
                    name          : 'is_progresif',
                    itemId        : 'is_progresif',
                    checked       : false,
                    inputValue    : '1',
                    uncheckedValue: '0',
                    labelWidth    : '120px'
                },
                {
                    xtype    : 'container',
                    bodyStyle: 'border:0px',
                    items    : [
                        {
                            xtype : 'masterrangebagihasilgriddetail',
                            height: 200,
                            margin: '10 0 5 0'
                        }
                    ]
                }
            ],
            dockedItems: me.generateDockedItem()
        });
        me.callParent(arguments);
    }
});

