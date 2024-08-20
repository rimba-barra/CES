Ext.define('Cashier.view.kasbondeptextend.FormSearch', {
    extend: 'Cashier.library.template.view.FormSearch',
    alias: 'widget.kasbondeptextendformsearch',
    initComponent: function () {
        var me = this;
        Ext.applyIf(me, {
            defaults: me.generateDefaults(),
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'hideparam',
                    value: 'default'
                },
                 {
                    xtype: 'hidden',
                    name: 'project_id'
                },
                  {
                    xtype: 'ptusercombobox',
                    itemId: 'fs_pt_id_cde',
                    id: 'pt_id_cde',
                    name: 'pt_id',
                    fieldLabel: 'PT / Company',
                    emptyText: 'Select Company',
                    enforceMaxLength: true,
                    enableKeyEvents: true,
                    rowdata: null
                },

                  {
                    xtype: 'textfield',
                    name: 'voucher_no',
                    fieldLabel: 'Cashbon No',
                    maxLength: 500
                },

                  {
                    xtype: 'textfield',
                    name: 'description',
                    fieldLabel: 'Description',
                    maxLength: 500
                },

                 
                 
                {
                    xtype: 'combobox',
                    name: 'status',
                    fieldLabel: 'Status',
                    queryMode: 'local',
                    valueField: 'status',
                    allowBlank: true,
                    forceSelection: true,
                    displayField: 'description',
                    store: new Ext.data.JsonStore({
                        fields: ['status', 'description'],
                        data: [
                            {status: 'ALL', description: 'ALL'},
                            {status: 'P', description: 'PENDING APPROVAL'},
                             {status: 'A', description: 'APPROVED'},
                              {status: 'D', description: 'DECLINED'},
                        ]
                    }),
                },

              

                {
                    xtype: 'textfield',
                    name: 'addby',
                    fieldLabel: 'Cashbon User',
                    maxLength: 500
                },
                
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});
