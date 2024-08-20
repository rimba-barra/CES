Ext.define('Erems.library.miniapp.view.FormSearch', {
    extend: 'Ext.form.Panel',
    alias: 'widget.miniappviewformsearch',

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
                    name: 'unit_number',
                    fieldLabel: 'Unit Number',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    },
    generateDockedItems:function(){
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
    generateDefaults:function(){
        var def = {
                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '100%'
            }
       return def;
    },
    createFieldRange:function(data){
        
        var x = {
                    xtype: 'panel',
                    height: 48,
                    bodyStyle:'background:none;border:0;',
                    layout: {
                        type: 'column'
                    },
                    items: [
                        {
                            xtype: 'numberfield',
                            width: 100,
                            id:'fs_mastertype_bot'+data.textName,
                            name:'bot_'+data.textName,
                            fieldLabel: data.fieldLabel,
                            labelSeparator:'',
                            labelAlign: 'top',
                            labelWidth: 50,
                             maxLength: 9,
                            minValue: 0,
                            typeNumber:'min',
                            textName:data.textName,
                            value: 0
                        },
                        {
                            xtype: 'label',
                            margin: '20px 5px',
                            padding: '0px 20px',
                            styleHtmlContent: false,
                            width: 15,
                            text:data.rangeSeparator
                        },
                        {
                            xtype: 'numberfield',
                            width: 100,
                            id:'fs_mastertype_top'+data.textName,
                            name:'top_'+data.textName,
                            fieldLabel: data.fieldLabel,
                            fieldLabel: '&nbsp;',
                            labelSeparator:'',
                            labelAlign: 'top',
                            typeNumber:'max',
                            textName:data.textName,
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
    }

});