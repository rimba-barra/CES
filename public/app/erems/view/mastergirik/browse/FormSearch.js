Ext.define('Erems.view.mastergirik.browse.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    alias:'widget.mastergirikbrowseformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'fsms_code',
                    name: 'code',
                    fieldLabel: 'Code',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/
                },
				{
                    xtype: 'textfield',
                    itemId: 'fsms_girik_no',
                    name: 'girik_no',
                    fieldLabel: 'Girik No.',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/
                },
				{
                    xtype: 'textfield',
                    itemId: 'fsms_pemilik',
                    name: 'pemilik',
                    fieldLabel: 'Pemilik',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});