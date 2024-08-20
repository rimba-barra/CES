Ext.define('Erems.view.mastercac.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    requires:[],
    alias:'widget.mastercacformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                   
                    name: 'cac_code',
                    fieldLabel: 'Code',
                    enforceMaxLength:true,
                    maxLength:8,
                    allowBlank:false,
                    maskRe: /[A-Za-z0-9-]/,
                },
                {
                    xtype: 'textfield',
                    
                    name: 'cac_name',
                    fieldLabel: 'Name',
                    enforceMaxLength: true,
                    maskRe: /[A-Za-z0-9\s]/,
                    maxLength: 30
                },
                {
                    xtype: 'textfield',
                    itemId: 'email',
                    name: 'email',
                    fieldLabel: 'Email',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 255
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
