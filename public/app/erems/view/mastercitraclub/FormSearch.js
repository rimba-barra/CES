Ext.define('Erems.view.mastercitraclub.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    requires:[],
    alias:'widget.mastercitraclubformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    name: 'code',
                    fieldLabel: 'Code',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 10
                },
                {
                    xtype: 'textfield',
                    name: 'clubname',
                    fieldLabel: 'Name',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 35
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
