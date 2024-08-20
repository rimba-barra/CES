Ext.define('Hrd.view.absentrecord.FormSanksiKeterlambatan', {
    alias: 'widget.absentrecordformsanksiketerlambatan',
    extend: 'Hrd.library.box.view.FormData',
    frame: true,
    requires: ['Hrd.template.ComboBoxFields', 'Hrd.view.absentrecord.GridEmployeeSanksiKeterlambatan'],
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    initComponent: function() {
        var me = this;

        var cbf = new Hrd.template.ComboBoxFields();

        Ext.applyIf(me, {
            defaults: {},
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'sanksiketerlambatan_id'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'proses'
                },
                {
                    xtype: 'hiddenfield',
                    name: 'cancel'
                },
                // {
                //     xtype: 'textfield',
                //     fieldLabel: 'Periode',
                //     maskRe: /[0-9]/,
                //     name: 'periode',
                //     enableKeyEvents: true,
                //     width:300,

                // },
                {
                    xtype: 'container',
                    layout: 'hbox',
                    defaults: {
                        xtype: 'combobox',
                        width: 250
                    },
                    items: [
                            {
                                fieldLabel: 'Periode (Month/Year)',
                                xtype: 'combobox',
                                name: 'periode_month',
                                store : new Ext.data.SimpleStore({
                                data : [[1, '1'], [2, '2'],[3, '3'], [4, '4'],[5, '5'], [6, '6'],[7, '7'], [8, '8'],[9, '9'], [10, '10'],[11, '11'], [12, '12']],
                                    fields : ['value', 'text']
                                }),
                                width:250,
                                valueField : 'value',
                                displayField : 'text',
                            },
                            {
                                xtype: 'label',
                                text: '',
                                margin: '0 10px',
                                width: 30
                            },
                            {
                                xtype: 'textfield',
                                fieldLabel: '',
                                maskRe: /[0-9]/,
                                name: 'periode',
                                enableKeyEvents: true,
                                width:150,
                                margin: '10px 0',
                            },
                        ]
                },
                {
                    xtype: 'textfield',
                    fieldLabel: 'Pengurangan Cuti',
                    width: 300,
                    maskRe: /[0-9-.]/,
                    name: 'amount',
                    renderer: function(value, metadata, record) {
                        if (value === "") {
                            return 0;
                        } else {
                            return value;
                        }

                    }
                },

                {
                    xtype:'label',
                    itemId:'labelTitik',
                    text:'Gunakan titik [.] untuk nilai desimal',
                    style: 'color:grey;',
                    margin: '0 0 20 0',
                },

                {
                    xtype:'textareafield',
                    cols:10,
                    width:540,
                    fieldLabel:'Description',
                    name:'description'
                },
                {
                    xtype:'label',
                    itemId:'labelJumlah',
                    margin:'15px 5px 5px 5px',
                    text:'Jumlah karyawan terpilih: 0',
                },
                {
                    xtype: 'absentrecordemployeesanksiketerlambatangrid',
                    height: 200
                },
            ],
            dockedItems: me.generateDockedItem()
        });

        me.callParent(arguments);
    },
    generateDockedItem: function() {
        var x = [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                ui: 'footer',
                layout: {
                    padding: 6,
                    type: 'hbox'
                },
                items: [
                    {
                        xtype: 'button',
                        action: 'process',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-save',
                        text: 'Process'
                    },
                    {
                        xtype: 'button',
                        action: 'cancel',
                        itemId: 'btnCancel',
                        padding: 5,
                        width: 75,
                        iconCls: 'icon-cancel',
                        text: 'Cancel',
                        // handler: function() {
                        //     this.up('window').close();
                        // }
                    },
                    {xtype:'tbfill'},
                    {
                        xtype: 'button',
                        action: 'view',
                        itemId: 'btnView',
                        padding: 5,
                        width: 75,
                        text: 'View Log',                       
                    },
                ]
            }
        ];
        return x;
    }
});