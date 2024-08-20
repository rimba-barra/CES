Ext.define('Erems.library.template.view.FormData', {
    extend : 'Ext.form.Panel',
    //alias: 'widget.HolidayFormData',
    requires :[
        'Erems.library.box.view.DateField',
        'Erems.library.template.view.MoneyField2',
        'Erems.library.template.view.MaskField',
        'Erems.library.template.view.DateField',
    ],
    frame         : true,
    autoScroll    : true,
    bodyBorder    : true,
    bodyPadding   : 10,
    bodyStyle     : 'border-top:none;border-left:none;border-right:none;',
    fieldDefaults : { labelSeparator : '' },
    maskreHandler : new Erems.library.MaskreHandler(), 
    initComponent : function() {
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
    listeners : { ///// add by erwin.st 29112022
        beforerender : function(el){ 
            this.maskreHandler.setMaskreField(el);
        },
        afterrender: function(el) {
            this.maskreHandler.listenersMaskreField(el);
        },
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
        number : function(name,label,enableKeyEvents,anchor) {
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

    // add by erwin 18022021
    fieldMonthYear : function(target={}){
        var source = {
            fieldLabel   : 'Tanggal ',
            name         : 'tanggal',
            renderTo     : Ext.getBody(),
            format       : 'F Y',
            submitFormat : 'Y-m-d H:i:s.u',
        };

        var obj = Object.assign(source, target);
        return Ext.create('Ext.form.field.Month', obj);
    },

    // add by erwin 18062021
    fieldYear : function(target={}){
        Ext.define('Ext.ux.OnlyYearPicker', {
            xtype: 'onlyyearpicker',
            extend: 'Ext.picker.Month',

            afterRender: function () {
                this.callParent();
                this.el.setStyle({
                    width: '88px',
                })
            },

            renderTpl: [
                '<div id="{id}-bodyEl" data-ref="bodyEl" class="{baseCls}-body">',
                    '<div id="{id}-monthEl" data-ref="monthEl" class="{baseCls}-months" style="display: none;">',
                        '<tpl for="months">',
                            '<div class="{parent.baseCls}-item {parent.baseCls}-month">',
                                '<a style="{parent.monthStyle}" role="button" hidefocus="on" class="{parent.baseCls}-item-inner">{.}</a>',
                            '</div>',
                        '</tpl>',
                    '</div>',
                    '<div id="{id}-yearEl" data-ref="yearEl" class="{baseCls}-years">',
                        '<div class="{baseCls}-yearnav">',
                            '<button id="{id}-prevEl" data-ref="prevEl" class="{baseCls}-yearnav-prev"></button>',
                            '<button id="{id}-nextEl" data-ref="nextEl" class="{baseCls}-yearnav-next"></button>',
                        '</div>',
                      '<tpl for="years">',
                            '<div class="{parent.baseCls}-item {parent.baseCls}-year">',
                                '<a hidefocus="on" class="{parent.baseCls}-item-inner" role="button">{.}</a>',
                            '</div>',
                        '</tpl>',
                    '</div>',
                    '<div class="' + Ext.baseCSSPrefix + 'clear"></div>',
                    '<tpl if="showButtons">',
                        '<div class="{baseCls}-buttons" style="display: none;">{%',
                            'var me=values.$comp, okBtn=me.okBtn, cancelBtn=me.cancelBtn;',
                            'okBtn.ownerLayout = cancelBtn.ownerLayout = me.componentLayout;',
                            'okBtn.ownerCt = cancelBtn.ownerCt = me;',
                            'Ext.DomHelper.generateMarkup(okBtn.getRenderTree(), out);',
                            'Ext.DomHelper.generateMarkup(cancelBtn.getRenderTree(), out);',
                        '%}</div>',
                    '</tpl>',
                '</div>'
            ]
        });

        Ext.define('Ext.form.field.Month', {
            extend             : 'Ext.form.field.Date',
            alias              : 'widget.monthfield',
            requires           : ['Ext.picker.Month', 'Ext.ux.OnlyYearPicker'],
            alternateClassName : ['Ext.form.MonthField', 'Ext.form.Month'],
            selectMonth        : null,
            createPicker: function () { // Converted function to Chrome
                var me = this,
                    format = Ext.String.format,
                    pickerConfig;

                pickerConfig = {
                    pickerField       : me,
                    ownerCmp          : me,
                    renderTo          : document.body,
                    floating          : true,
                    hidden            : true,
                    focusOnShow       : true,
                    minDate           : me.minValue,
                    maxDate           : me.maxValue,
                    disabledDatesRE   : me.disabledDatesRE,
                    disabledDatesText : me.disabledDatesText,
                    disabledDays      : me.disabledDays,
                    disabledDaysText  : me.disabledDaysText,
                    format            : me.format,
                    showToday         : me.showToday,
                    startDay          : me.startDay,
                    minText           : format(me.minText, me.formatDate(me.minValue)),
                    maxText           : format(me.maxText, me.formatDate(me.maxValue)),
                    listeners         : {
                        select : {
                            scope : me,
                            fn    : me.onSelect
                        },
                    },
                    keyNavConfig : {
                        esc : function () {
                            me.collapse();
                        }
                    },
                };

                if (Ext.isChrome) {
                    me.originalCollapse = me.collapse;
                    pickerConfig.listeners.boxready = {
                        fn: function () {
                            this.picker.el.on({
                                mousedown: function () {
                                    this.collapse = Ext.emptyFn;
                                },
                                mouseup: function () {
                                    this.collapse = this.originalCollapse;
                                },
                                scope: this
                            });
                        },
                        scope  : me,
                        single : true
                    };
                }

                return Ext.create('Ext.ux.OnlyYearPicker', pickerConfig);
            },
            onSelect : function (m, d) {
                var me = this;
                me.selectMonth = new Date((d[0] + 1) + '/1/' + d[1]);
                if (me.selectMonth) {
                    me.setValue(me.selectMonth);
                    me.fireEvent('select', me, me.selectMonth);
                }
                me.collapse();  
            }
        });

        var source = {
            fieldLabel   : 'Tanggal ',
            name         : 'tanggal',
            renderTo     : Ext.getBody(),
            format       : 'Y',
            submitFormat : 'Y',
        };

        var obj = Object.assign(source, target);
        return Ext.create('Ext.form.field.Month', obj);
    },
    // // add by erwin 21112022
    // setMaskreField : function(el){
    //     var me        = this,
    //         itemForms = el.getForm().getFields().items;

    //     for (var x in itemForms) {
    //         var items = itemForms[x],
    //             xtype = items.getXType();

    //         if(Object.keys(apps.maskre_field).includes(xtype)){
    //             items.maskRe = new RegExp(`[${apps.maskre_field[xtype]}]`);
    //         }
    //     }
    // },
    // // add by erwin 21112022
    // listenersMaskreField : function(el){
    //     var me        = this, 
    //         form      = el.getEl(),
    //         itemForms = el.getForm().getFields().items;

    //     for (var x in itemForms) {
    //         var items = itemForms[x],
    //             xtype = items.getXType();

    //         if(Object.keys(apps.maskre_field).includes(xtype)){
    //             var objItem = form.down('[name=' + items.getName() + ']');
    //             if(objItem){
    //                 objItem.set({
    //                     "data-xtype"  : xtype,
    //                     "data-maskre" : items.maskRe
    //                 });

    //                 objItem.on('paste', function(event, element){
    //                     setTimeout(function(){
    //                         var elDom = form.down('[name=' + element.name + ']');
    //                         element.value = me.getValueRegex(elDom.dom.getAttribute('data-xtype'), elDom.dom.getAttribute('data-maskre'), element);
    //                     }, 100);
    //                 });

    //                 if(xtype == 'xphonenumberfieldEST'){
    //                     objItem.on('keyup', function(event, element){
    //                         var elDom = form.down('[name=' + element.name + ']');
    //                         element.value = me.getValueRegex(elDom.dom.getAttribute('data-xtype'), elDom.dom.getAttribute('data-maskre'), element);
    //                     });
    //                 }
    //             }
    //         }
    //     }
    // },
    // // add by erwin 21112022
    // pasteCleanText : function(text){
    //     var cleanText = new Erems.library.CleanText();
    //     return cleanText.copyPaste(text);
    // },
    // // add by erwin 21112022
    // filterValueRegex : function(regex, text){
    //     var str   = regex.toString();
    //     var rgx   = str.substring(2, str.length-2);
    //     var regex = new RegExp(`[^${rgx}]`, 'g');

    //     if(regex.test(text)){
    //         text = text.replace(regex, '');
    //     }

    //     return text.trim();
    // },
    // // add by erwin 21112022
    // getValueRegex : function(xtype, regex, el){
    //     var me  = this,
    //         val = el.value;

    //     val = me.pasteCleanText(val);
    //     val = me.filterValueRegex(regex, val);

    //     if(xtype == 'xphonenumberfieldEST'){
    //         var char   = val.charAt(0) == '+' ? '+' : '';
    //         var valTmp = char == '+' ? val.substring(1, val.length) : val;

    //         val = char + valTmp.replace(/[^0-9]/g, '');
    //     }

    //     return val;
    // }
});