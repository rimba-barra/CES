Ext.define('Hrd.library.box.view.FormData', {
    extend: 'Ext.form.Panel',
    //alias: 'widget.HolidayFormData',
    requires:['Hrd.library.box.view.DateField'],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    fieldDefaults: {
        labelSeparator: ''

    },
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    itemId: 'holiday_id',
                    name: 'holiday_id'
                },
                {
                    xtype: 'textfield',
                    itemId: 'holiday_name',
                    name: 'holiday_name',
                    fieldLabel: 'Holiday Name',
                    allowBlank: false,
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },
                {
                    xtype: 'datefield',
                    itemId: 'holiday_date',
                    name: 'holiday_date',
                    fieldLabel: 'Holiday Date',
                    editable: false,
                    format: 'd-M-Y',
                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                    submitFormat: 'Y-m-d H:i:s.u'
                },
                {
                    xtype: 'textareafield',
                    height: 60,
                    itemId: 'description',
                    name: 'description',
                    fieldLabel: 'Description',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 255
                },
                {
                    xtype: 'checkboxfield',
                    itemId: 'active',
                    margin: '15 0 0 0',
                    name: 'active',
                    boxLabel: 'Active',
                    inputValue: '1',
                    uncheckedValue: '0'
                }
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    textfieldStyle: function(readOnly, align) {
        var x = align ? 'left' : 'right';
        var y = readOnly ? 'background:none !improtant;background-color:#F2F2F2 !important;' : '';
        var y = '';
        var text = y + 'text-align:' + x;
        return text;
    },
    textFieldDefault: function(readOnly) {
        var x = {
            xtype: 'textfield',
            padding: '5px 0 0 0',
            width: '100%',
            fieldStyle: 'background:none !important;background-color:#F2F2F2 !important;',
            readOnly: true

        };
        var z = {
            xtype: 'textfield',
            padding: '5px 0 0 0',
            width: '100%'
        };
        var y = null;
        y = readOnly ? x : z;

        return x;
    },
    generateDockedItem: function() {
        var x = [
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
                        action: 'save',
                        itemId: 'btnSave',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Save'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        handler: function() {
                            this.up('window').close();
                        }
                    }
                ]
            }
        ];
        return x;
    },
    /* added 5 Dec 2013*/
    getState: function() {
        return this.up('window').state;
    },
    generateDefaults: function() {
        var x = {
            labelAlign: 'top',
            labelSeparator: ' ',
            labelClsExtra: 'small',
            fieldStyle: 'margin-bottom:3px;',
            anchor: '100%'
        };
        return x;
    },
    myField: {
        number: function(name, label, enableKeyEvents, anchor) {
            var keyEv = typeof enableKeyEvents == 'undefined' ? false : enableKeyEvents;
            var anc = typeof anchor == 'undefined' ? '-5' : anchor;
            var x = {
                xtype: 'textfield',
                fieldLabel: label,
                name: name,
                itemId: name + 'Id',
                enableKeyEvents: keyEv,
                maskRe: /[0-9\.]/,
                currencyFormat: true,
                fieldStyle: 'text-align:right',
                value: 0.00,
                anchor: anc
            };
            return x;
        }
    },
    /* added 22 Dec 2013*/
    gete: function(name) {
        return this.down("[name='" + name + "']");
    },
    getv: function(name) {
        return this.gete(name).getValue();
    },
    geso: function(name) {
        return this.gete(name).getStore();
    },
    myLoadRecord: function(rec,prefix) {
        var me = this;
        if(rec.data){
            var el = null;
            for(var y in rec.data){
                el = me.down("[name="+prefix+"_"+y+"]");
            
                if(el){
                    el.setValue(rec.get(y));
                }
            }
        }
    }

});