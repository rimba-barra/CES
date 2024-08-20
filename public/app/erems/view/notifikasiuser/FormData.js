Ext.define('Erems.view.notifikasiuser.FormData', {
    extend: 'Erems.library.template.view.FormData',
    alias: 'widget.notifikasiuserformdata',
    frame: true,
    autoScroll: true,
    anchorSize: 100,
    bodyBorder: true,
    bodyPadding: 10,
    height      : 360,
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
            items: [
            {
                    xtype: 'hiddenfield',
                    itemId: 'fdms_id',
                    name: 'notifikasi_user_id'
                },
                {
                    xtype: 'emailcombobox',
                    name: 'user_email',
                    width: 240,
                    typeAhead:true,
                    forceSelection:true,
                    listeners: {
                        beforequery: function (record) {
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
                {
                    xtype: 'notifikasimodulecombobox',
                    name: 'module_name',
                    width: 240,
                    typeAhead:true,
                    forceSelection:true,
                    listeners: {
                        beforequery: function (record) {
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
                {
                    xtype      : 'xnotefieldEST',
                    fieldLabel : 'Notes',
                    name       : 'notes',
                    flex       : 1,
                    readOnly   : true
                },
                // added by rico 06022023
                {
                    xtype: 'combobox',
                    name: 'dayofweek',
                    fieldLabel: 'Day Of Week',
                    displayField: 'name',
                    valueField: 'value',
                    width: 240,
                    editable:false,
                    store: Ext.create('Ext.data.Store', {
                        fields: ['value', 'name'],
                        data: [
                            {"value": 0, "name": "Minggu"},
                            {"value": 1, "name": "Senin"},
                            {"value": 2, "name": "Selasa"},
                            {"value": 3, "name": "Rabu"},
                            {"value": 4, "name": "Kamis"},
                            {"value": 5, "name": "Jumat"},
                            {"value": 6, "name": "Sabtu"}
                        ]
                    }),
                    queryMode: 'local',
                    multiSelect: true
                },
                {
                    xtype : 'label', 
                    flex  : 7,
                    text  : 'Days Of Month'
                },
                {
                    padding   : '10px 0 0 0',
                    layout    : 'hbox',
                    bodyStyle : 'border:0px',
                    align     : "left",
                    bodyStyle : 'background-color:#dfe9f6;border:0px;',
                    items     : [
                        {
                            xtype          : 'checkboxfield',
                            anchor         : '-5',
                            name           : 'is_allday',
                            itemId         : 'is_allday',
                            inputValue     : '1',
                            uncheckedValue : '0',
                            margin         : '0 5px 0 0'
                        },
                        {
                            xtype : 'label', 
                            flex  : 8,
                            text  : 'All Day'
                        }
                    ]
                },
                {
                    xtype      : 'textfield',
                    fieldLabel : '',
                    anchor     : '-5',
                    name       : 'dayofmonth',
                    labelWidth : 70,
                    maskRe: /[0-9,]/,
                    enableKeyEvents : true,
                }, 
                {
                    padding   : '10px 0 0 0',
                    layout    : 'hbox',
                    bodyStyle : 'border:0px',
                    align     : "left",
                    bodyStyle : 'background-color:#dfe9f6;border:0px;',
                    items     : [
                        {
                            xtype : 'label',
                            flex  : 1,
                            text  : 'Status'
                        },
                        {
                            xtype          : 'checkboxfield',
                            anchor         : '-5',
                            name           : 'status',
                            itemId         : 'status',
                            inputValue     : '1',
                            uncheckedValue : '0',
                            margin         : '0 5px 0 0'
                        },
                        {
                            xtype : 'label', 
                            flex  : 7,
                            text  : 'Active'
                        }
                    ]
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    }
});