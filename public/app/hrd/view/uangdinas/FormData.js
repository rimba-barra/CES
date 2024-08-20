Ext.define('Hrd.view.uangdinas.FormData', {
    alias: 'widget.uangdinasformdata',
    extend: 'Hrd.library.box.view.FormData',
    requires: ['Hrd.template.combobox.AbsentType','Hrd.library.template.view.MoneyField','Hrd.view.uangdinas.GridDetail'],
    frame: true,
    autoScroll: true,
    editedRow: -1,
    deletedData: {},
    height: 500,
    initComponent: function() {
        var me = this;

        



        Ext.applyIf(me, {
            defaults: {
                xtype: 'textfield'
            },
            items: [
                {
                    xtype: 'hiddenfield',
                    name: 'uangdinas_id'
                },
                {
                    xtype:'container',
                    layout:'hbox',
                    items:[
                        {
                            xtype:'combobox',
                            width:400,
                            name:'mastersk_mastersk_id',
                            displayField: 'nomor',
                            valueField: 'mastersk_id',
                            margin:'0 10px 10px 0',
                            fieldLabel:'Nomor IM / SK '
                        },
                        {
                            xtype:'dfdatefield',
                            name:'mastersk_tanggal',
                            readOnly:true,
                            width:200,
                            keepRO:true,
                            fieldLabel:'Tanggal IM/ SK'
                        }
                    ]
                },
                {
                    xtype:'textareafield',
                    cols:70,
                    name:'description',
                    rows:3,
                    fieldLabel:'Description'
                },
                {
                    xtype:'checkbox',
                    name:'is_default',
                    inputValue: '1',
                    fieldLabel:' ',
                    boxLabel:'Set as default'
                },
                {
                    xtype:'uangdinasgriddetail',
                    height:300
                }
            ],
            dockedItems: []
        });

        me.callParent(arguments);
    }
});