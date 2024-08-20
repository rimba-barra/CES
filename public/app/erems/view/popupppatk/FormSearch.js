Ext.define('Erems.view.popupppatk.FormSearch', {
    extend        : 'Erems.library.template.view.FormSearch',
    alias         : 'widget.popupppatkformsearch',
    initComponent : function () {
        var me = this;

        var cbf = new Erems.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype      : 'textfield',
                    itemId     : 'fs_unit_number',
                    name       : 'unit_number',
                    fieldLabel : 'Unit Number'
                },
                {
                    xtype  : 'clustercombobox',
                    itemId : 'fs_cluster_id',
                    name   : 'cluster_id',
                    anchor :'-15',
                    forceSelection:true,
                    listeners:{
                        beforequery: function(record){
                            record.query = new RegExp(record.query, 'i');
                            record.forceAll = true;
                        }
                    }
                },
                {
                    xtype      : 'xnamefieldEST',
                    itemId     : 'fs_customer_name',
                    name       : 'customer_name',
                    fieldLabel : 'Customer Name'
                },
                {
                    xtype: 'datefield',
                    itemId: 'fdms_periode',
                    name: 'periode',
                    fieldLabel: 'Periode',
                    anchor: '-5',
                    labelSeparator: '',
                    format: 'm Y',
                    altFormats: 'm,d,Y|m.d.Y|m-d-Y|m d Y|d,m,Y|d.m.Y|d-m-Y|d m Y|Y,m,d|Y-m-d|Y.m.d|Y m d',
                    submitFormat: 'Y-m-d H:i:s.u',
                    value: new Date()
                },
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});