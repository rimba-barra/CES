Ext.define('Hrd.view.plafonpengobatan.FormSearch',{
    extend:'Hrd.library.box.view.FormSearch',
    alias:'widget.plafonpengobatanformsearch',
    initComponent: function() {
        var me = this;

        Ext.applyIf(me, {
            defaults: {
                xtype:'textfield'
            },
            
            items: [
                {
                    name:'year',
                    fieldLabel:'Tahun'
                },
                {
                    xtype:'combobox',
                    displayField: 'code',
                    valueField: 'group_id',
                    name:'group_id',
                    fieldLabel:'Golongan'
                },
                {
                    xtype:'combobox',
                    displayField: 'code',
                    valueField: 'ptkp_id',
                    name:'ptkp_id',
                    fieldLabel:'PTKP'
                },
                {
                     xtype:'combobox',
                    displayField: 'jenispengobatan',
                    valueField: 'jenispengobatan_id',
                    width:400,
                    name:'jenispengobatan_id',
                    fieldLabel:'Jenis Pengobatan'
                },
                {
                     xtype:'combobox',
                    displayField: 'nomor',
                    width:300,
                    valueField: 'mastersk_id',
                    name:'mastersk_id',
                    fieldLabel:'Nomor SK'
                },
                
            ],
            dockedItems: me.generateDockedItems()
        });

        me.callParent(arguments);
    }
});