Ext.define('Hrd.view.polashift.FormData', {
    alias: 'widget.polashiftformdata',
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
                    name: 'polashift_id'
                },
                {
                    name: 'code',
                    width:150,
                    fieldLabel: 'Kode'
                },
                {
                    name: 'description',
                    width:400,
                    fieldLabel: 'Keterangan'
                },
                {
                    name: 'batasan_lembur',
                    width:400,
                    fieldLabel: 'Batasan Lembur'
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