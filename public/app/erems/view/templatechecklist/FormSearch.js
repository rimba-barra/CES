Ext.define('Erems.view.templatechecklist.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    requires:['Erems.library.template.component.Typecombobox'],
    alias:'widget.templatechecklistformsearch',
    initComponent: function() {
        var me = this;
        
        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'typecombobox',
                    itemId: 'fs_type_id',
                    name: 'type_id',
                    anchor:'-15',
                    listeners:{
                        beforequery: function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_description',
                    name: 'description',
                    fieldLabel: 'Description',
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
