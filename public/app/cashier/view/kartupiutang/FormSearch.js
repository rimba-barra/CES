Ext.define('Cashier.view.kartupiutang.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    requires: ['Cashier.template.ComboBoxFields'],
    alias: 'widget.kartupiutangformsearch',
    initComponent: function() {
        var me = this;

        var cbf = new Cashier.template.ComboBoxFields();

        Ext.applyIf(me, {
            //defaults: me.generateDefaults(),
            defaults: {
                xtype: 'combobox',
                width: '100%',
                labelAlign: 'top',
                labelSeparator: ' ',
                labelClsExtra: 'small',
                fieldStyle: 'margin-bottom:3px;',
                anchor: '90%'
            },
           
            items: [
                {
                    xtype:'textfield',
                    fieldLabel: 'Unit Number',
                    name: 'unit_number'
                },
                {
                    xtype:'textfield',
                    fieldLabel: 'Customer Name',
                    name: 'customer_name'
                },
                {
                    xtype:'combobox',
                    fieldLabel: 'Company',
                    name: 'pt_pt_id',
                    displayField: 'name',
                    valueField: 'pt_id',
                },
                {
                    name: 'cluster_id',
                    displayField: cbf.cluster.d,
                    valueField: cbf.cluster.v,
                    fieldLabel: 'Cluster'
                },
                {
                    name: 'block_id',
                    displayField: cbf.block.d,
                    valueField: cbf.block.v,
                    fieldLabel: 'Block'
                },
                {
                    name: 'position_id',
                    displayField: cbf.position.d,
                    valueField: cbf.position.v,
                    fieldLabel: 'Position'
                },
                {
                    name: 'productcategory_id',
                    displayField: cbf.productcategory.d,
                    valueField: cbf.productcategory.v,
                    fieldLabel: 'Product Category'
                },
                {
                    name: 'type_id',
                    displayField: cbf.type.d,
                    valueField: cbf.type.v,
                    fieldLabel: 'Type'
                },
                {
                    name: 'purpose_id',
                    displayField: cbf.purpose.d,
                    valueField: cbf.purpose.v,
                    fieldLabel: 'Purpose'
                },
                {
                    name: 'side_id',
                    displayField: cbf.side.d,
                    valueField: cbf.side.v,
                    fieldLabel: 'Side'
                },
                {
                    name: 'unitstatus_id',
                    displayField: cbf.unitstatus.d,
                    valueField: cbf.unitstatus.v,
                    fieldLabel: 'Unit Status'
                },
               
                {
                    xtype: 'checkboxfield',
                            fieldLabel: 'Cancel Data',
                            name: 'is_cancel',
                            checked: false,
                            inputValue: '1',
                            uncheckedValue: '0',
                            margin: '0 5px 0 0',
                            width: 20
                        },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});