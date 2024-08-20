Ext.define('Hrd.view.komponengaji.FormData', {
    alias: 'widget.komponengajiformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: [],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        var based = [{
                'number': '+',
                'name': '+'
            }, {
                'number': '-',
                'name': '-'
            }, {
                'number': '0',
                'name': '0'
            }];

        var basedStore = Ext.create('Ext.data.Store', {
            fields: ['number', 'name'],
            data: based
        });

        var tunjangan = [{
                'number': 'T',
                'name': 'T'
            }, {
                'number': 'P',
                'name': 'P'
            }, {
                'number': '0',
                'name': 'None'
            }];

        var tunjanganStore = Ext.create('Ext.data.Store', {
            fields: ['number', 'name'],
            data: tunjangan
        });




        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'komponengaji_id'
                },
                {
                    name: 'code',
                    width:250,
                    fieldLabel: 'Kode'
                },
                {
                    name: 'description',
                    width:400,
                    fieldLabel: 'Keterangan'
                },
                {
                    xtype:'nfnumberfield',
                    width:200,
                    name: 'pph_baris',
                    fieldLabel: 'Pph Baris'
                },
                {
                    //  queryMode: 'local',
                    fieldLabel: '+ / -',
                    xtype: 'combobox',
                    name: 'plus_minus',
                    store: basedStore,
                    width: 150,
                    displayField: 'name',
                    valueField: 'number'
                },
                {
                    xtype:'nfnumberfield',
                    width:200,
                    name: 'kpph',
                    fieldLabel: 'K.Pph'
                },
               
                {
                    //  queryMode: 'local',

                    xtype: 'combobox',
                    name: 'tunjangan_potongan',
                    fieldLabel: 'Tunjangan / potongan',
                    store: tunjanganStore,
                    width: 200,
                    displayField: 'name',
                    valueField: 'number'
                },
            ],
            dockedItems: [],
            tbar: [
                {
                    padding: '4px 6px',
                    xtype: 'button',
                    disabled: true,
                    action: 'save',
                    cls: 'InfoButton',
                    text: 'Save',
                    iconAlign: 'left',
                    iconCls: 'icon-save'
                },
                '->'

            ]
        });
        me.callParent(arguments);
    }

});