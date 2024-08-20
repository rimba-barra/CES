Ext.define('Erems.view.clusterfacilities.FormSearch', {
    extend: 'Erems.library.template.view.FormSearch',
    requires: [
        'Erems.template.ComboBoxFields',
        //'Erems.library.template.component.Facilitiestypecombobox',
        'Erems.library.template.component.Clustercombobox'],
    alias: 'widget.clusterfacilitiesformsearch',
    initComponent: function() {
        var me = this;
        var cbf = new Erems.template.ComboBoxFields();
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'textfield',
                    itemId: 'clusterfacilities_code',
                    name: 'code',
                    fieldLabel: 'Code',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },
                {
                    xtype: 'textfield',
                    itemId: 'clusterfacilities_clusterfaciliteis',
                    name: 'clusterfacilities',
                    fieldLabel: 'Facilities',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },
                {
                    xtype: 'textfield',
                    itemId: 'clusterfacilities_description',
                    name: 'description',
                    fieldLabel: 'Description',
                    enforceMaxLength: true,
                    maskRe: /[^\`\"\']/,
                    maxLength: 50
                },
                {
                    xtype: 'combobox',
                    itemId: 'clusterfacilities_facilitiestype',
                    name: 'facilitiestype_facilitiestype_id',
                    displayField: cbf.facilitiestype.d,
                    valueField: cbf.facilitiestype.v,
                    fieldLabel: 'Facilities Type'

                },
                {
                    xtype: 'clustercombobox',
                    itemId: 'clusterfacilities_cluster',
                    name: 'cluster_cluster_id',
                    fieldLabel: 'Cluster'

                }
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
