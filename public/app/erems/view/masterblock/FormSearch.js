Ext.define('Erems.view.masterblock.FormSearch',{
    extend:'Erems.library.template.view.FormSearch',
    requires:['Erems.template.ComboBoxFields'],
    alias:'widget.masterblockformsearch',
    initComponent: function() {
        var me = this;
         var cbf = new Erems.template.ComboBoxFields();
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'fsms_code',
                    name: 'code',
                    fieldLabel: 'Code',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_name',
                    name: 'block',
                    fieldLabel: 'Block',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },
                {
                    xtype: 'textfield',
                    itemId: 'fsms_description',
                    name: 'description',
                    fieldLabel: 'Description',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },{
                    xtype: 'combobox',
                    
                    name: 'cluster_cluster_id',
                    displayField: cbf.cluster.d,
                    valueField: cbf.cluster.v,
                    fieldLabel: 'Cluster \/ Tower'
                 
                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
