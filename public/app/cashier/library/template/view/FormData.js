Ext.define('Cashier.library.template.view.FormData', {
    extend: 'Ext.form.Panel',
    //alias: 'widget.HolidayFormData',
    requires :[
        'Cashier.library.template.view.MaskField',
    ],
    frame: true,
    autoScroll: true,
    bodyBorder: true,
    bodyPadding: 10,
    bodyStyle: 'border-top:none;border-left:none;border-right:none;',
    fieldDefaults: {
        labelSeparator: ''

    },
    // maskreHandler : new Cashier.library.MaskreHandler(), 
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
    textfieldStyle:function(readOnly,align){
        var x = align?'left':'right';
        var y = readOnly?'background:none !improtant;background-color:#F2F2F2 !important;':'';
        var y = '';
        var text = y+'text-align:'+x;
        return text;
    },
    textFieldDefault:function(readOnly){
        var x = {
            xtype: 'textfield',
            padding: '5px 0 0 0',
            width: '100%',
            fieldStyle: 'background:none !important;background-color:#F2F2F2 !important;',
            
            readOnly:true

        }  ;
        var z = {
            xtype: 'textfield',
            padding: '5px 0 0 0',
            width: '100%'
        }  ;
        var y = null;
        y = readOnly?x:z;
        
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
    getState:function(){
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
        number: function(name,label,enableKeyEvents,anchor) {
            var keyEv = typeof enableKeyEvents=='undefined'?false:enableKeyEvents;
            var anc = typeof anchor=='undefined'?'-5':anchor;
            var x = {
                xtype: 'textfield',
                fieldLabel: label,
                name: name,
                itemId:name+'Id',
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
    gete:function(name){
        return this.down("[name='"+name+"']");
    },
    getv:function(name){
        return this.gete(name).getValue();
    },
    geso:function(name){
        return this.gete(name).getStore();
    },
    // added 18 Dec 2014
    each:function(func){
        if(typeof func !== "function"){
           return;
        }    
        var f = this;
        var vs = f.getForm().getValues();
        for(var i in vs){
            var el = f.down("[name="+i+"]");
            if(el){
                func(el);
            }
        }
    },
    setMaskreField : function(el){
        var me        = this,
            itemForms = el.getForm().getFields().items;

        for (var x in itemForms) {
            var items = itemForms[x],
                xtype = items.getXType();

            if(Object.keys(apps.maskre_field).includes(xtype)){
                items.maskRe = new RegExp(`[${apps.maskre_field[xtype]}]`);
            }
        }
    },
    // add by erwin 21112022
    listenersMaskreField : function(el){
        var me        = this, 
            form      = el.getEl(),
            itemForms = el.getForm().getFields().items;

        for (var x in itemForms) {
            var items = itemForms[x],
                xtype = items.getXType();

            if(Object.keys(apps.maskre_field).includes(xtype)){
                var objItem = form.down('[name=' + items.getName() + ']');
                if(objItem){
                    objItem.set({
                        "data-xtype"  : xtype,
                        "data-maskre" : items.maskRe
                    });

                    objItem.on('paste', function(event, element){
                        setTimeout(function(){
                            var elDom = form.down('[name=' + element.name + ']');
                            element.value = me.getValueRegex(elDom.dom.getAttribute('data-xtype'), elDom.dom.getAttribute('data-maskre'), element);
                        }, 100);
                    });

                    if(xtype == 'xphonenumberfieldEST'){
                        objItem.on('keyup', function(event, element){
                            var elDom = form.down('[name=' + element.name + ']');
                            element.value = me.getValueRegex(elDom.dom.getAttribute('data-xtype'), elDom.dom.getAttribute('data-maskre'), element);
                        });
                    }
                }
            }
        }
    },

});