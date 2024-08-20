Ext.define('Cashier.library.template.view.FormImport', {
    extend: 'Ext.form.Panel',
    //alias: 'widget.HolidayFormImport',
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
            dockedItems: me.generateDockedItemImport()
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
    generateDockedItemImport: function() {
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
                action: 'import',
                itemId: 'btnImport',
                padding: 5,
                width: 75,
                iconCls: 'icon-save',
                text: 'Import'
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
    
    generateDefaults: function() {
        var x = {
            labelAlign: 'top',
            labelSeparator: ' ',
            labelClsExtra: 'small',
            fieldStyle: 'margin-bottom:3px;',
            anchor: '100%'
        };
        return x;
    }
    

});