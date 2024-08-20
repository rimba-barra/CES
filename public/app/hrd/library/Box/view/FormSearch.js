Ext.define('Hrd.library.box.view.FormSearch', {
    extend: 'Ext.form.Panel',
    // alias: 'widget.RoomtypeFormSearch',

    frame: true,
    autoScroll: true,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'roomtype_name',
                    name: 'roomtype_name',
                    fieldLabel: 'Room Type Name',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    },
    generateDockedItems: function() {
        var dockedItems = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'search',
                        itemId: 'btnSearch',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-search',
                        text: 'Search'
                    },
                    {
                        xtype: 'button',
                        action: 'reset',
                        itemId: 'btnReset',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-reset',
                        text: 'Reset'
                    }
                ]
            }
        ];
        return dockedItems;
    },
    generateDefaults: function() {
        var def = {
            labelAlign: 'top',
            labelSeparator: ' ',
            labelClsExtra: 'small',
            fieldStyle: 'margin-bottom:3px;',
            anchor: '100%'
        }
        return def;
    },
    /*@multi xtype */
    createFieldRangeMulti: function(data) {
        var xtype = typeof data.xtype === 'undefined' ? 'textfield' : data.xtype;
        var format = typeof data.format === 'undefined' ? 'm/d/Y' : data.format;
        var x = {
            xtype: 'panel',
            height: 48,
            bodyStyle: 'background:none;border:0;',
            layout: {
                type: 'column'
            },
            items: [
                {
                    xtype: xtype,
                    width: 100,
                    id: 'fs_mastertype_bot' + data.textName,
                    name: 'bot_' + data.textName,
                    fieldLabel: data.fieldLabel,
                    labelSeparator: '',
                    labelAlign: 'top',
                    format: format,
                    labelWidth: 50
                },
                {
                    xtype: 'label',
                    margin: '20px 5px',
                    padding: '0px 20px',
                    styleHtmlContent: false,
                    width: 15,
                    text: data.rangeSeparator
                },
                {
                    xtype: xtype,
                    width: 100,
                    id: 'fs_mastertype_top' + data.textName,
                    name: 'top_' + data.textName,
                    fieldLabel: '&nbsp;',
                    labelSeparator: '',
                    format: format,
                    labelAlign: 'top'
                },
                {
                    xtype: 'label',
                    margin: '20px 0px',
                    padding: '0px 5px',
                    text: data.tailText
                }
            ]
        };
        return x;
    },
    createFieldRange: function(data) {

        var x = {
            xtype: 'panel',
            height: 48,
            bodyStyle: 'background:none;border:0;',
            layout: {
                type: 'column'
            },
            items: [
                {
                    xtype: 'numberfield',
                    width: 100,
                    id: 'fs_mastertype_bot' + data.textName,
                    name: 'bot_' + data.textName,
                    fieldLabel: data.fieldLabel,
                    labelSeparator: '',
                    labelAlign: 'top',
                    labelWidth: 50,
                    maxLength: 9,
                    minValue: 0,
                    typeNumber: 'min',
                    textName: data.textName,
                    value: 0
                },
                {
                    xtype: 'label',
                    margin: '20px 5px',
                    padding: '0px 20px',
                    styleHtmlContent: false,
                    width: 15,
                    text: data.rangeSeparator
                },
                {
                    xtype: 'numberfield',
                    width: 100,
                    id: 'fs_mastertype_top' + data.textName,
                    name: 'top_' + data.textName,
                    fieldLabel: data.fieldLabel,
                    fieldLabel: '&nbsp;',
                            labelSeparator: '',
                    labelAlign: 'top',
                    typeNumber: 'max',
                    textName: data.textName,
                    maxLength: 9,
                    minValue: 0,
                    value: 0
                },
                {
                    xtype: 'label',
                    margin: '20px 0px',
                    padding: '0px 5px',
                    text: data.tailText
                }
            ]
        };
        return x;
    },
    templateNameAndDepartment: function() {
        var x = {
            xtype: 'container',
            layout: 'hbox',
            defaults: {
                margin: '0 10px 0 0'
            },
            items: [
                {
                    xtype: 'textfield',
                    name: 'employee_name',
                    fieldLabel: 'Name',
                    
                },
                {
                    xtype: 'combobox',
                    name: 'department_department_id',
                    fieldLabel: 'Department',
                    displayField: 'department',
                    valueField: 'department_id'
                },
                {
                    xtype: 'button',
                    action: 'search',
                    text: 'Search',
                    padding: 5,
                    width: 75,
                    iconCls: 'icon-search',
                },
                {
                    xtype: 'button',
                    action: 'reset',
                    text: 'Reset',
                    padding: 5,
                    width: 75,
                    iconCls: 'icon-reset',
                }
            ]
        };
        return x;
    }

});